import React from "react";
import { motion } from "framer-motion";
import SimpleGradientButton from "../Shared/Banner/glow-button";

const Newsletter = () => {
  return (
    <section className="bg-[linear-gradient(71deg,#ffffff,#e1edf0,#c2dce0,#a4cad1,#86b8c1,#67a6b2,#4995a2,#2a8393,#0c7183)] py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl w-full mx-auto text-center"
      >
        {/* Heading */}
        <motion.h2
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-black text-2xl md:text-5xl font-extrabold mb-4 leading-snug"
        >
          Subscribe to Our Newsletter
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:text-base text-sm text-gray-700"
        >
          Stay updated with our latest news, special promotions, and exclusive offers.
          Join our growing community today!
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 bg-white flex items-center gap-2 sm:p-3 p-2 max-w-xl mx-auto rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-transparent py-3 px-2 text-gray-800 text-sm md:text-base border-none outline-none placeholder-gray-500"
          />
          <motion.div
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SimpleGradientButton
              colors={{
                base: { from: "#000000", via: "#4F46E5", to: "#9333EA" },
                hover: { from: "#4F46E5", via: "#000000", to: "#EF4444" },
                focusRing: "#48acca",
              }}
              onClick={() => alert("Subscribed!")}
            >
              Subscribe
            </SimpleGradientButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
