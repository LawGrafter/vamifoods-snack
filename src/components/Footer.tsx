import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-[#D13F4A] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Vamifoods</h3>
                <p className="text-xs text-gray-400">Authentic Hyderabadi Flavors</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Bringing you the authentic taste of Hyderabad with traditional recipes passed down through generations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#D13F4A] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D13F4A] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D13F4A] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D13F4A] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-[#D13F4A] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-[#D13F4A] transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/bulk-orders" className="text-gray-300 hover:text-[#D13F4A] transition-colors">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-[#D13F4A] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping-policy" className="text-gray-300 hover:text-[#D13F4A] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-gray-300 hover:text-[#D13F4A] transition-colors">
                  Return & Refund
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-[#D13F4A] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-gray-300 hover:text-[#D13F4A] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#D13F4A] mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">
                    123 Heritage Street, Old City,<br />
                    Hyderabad, Telangana 500001
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#D13F4A]" />
                <p className="text-gray-300 text-sm">+91 9876543210</p>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#D13F4A]" />
                <p className="text-gray-300 text-sm">hello@vamifoods.com</p>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-sm font-medium mb-2">Subscribe to Newsletter</h5>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:border-[#D13F4A] text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D13F4A] hover:bg-[#B8363F] text-white text-sm rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Vamifoods. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">We accept:</p>
              <div className="flex space-x-2">
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">UPI</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">Cards</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded">NetBanking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;