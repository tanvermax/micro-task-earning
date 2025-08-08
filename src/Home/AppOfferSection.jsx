import React from "react";
import { motion } from "framer-motion";
import SimpleGradientButton from "../Shared/Banner/glow-button";

const AppOfferSection = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl shadow-2xl w-11/12 mx-auto my-10">
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#a4cad1] to-[#0c7183] animate-[pulse_8s_ease-in-out_infinite] opacity-90" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative text-center py-14 px-6 md:px-10 text-white"
      >
        <motion.h2
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg"
        >
          🎉 Special App Offer!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base md:text-lg font-light mb-8 max-w-2xl mx-auto"
        >
          Download our app and get{" "}
          <span className="font-semibold text-yellow-300 drop-shadow-md">
            500 coins
          </span>{" "}
          instantly! Start earning today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <SimpleGradientButton
            colors={{
              base: { from: "#000000", via: "#4F46E5", to: "#9333EA" },
              hover: { from: "#4F46E5", via: "#000000", to: "#EF4444" },
              focusRing: "#48acca",
            }}
            onClick={() => alert("Clicked!")}
          >
            Download App
          </SimpleGradientButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AppOfferSection;
