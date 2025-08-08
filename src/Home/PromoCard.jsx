import React from "react";
import { motion } from "framer-motion";
import SimpleGradientButton from "../Shared/Banner/glow-button";

const PromoCard = () => {
  return (
    <section className="flex w-11/12 lg:w-full mx-auto justify-center items-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-white via-[#f9fafb] to-[#eef2f7] shadow-xl rounded-2xl lg:flex items-center w-full max-w-5xl overflow-hidden"
      >
        {/* Left Content */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 p-8"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 text-gray-900 leading-snug">
            Start Your Journey — <span className="text-indigo-600">Earn Now</span>
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Take a few minutes to complete micro jobs anytime and anywhere — no prior
            experience needed. Choose from various categories, work stress-free, and
            start earning instantly with Picoworkers!
          </p>
        </motion.div>

        {/* Right Button */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="lg:p-8 flex justify-center items-center bg-gradient-to-l from-indigo-50 via-white to-transparent"
        >
          <SimpleGradientButton
            colors={{
              base: { from: "#000000", via: "#4F46E5", to: "#9333EA" },
              hover: { from: "#4F46E5", via: "#000000", to: "#EF4444" },
              focusRing: "#48acca",
            }}
            onClick={() => alert("Clicked!")}
          >
            Get Started Now
          </SimpleGradientButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PromoCard;
