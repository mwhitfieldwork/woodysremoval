#!/usr/bin/env python3
"""
Backend API Testing for Woody's Removal Service
Tests the contact form email functionality
"""

import requests
import json
import os
import sys
from datetime import datetime
import time

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

def test_api_health():
    """Test if the API is running"""
    print("🔍 Testing API Health...")
    try:
        response = requests.get(f"{API_URL}/", timeout=10)
        if response.status_code == 200:
            print("✅ API is running")
            return True
        else:
            print(f"❌ API health check failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ API connection failed: {e}")
        return False

def test_contact_form_valid_all_fields():
    """Test contact form with all fields filled"""
    print("\n🔍 Testing Contact Form - All Fields...")
    
    test_data = {
        "name": "John Smith",
        "email": "john.smith@example.com",
        "phone": "+1-555-123-4567",
        "service": "Junk Removal",
        "message": "I need help removing old furniture from my garage. Please contact me to schedule a pickup."
    }
    
    try:
        response = requests.post(f"{API_URL}/contact", json=test_data, timeout=30)
        print(f"Response Status: {response.status_code}")
        print(f"Response Body: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "message" in data:
                print("✅ Contact form submission successful (all fields)")
                return True
            else:
                print(f"❌ Invalid response format: {data}")
                return False
        else:
            print(f"❌ Contact form submission failed: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False

def test_contact_form_required_fields_only():
    """Test contact form with only required fields"""
    print("\n🔍 Testing Contact Form - Required Fields Only...")
    
    test_data = {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "message": "I'm interested in your removal services. Please provide a quote."
    }
    
    try:
        response = requests.post(f"{API_URL}/contact", json=test_data, timeout=30)
        print(f"Response Status: {response.status_code}")
        print(f"Response Body: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "message" in data:
                print("✅ Contact form submission successful (required fields only)")
                return True
            else:
                print(f"❌ Invalid response format: {data}")
                return False
        else:
            print(f"❌ Contact form submission failed: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False

def test_contact_form_invalid_email():
    """Test contact form with invalid email format"""
    print("\n🔍 Testing Contact Form - Invalid Email...")
    
    test_data = {
        "name": "Bob Wilson",
        "email": "invalid-email-format",
        "message": "This should fail due to invalid email format."
    }
    
    try:
        response = requests.post(f"{API_URL}/contact", json=test_data, timeout=10)
        print(f"Response Status: {response.status_code}")
        print(f"Response Body: {response.text}")
        
        if response.status_code == 422:  # Validation error expected
            print("✅ Invalid email properly rejected")
            return True
        elif response.status_code == 200:
            print("❌ Invalid email was accepted (should be rejected)")
            return False
        else:
            print(f"❌ Unexpected response: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False

def test_contact_form_missing_required_fields():
    """Test contact form with missing required fields"""
    print("\n🔍 Testing Contact Form - Missing Required Fields...")
    
    test_data = {
        "name": "Test User",
        # Missing email and message
        "phone": "555-1234"
    }
    
    try:
        response = requests.post(f"{API_URL}/contact", json=test_data, timeout=10)
        print(f"Response Status: {response.status_code}")
        print(f"Response Body: {response.text}")
        
        if response.status_code == 422:  # Validation error expected
            print("✅ Missing required fields properly rejected")
            return True
        else:
            print(f"❌ Missing required fields should return 422, got: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False

def test_mongodb_connection():
    """Test if data is being saved to MongoDB by checking status endpoint"""
    print("\n🔍 Testing MongoDB Connection via Status Endpoint...")
    
    # First create a status check
    test_data = {"client_name": "test_mongodb_connection"}
    
    try:
        response = requests.post(f"{API_URL}/status", json=test_data, timeout=10)
        print(f"Create Status Response: {response.status_code}")
        
        if response.status_code == 200:
            # Now try to retrieve status checks
            get_response = requests.get(f"{API_URL}/status", timeout=10)
            print(f"Get Status Response: {get_response.status_code}")
            
            if get_response.status_code == 200:
                data = get_response.json()
                if isinstance(data, list) and len(data) > 0:
                    print("✅ MongoDB connection working")
                    return True
                else:
                    print("❌ MongoDB query returned empty results")
                    return False
            else:
                print(f"❌ Failed to retrieve status checks: {get_response.status_code}")
                return False
        else:
            print(f"❌ Failed to create status check: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ MongoDB test failed: {e}")
        return False

def test_email_functionality_detailed():
    """Test email functionality with detailed error checking"""
    print("\n🔍 Testing Email Functionality - Detailed...")
    
    test_data = {
        "name": "Email Test User",
        "email": "emailtest@example.com",
        "phone": "+1-555-999-8888",
        "service": "Email Test Service",
        "message": "This is a test message to verify email functionality is working correctly."
    }
    
    try:
        # Submit the form
        response = requests.post(f"{API_URL}/contact", json=test_data, timeout=30)
        print(f"Response Status: {response.status_code}")
        print(f"Response Body: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                # Check the message to see if email was actually sent
                message = data.get("message", "")
                if "Thank you for your message!" in message:
                    print("✅ Email functionality appears to be working (success message indicates email sent)")
                    return True
                elif "Your message has been received" in message:
                    print("⚠️  Form saved but email sending may have failed (fallback message)")
                    return False
                else:
                    print(f"❌ Unexpected success message: {message}")
                    return False
            else:
                print(f"❌ Form submission failed: {data}")
                return False
        else:
            print(f"❌ HTTP error: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False

def test_mongodb_contact_submissions():
    """Test if contact submissions are being saved to MongoDB"""
    print("\n🔍 Testing MongoDB Contact Submissions Storage...")
    
    # Submit a test contact form
    test_data = {
        "name": "MongoDB Test User",
        "email": "mongotest@example.com",
        "message": "Testing MongoDB storage for contact submissions."
    }
    
    try:
        response = requests.post(f"{API_URL}/contact", json=test_data, timeout=10)
        
        if response.status_code == 200:
            print("✅ Contact form submitted successfully")
            print("⚠️  Note: Cannot directly verify MongoDB contact_submissions collection via API")
            print("   (No GET endpoint available for contact submissions)")
            return True
        else:
            print(f"❌ Contact form submission failed: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("=" * 60)
    print("🚀 STARTING BACKEND API TESTS")
    print("=" * 60)
    
    tests = [
        ("API Health Check", test_api_health),
        ("MongoDB Connection", test_mongodb_connection),
        ("MongoDB Contact Storage", test_mongodb_contact_submissions),
        ("Contact Form - All Fields", test_contact_form_valid_all_fields),
        ("Contact Form - Required Only", test_contact_form_required_fields_only),
        ("Contact Form - Invalid Email", test_contact_form_invalid_email),
        ("Contact Form - Missing Fields", test_contact_form_missing_required_fields),
        ("Email Functionality - Detailed", test_email_functionality_detailed),
    ]
    
    results = []
    
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ {test_name} crashed: {e}")
            results.append((test_name, False))
    
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    
    passed = 0
    failed = 0
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal: {len(results)} tests")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 ALL TESTS PASSED!")
        return True
    else:
        print(f"\n⚠️  {failed} TESTS FAILED")
        return False

if __name__ == "__main__":
    print(f"Testing backend at: {BASE_URL}")
    success = run_all_tests()
    sys.exit(0 if success else 1)