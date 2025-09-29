from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from pathlib import Path
from datetime import datetime
import os, uuid, logging, requests

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
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
RESEND_FROM = os.getenv("RESEND_FROM")
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")

# Models
class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str

class ContactFormResponse(BaseModel):
    success: bool
    message: str

# Email sender using Resend
async def send_contact_email(contact_data: ContactFormCreate) -> bool:
    try:
        if not RESEND_API_KEY or not RESEND_FROM:
            raise ValueError("Missing Resend config")

        payload = {
            "from": RESEND_FROM,
            "to": [RESEND_FROM],  # Send to yourself
            "subject": f"New Contact Form Submission from {contact_data.name}",
            "text": f"""
New contact form submission received:

Name: {contact_data.name}
Email: {contact_data.email}
Phone: {contact_data.phone or 'Not provided'}
Service: {contact_data.service or 'Not specified'}

Message:
{contact_data.message}

---
This email was sent from the RidOfJunk.org contact form.
""".strip()
        }

        headers = {
            "Authorization": f"Bearer {RESEND_API_KEY}",
            "Content-Type": "application/json"
        }

        response = requests.post("https://api.resend.com/emails", json=payload, headers=headers)
        logger.info(f"Resend status: {response.status_code}")
        logger.info(f"Resend response: {response.text}")
        response.raise_for_status()

        return True
    except Exception as e:
        logger.error(f"Resend email failed: {e}")
        return False

# Routes
@api_router.get("/ping")
async def ping():
    return {"status": "ok"}

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/contact", response_model=ContactFormResponse)
async def submit_contact_form(contact_data: ContactFormCreate):
    try:
        email_sent = await send_contact_email(contact_data)
        return ContactFormResponse(
            success=True,
            message="Thanks for reaching out! We'll get back to you within 24 hours." if email_sent
            else "Message received, but email delivery failed. We'll follow up manually."
        )
    except Exception as e:
        logger.error(f"Contact form error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Mount router
app.include_router(api_router, prefix="")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)