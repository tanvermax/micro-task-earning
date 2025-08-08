import React from "react";
import { GoCodeOfConduct, GoThumbsup } from "react-icons/go";
import { motion } from "framer-motion";

const Section4 = () => {
  const stats = [
    {
      id: 1,
      icon: "✅",
      count: "50K+",
      description: "Total Task Posts",
    },
    {
      id: 2,
      icon: <GoThumbsup />,
      count: "26K+",
      description: "Completed Projects",
    },
    {
      id: 3,
      icon: <GoCodeOfConduct />,
      count: "94K+",
      description: "Registered Freelancers",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 py-20 px-6 bg-gradient-to-br from-gray-100 via-white to-gray-200">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          className="backdrop-blur-lg bg-white/70 border border-white/40 shadow-lg rounded-xl p-6 flex flex-col items-center justify-center w-36 h-28 lg:w-64 lg:h-32 transition-all duration-300 hover:shadow-2xl"
        >
          <motion.div
            whileHover={{ rotate: 10, scale: 1.2 }}
            className="text-indigo-600 text-xl lg:text-4xl mb-2"
          >
            {stat.icon}
          </motion.div>
          <h3 className="lg:text-2xl text-sm font-bold text-gray-900">{stat.count}</h3>
          <p className="lg:text-base text-[10px] text-gray-600 text-center">
            {stat.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default Section4;
