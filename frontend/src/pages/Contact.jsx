import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: ""
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Sorry, there was an error sending your message. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
   /* {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: "(844) 239-7711",
      subtitle: "Call for immediate assistance"
    },
   } {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: "info@ridofJunk.org",
      subtitle: "We respond within 24 hours"
    },*/
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Service Area",
      details: "Local & Nationwide",
      subtitle: "50+ metro areas covered"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Hours",
      details: "7 Days a Week",
      subtitle: "8 AM - 8 PM local time"
    }
  ];

  const serviceOptions = [
    "Mattress Removal",
    "Furniture Removal", 
    "Appliance Removal",
    "Construction Debris",
    "Property Cleanout",
    "Commercial Service",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Woody's Removal Service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need a custom quote? We're here to help make your removal project simple and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">
                  Send Us a Message
                </CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder=") 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Needed</Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full"
                      placeholder="Please describe what you need removed, your location, and any special requirements..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 text-emerald-600 rounded-full p-3 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-lg text-emerald-600 font-medium mb-1">{info.details}</p>
                      <p className="text-sm text-gray-600">{info.subtitle}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Quick Response Promise */}
            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                  <h3 className="font-semibold text-emerald-900">Quick Response Guarantee</h3>
                </div>
                <div className="space-y-2 text-sm text-emerald-800">
                  <p>• Same-day response to all inquiries</p>
                  <p>• Free quotes provided within 2 hours</p>
                  <p>• Emergency services available 24/7</p>
                  <p>• Professional, courteous service team</p>
                </div>
              </CardContent>
            </Card>

            {/* Service Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">
                  Service Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Local Areas</h4>
                    <p className="text-sm text-gray-600">
                      Same-day and next-day service available in 50+ metro areas across the US.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Nationwide</h4>
                    <p className="text-sm text-gray-600">
                      2-3 day scheduling for all 50 states with our trusted partner network.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 text-center">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      How quickly can you pick up my items?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We offer same-day service in most local areas and 2-3 day scheduling nationwide.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Do you provide upfront pricing?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Yes! We provide transparent, upfront pricing with no hidden fees or surprises.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      What areas do you serve?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We serve both local metro areas (50+ cities) and provide nationwide coverage.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Are you licensed and insured?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Absolutely! We're fully licensed, bonded, and insured for your protection.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Do you handle mattress disposal?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Yes, mattress removal is our specialty! We handle eco-friendly disposal and recycling.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      What payment methods do you accept?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We accept all major credit cards, cash, and digital payment methods for your convenience.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;