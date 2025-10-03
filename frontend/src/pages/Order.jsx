import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import woodyImg from '../images/woody-standing-shadow.png';
import { Alert, AlertDescription } from "../components/ui/alert";
import { 
  ExternalLink, 
  Clock, 
  Shield, 
  DollarSign, 
  Phone,
  CheckCircle,
  Info
} from "lucide-react";

const Order = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Mattress Removal",
      description: "Single mattress and box spring removal",
      price: "Get Online Pricing",
      popular: true
    },
    {
      id: 2,
      title: "Furniture Set",
      description: "Multiple furniture items from one room",
      price: "Get Online Pricing",
      popular: false
    },
    {
      id: 3,
      title: "Full Property Cleanout",
      description: "Complete home or business cleanout service",
      price: "Get Online Pricing",
      popular: false
    }
  ];

  const benefits = [
    {
      icon: <Clock className="h-5 w-5" />,
      text: "Same day service available"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      text: "Fully licensed and insured"
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      text: "Transparent, upfront pricing"
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      text: "100% satisfaction guarantee"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Your Removal Service
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant pricing and schedule your pickup with our trusted LoadUp partner platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">
                  Choose Your Service
                </CardTitle>
                <p className="text-gray-600">
                  Select the service that best fits your needs.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`relative border rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                      selectedService === service.id
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    {service.popular && (
                      <Badge className="absolute -top-2 left-4 bg-emerald-600 text-white">
                        Most Popular
                      </Badge>
                    )}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{service.description}</p>
                        <p className="text-emerald-600 font-semibold text-lg">
                          {service.price}
                        </p>
                      </div>
                      <div className={`ml-4 ${
                        selectedService === service.id 
                          ? "text-emerald-600" 
                          : "text-gray-400"
                      }`}>
                        <CheckCircle className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* LoadUp Integration Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center">
                  <ExternalLink className="h-6 w-6 mr-2" />
                  Complete Your Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>LoadUp Integration:</strong> Our ordering system is powered by LoadUp's professional platform 
                    to ensure the best service and pricing for your removal needs.
                  </AlertDescription>
                </Alert>

                {/* IFRAME PLACEHOLDER - This is where you'll add the LoadUp iframe */}
                <div className="iframe-placeholder bg-white border-2 border-dashed border-gray-300 rounded-lg p-1 text-center">
                  <div className="space-y-4">
                  <iframe
                      src={`${window.location.origin}/quote.html`}
                      title="LoadUp Quote"
                      style={{ width: "100%", minHeight: "700px", border: "none" }}
                    />
                  </div>
                </div>
                {/* END IFRAME PLACEHOLDER */}

              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Our friendly team is here to help with any questions about your removal service.
                </p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  {/*<Phone className="h-4 w-4 mr-2" />*/}
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Available 7 days a week
                </p>
              </CardContent>
            </Card>

            {/* Benefits Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">
                  Why Choose Us?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-emerald-600">{benefit.icon}</div>
                      <span className="text-sm text-gray-700">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">
                  Service Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Local Service:</strong></p>
                  <p>• Same-day pickup available</p>
                  <p>• 50+ metro areas</p>
                  <p className="pt-2"><strong>Nationwide Service:</strong></p>
                  <p>• 2-3 day scheduling</p>
                  <p>• All 50 states covered</p>
                </div>
              </CardContent>
            </Card>
            <div>
              <img src={woodyImg} alt="Wooden figure holding box" className="hidden md:block"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;