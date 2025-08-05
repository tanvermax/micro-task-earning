import React from "react";
import { motion } from "framer-motion";

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

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={() => window.open("https://app-download-link.com", "_blank")}
          className="bg-white text-[#43959b] font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition"
        >
          Download Now
        </motion.button>

      
      </motion.div>
    </section>
  );
};

export default AppOfferSection;
