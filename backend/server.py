from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from pathlib import Path
from datetime import datetime
import smtplib, ssl, os, uuid, logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Initialize FastAPI
app = FastAPI()
api_router = APIRouter()

# Load config safely
MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")
SMTP_EMAIL = os.environ.get("SMTP_EMAIL")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")
SMTP_SERVER = os.environ.get("SMTP_SERVER")
SMTP_PORT = int(os.environ.get("SMTP_PORT", 587))
CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "*").split(",")

# MongoDB connection
try:
    if not MONGO_URL or not DB_NAME:
        raise ValueError("Missing MongoDB config")
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    logger.info("MongoDB client initialized")
except Exception as e:
    logger.error(f"MongoDB connection failed: {e}")
    db = None

# Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str

class ContactFormResponse(BaseModel):
    success: bool
    message: str

# Email sender
async def send_contact_email(contact_data: ContactFormCreate) -> bool:
    try:
        if not all([SMTP_EMAIL, SMTP_PASSWORD, SMTP_SERVER]):
            raise ValueError("Missing SMTP config")

        msg = MIMEMultipart()
        msg["From"] = SMTP_EMAIL
        msg["To"] = SMTP_EMAIL
        msg["Subject"] = f"New Contact Form Submission from {contact_data.name}"

        body = f"""
New contact form submission received:

Name: {contact_data.name}
Email: {contact_data.email}
Phone: {contact_data.phone or 'Not provided'}
Service: {contact_data.service or 'Not specified'}

Message:
{contact_data.message}

---
This email was sent from the Woody's Removal Service website contact form.
        """.strip()

        msg.attach(MIMEText(body, "plain"))

        context = ssl.create_default_context()
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls(context=context)
            server.login(SMTP_EMAIL, SMTP_PASSWORD)
            server.send_message(msg)

        return True
    except Exception as e:
        logger.error(f"Email sending failed: {e}")
        return False

# Routes
@api_router.get("/ping")
async def ping():
    return {"status": "ok"}

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")
    status_obj = StatusCheck(**input.dict())
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**sc) for sc in status_checks]

@api_router.post("/contact", response_model=ContactFormResponse)
async def submit_contact_form(contact_data: ContactFormCreate):
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")
    try:
        contact_obj = ContactForm(**contact_data.dict())
        await db.contact_submissions.insert_one(contact_obj.dict())

        email_sent = await send_contact_email(contact_data)

        return ContactFormResponse(
            success=True,
            message="Thanks for reaching out! We'll get back to you within 24 hours." if email_sent
            else "Message saved, but email delivery failed. We'll follow up manually."
        )
    except Exception as e:
        logger.error(f"Contact form error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Mount router
app.include_router(api_router, prefix="")  # Add "/api" if you want to namespace routes

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Shutdown hook
@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()