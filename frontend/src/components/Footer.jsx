import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-emerald-600 text-white rounded-lg p-2">
                <span className="font-bold text-xl">W</span>
              </div>
              <div>
                <span className="text-xl font-bold">Woody's</span>
                <br />
                <span className="text-sm text-emerald-400">Removal Service</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Professional junk and mattress removal services. 
              We handle the heavy lifting so you don't have to.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                Home
              </Link>
              <Link to="/order" className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                Order Service
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                Contact Us
              </Link>
              <a href="#services" className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                Our Services
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>• Mattress Removal</p>
              <p>• Furniture Removal</p>
              <p>• Appliance Removal</p>
              <p>• Construction Debris</p>
              <p>• Property Cleanouts</p>
              <p>• Commercial Services</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-400">(844)239-7711</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-400">info@woodysremoval.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-400">Serving Local & Nationwide</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-400">7 Days a Week</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Woody's Removal Service. All rights reserved. | 
            <span className="text-emerald-400"> Professional • Reliable • Trusted</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;