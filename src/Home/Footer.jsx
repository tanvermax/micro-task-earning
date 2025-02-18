import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" " >
      <footer className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Top Section: Logo and Links */}
        <div className="flex flex-col md:flex-row justify-evenly items-center md:items-start gap-8">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold">Earnly</h2>
            <p className="text-sm text-gray-400 mt-2">
              Delivering the best products with top-notch service.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-6 text-center md:text-left">
            {/* Services */}
            <div>
              <h6 className="text-lg font-semibold text-gray-300 mb-4">Services</h6>
              <ul>
                <li className="mb-2">
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Design
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Marketing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Development
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h6 className="text-lg font-semibold text-gray-300 mb-4">Company</h6>
              <ul>
                <li className="mb-2">
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              <FaInstagram size={20} />
            </a>
          </div>

          {/* Footer Bottom Text */}
          <p className="text-sm text-gray-400 mt-4 md:mt-0">
            © 2025 YourCompany. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
