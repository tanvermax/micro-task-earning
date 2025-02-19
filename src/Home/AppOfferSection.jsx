import React from "react";
import { motion } from "framer-motion";

const AppOfferSection = () => {
  return (
    <section className="bg-gradient-to-r from-[#ddbd9d] to-[#ee1111] text-white py-12 w-11/12 mx-auto rounded-lg shadow-lg my-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <motion.h2
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:text-4xl font-bold mb-4"
        >
          🎉 Special Offer!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="lg:text-lg  text-[8px] mb-6"
        >
          Download our app today and get <span className="font-semibold">500 coins</span> instantly!
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <button
            onClick={() => window.open("https://app-download-link.com", "_blank")}
            className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all"
          >
            Download Now
          </button>
        </motion.div>
        <motion.img
          src="https://via.placeholder.com/200x200"
          alt="App Preview"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto mt-8 rounded-xl shadow-lg"
        />
      </motion.div>
    </section>
  );
};

export default AppOfferSection;
