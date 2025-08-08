import React from "react";
import { motion } from "framer-motion";
import SimpleGradientButton from "../Shared/Banner/glow-button";

const AppOfferSection = () => {
  return (
    <section className="bg-[linear-gradient(71deg,#ffffff,#e1edf0,#c2dce0,#a4cad1,#86b8c1,#67a6b2,#4995a2,#2a8393,#0c7183)] text-white py-12 px-4 md:px-10 rounded-2xl shadow-xl w-11/12 mx-auto my-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.h2
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-bold mb-3"
        >
          🎉 Special App Offer!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm md:text-lg font-light mb-6"
        >
          Download our app and get <span className="font-semibold">500 coins</span> instantly!
        </motion.p>

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
    </section>
  );
};

export default AppOfferSection;
