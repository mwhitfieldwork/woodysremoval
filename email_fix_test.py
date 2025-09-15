#!/usr/bin/env python3
"""
Specific test for email functionality after password fix
Testing with the exact data requested in the review
"""

import requests
import json
import os

# Get the backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        return "http://localhost:8001"
    return "http://localhost:8001"

BASE_URL = get_backend_url()
API_URL = f"{BASE_URL}/api"

def test_email_fix():
    """Test email functionality with the exact data from the review request"""
    print("🔍 Testing Email Fix with Corrected Password...")
    print(f"Backend URL: {BASE_URL}")
    print(f"API URL: {API_URL}")
    
    # Exact test data from the review request
    test_data = {
        "name": "Email Fix Test",
        "email": "test@example.com", 
        "phone": "555-1234",
        "service": "Test Service",
        "message": "Testing email delivery after password fix. This should reach info@ridofjunk.org"
    }
    
    print(f"\nTest Data: {json.dumps(test_data, indent=2)}")
    
    try:
        print("\n📤 Submitting contact form...")
        response = requests.post(f"{API_URL}/contact", json=test_data, timeout=30)
        
        print(f"Response Status: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        print(f"Response Body: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                message = data.get("message", "")
                print(f"\n✅ API Response: SUCCESS")
                print(f"Message: {message}")
                
                # Check which message we got to determine if email was sent
                if "Thank you for your message!" in message:
                    print("✅ SUCCESS: Email appears to have been sent successfully!")
                    print("   (Received success message indicating email delivery)")
                    return True
                elif "Your message has been received" in message:
                    print("⚠️  WARNING: Form saved but email sending may have failed")
                    print("   (Received fallback message - check backend logs for SMTP errors)")
                    return False
                else:
                    print(f"❓ UNKNOWN: Unexpected message format: {message}")
                    return False
            else:
                print(f"❌ FAILED: API returned success=false: {data}")
                return False
        else:
            print(f"❌ FAILED: HTTP error {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: Request error: {e}")
        return False

if __name__ == "__main__":
    print("=" * 70)
    print("🚀 EMAIL FIX VERIFICATION TEST")
    print("=" * 70)
    
    success = test_email_fix()
    
    print("\n" + "=" * 70)
    print("📊 RESULT")
    print("=" * 70)
    
    if success:
        print("🎉 EMAIL FUNCTIONALITY APPEARS TO BE WORKING!")
        print("   The API returned the success message indicating email was sent.")
        print("   No 535 authentication errors should appear in backend logs.")
    else:
        print("⚠️  EMAIL FUNCTIONALITY MAY STILL HAVE ISSUES")
        print("   Check backend logs for SMTP authentication errors.")
    
    print("\n💡 Next Steps:")
    print("   1. Check backend logs for any SMTP errors")
    print("   2. Verify actual email delivery to info@ridofjunk.org")
    print("   3. Test with real user submission from frontend")