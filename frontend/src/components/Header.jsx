import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Phone } from "lucide-react";
import logoImg from '../images/woody-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Order", href: "/order" },
    { name: "Contact", href: "/contact" },
  ];

  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-0">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-white rounded-lg p-0">
              <span className="font-bold text-xl"><img src={logoImg} alt="Woody Logo" className="logo"/></span>
            </div>
            <div>
            <span className="text-2xl font-bold text-gray-900">Woody's</span>
              <br />
              <span className="text-sm text-emerald-600 font-medium">Removal Service</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors duration-200 ${
                  isActiveLink(item.href)
                    ? "text-emerald-600 border-b-2 border-emerald-600 pb-1"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center space-x-4">
           {/* <div className="flex items-center space-x-2 text-emerald-600">
              <Phone className="h-5 w-5" />
              <span className="font-semibold">(844) 239-7711</span>
            </div>*/}
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
            <Link to="/contact">Get Free Quote</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
                    isActiveLink(item.href)
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-2 text-emerald-600 py-2 px-4">
                <Phone className="h-5 w-5" />
                {/*<span className="font-semibold">(844) 239-7711</span>*/}
              </div>
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 mx-4 rounded-lg transition-all duration-200"
              >
                Get Free Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;