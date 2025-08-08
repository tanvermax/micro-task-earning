import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const socialLinks = [
  {
    href: "https://facebook.com",
    icon: <FaFacebookF size={20} />,
    label: "Facebook",
  },
  {
    href: "https://twitter.com",
    icon: <FaTwitter size={20} />,
    label: "Twitter",
  },
  {
    href: "https://youtube.com",
    icon: <FaYoutube size={20} />,
    label: "YouTube",
  },
  {
    href: "https://instagram.com",
    icon: <FaInstagram size={20} />,
    label: "Instagram",
  },
];

const Footer = () => {
  return (
    <footer className=" bg-gray-900">
      {/* Top Section */}
     <div className=" text-gray-300 py-12 px-6 sm:px-12 max-w-screen-2xl mx-auto  shadow-inner">
       <motion.div
        className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start max-w-xs text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-white mb-2 tracking-wide">Earnly</h2>
          <p className="text-gray-400 leading-relaxed">
            Delivering the best products with top-notch service.
          </p>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-12 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h6 className="text-lg font-semibold text-white mb-5 tracking-wide uppercase">Services</h6>
            <ul className="space-y-3">
              {["Design", "Marketing", "Development"].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 font-medium"
                    aria-label={service}
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h6 className="text-lg font-semibold text-white mb-5 tracking-wide uppercase">Company</h6>
            <ul className="space-y-3">
              {["About Us", "Contact", "Careers"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 font-medium"
                    aria-label={item}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.6 }}
      >
        {/* Social Icons */}
        <div className="flex gap-6 mb-6 md:mb-0">
          {socialLinks.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 transform hover:scale-110"
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-gray-500 select-none">
          © 2025 Earnly. All rights reserved.
        </p>
      </motion.div>
     </div>
    </footer>
  );
};

export default Footer;
