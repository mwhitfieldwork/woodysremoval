from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
logger.info(f"Mongo URL being used: {mongo_url}")
try:
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    logger.info("MongoDB client initialized successfully")
except Exception as e:
    logger.error(f"MongoDB connection failed: {str(e)}")

client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
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

# Email sending function
async def send_contact_email(contact_data: ContactFormCreate):
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = os.environ['SMTP_EMAIL']
        msg['To'] = os.environ['SMTP_EMAIL']  # Sending to the same email
        msg['Subject'] = f"New Contact Form Submission from {contact_data.name}"
        
        # Create email body
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
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Connect to server and send email
        context = ssl.create_default_context()
        with smtplib.SMTP(os.environ['SMTP_SERVER'], int(os.environ['SMTP_PORT'])) as server:
            server.starttls(context=context)
            server.login(os.environ['SMTP_EMAIL'], os.environ['SMTP_PASSWORD'])
            server.send_message(msg)
            
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact", response_model=ContactFormResponse)
async def submit_contact_form(contact_data: ContactFormCreate):
    try:
        # Save to database
        contact_obj = ContactForm(**contact_data.dict())
        await db.contact_submissions.insert_one(contact_obj.dict())
        
        # Send email
        email_sent = await send_contact_email(contact_data)
        
        if email_sent:
            return ContactFormResponse(
                success=True,
                message="Thank you for your message! We'll get back to you within 24 hours."
            )
        else:
            return ContactFormResponse(
                success=True,  # Still return success since it was saved to DB
                message="Your message has been received. We'll get back to you within 24 hours."
            )
            
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
