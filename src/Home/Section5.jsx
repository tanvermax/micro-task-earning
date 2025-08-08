import React from "react";
import { motion } from "framer-motion";
import SimpleGradientButton from "../Shared/Banner/glow-button";

const Section5 = () => {
  return (
    <div
      className="grid md:grid-cols-2 gap-8 px-6 md:px-20 py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100"
    >
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -5 }}
        className="bg-[#030303] text-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all"
      >
        <h2 className="text-3xl font-bold mb-4">
          Micro Tasks - Deliver Work, Make Money: This is How
        </h2>
        <div className="h-1 w-16 bg-red-500 mb-6 rounded-full"></div>
        <p className="mb-6 text-gray-300 leading-relaxed">
          Take surveys, download apps, play games, or follow social media apps.
          Our platform offers diverse ways to boost your income—perfect for
          students, freelancers, or stay-at-home parents. Connect with employers
          safely and get paid seamlessly. Register now and start earning today!
        </p>
        <SimpleGradientButton
          colors={{
            base: { from: "#000000", via: "#4F46E5", to: "#9333EA" },
            hover: { from: "#4F46E5", via: "#000000", to: "#EF4444" },
            focusRing: "#48acca",
          }}
          onClick={() => alert("Find A Job clicked!")}
        >
          Find A Job
        </SimpleGradientButton>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -5 }}
        className="bg-white text-gray-900 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all"
      >
        <h2 className="text-3xl font-bold mb-4">
          Hire Talent in Minutes & Get Work Done
        </h2>
        <div className="h-1 w-16 bg-red-500 mb-6 rounded-full"></div>
        <p className="mb-6 text-gray-600 leading-relaxed">
          Whether you’re a company or an individual, crowdsource talent for your
          micro jobs and get it done fast—app testing, surveys, social media
          promotion, or sign-ups. One platform for all your needs. Sign up and
          start creating a job today!
        </p>
        <SimpleGradientButton
          colors={{
            base: { from: "#ffffff", via: "blue", to: "blue" },
            hover: { from: "red", via: "#000000", to: "#EF4444" },
            focusRing: "#48acca",
          }}
          onClick={() => alert("Post A Job clicked!")}
        >
          <span className="text-black">Post A Job</span>
        </SimpleGradientButton>
      </motion.div>
    </div>
  );
};

export default Section5;
