import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex w-full items-center mb-4">
              <img src="/public/logo.png" alt="Logo" className="h-10 w-10" />
            </div>
            {/* <h3 className="text-xl font-bold text-white mb-4">ThinnerMart</h3> */}

            <p className="mb-4 text-gray-400">
              Premium quality thinners manufactured in India. Serving
              professionals and businesses since 2005.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://youtube.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-conditions"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Refund & Returns Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Delivery & Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span>
                  W228, Pimpleshwar Mandir Rd, Sagaon, Dombivli East, Dombivli,
                  Maharashtra 421203, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-gray-400" />
                <span>+91 8452006089</span> <br />
                <span>+91 8452006489</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-gray-400" />
                <span>info@thinnermart.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ThinnerMart. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <img
              src="/public/payment-methods.png"
              alt="Payment Methods"
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
