#!/usr/bin/env python3
"""
Direct SMTP Test for Woody's Removal Service
Tests SMTP connectivity and email sending functionality
"""

import smtplib
import ssl
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

def test_smtp_connection():
    """Test SMTP connection to Ionos server"""
    print("🔍 Testing SMTP Connection...")
    
    try:
        # Get SMTP settings from environment
        smtp_server = os.environ.get('SMTP_SERVER')
        smtp_port = int(os.environ.get('SMTP_PORT', 587))
        smtp_email = os.environ.get('SMTP_EMAIL')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        
        print(f"SMTP Server: {smtp_server}")
        print(f"SMTP Port: {smtp_port}")
        print(f"SMTP Email: {smtp_email}")
        print(f"SMTP Password: {'*' * len(smtp_password) if smtp_password else 'None'}")
        
        # Test connection
        context = ssl.create_default_context()
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            print("✅ Connected to SMTP server")
            
            # Start TLS
            server.starttls(context=context)
            print("✅ TLS started successfully")
            
            # Login
            server.login(smtp_email, smtp_password)
            print("✅ SMTP authentication successful")
            
        return True
        
    except Exception as e:
        print(f"❌ SMTP connection failed: {str(e)}")
        return False

def test_send_test_email():
    """Send a test email"""
    print("\n🔍 Testing Email Sending...")
    
    try:
        # Get SMTP settings from environment
        smtp_server = os.environ.get('SMTP_SERVER')
        smtp_port = int(os.environ.get('SMTP_PORT', 587))
        smtp_email = os.environ.get('SMTP_EMAIL')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        
        # Create test message
        msg = MIMEMultipart()
        msg['From'] = smtp_email
        msg['To'] = smtp_email  # Send to self for testing
        msg['Subject'] = "Test Email from Woody's Removal Service Backend"
        
        body = """
This is a test email sent from the Woody's Removal Service backend API.

If you receive this email, the SMTP configuration is working correctly.

Test Details:
- Server: smtp.ionos.com
- Port: 587 (TLS)
- From/To: info@ridofjunk.org

This email was sent as part of the backend testing process.
        """.strip()
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        context = ssl.create_default_context()
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls(context=context)
            server.login(smtp_email, smtp_password)
            server.send_message(msg)
            
        print("✅ Test email sent successfully")
        return True
        
    except Exception as e:
        print(f"❌ Failed to send test email: {str(e)}")
        return False

def main():
    print("=" * 60)
    print("🚀 SMTP FUNCTIONALITY TEST")
    print("=" * 60)
    
    # Test SMTP connection
    connection_ok = test_smtp_connection()
    
    if connection_ok:
        # Test sending email
        email_ok = test_send_test_email()
        
        if email_ok:
            print("\n🎉 SMTP functionality is working correctly!")
            print("✅ Emails should be delivered to info@ridofjunk.org")
        else:
            print("\n⚠️  SMTP connection works but email sending failed")
    else:
        print("\n❌ SMTP connection failed - email functionality will not work")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    main()