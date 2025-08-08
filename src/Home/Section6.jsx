import React from "react";
import { motion } from "framer-motion";
import SimpleGradientButton from "../Shared/Banner/glow-button";

const jobs = [
  {
    id: 1,
    title: "Social Media Marketing",
    count: 43,
    img: "https://plus.unsplash.com/premium_photo-1684179641331-e89c6320b6a9?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Create Account",
    count: 16,
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/6f998234431327.56d02b9c57f25.png",
  },
  {
    id: 3,
    title: "Follow, Subscribe",
    count: 15,
    img: "https://images.unsplash.com/photo-1566458383719-239ca2d59a37?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "CPA Leads",
    count: 9,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmbQzsAaicNW6-PDkBA2zOdJBHXkCYBHvYow&s",
  },
  {
    id: 5,
    title: "Pay Per View / SEO-1X",
    count: 3,
    img: "https://plus.unsplash.com/premium_photo-1685208166965-d04149118ca5?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    title: "Reviews",
    count: 1,
    img: "https://plus.unsplash.com/premium_photo-1738635133589-cb29d4905b45?q=80&w=1046&auto=format&fit=crop",
  },
];

const JobCard = ({ title, count, img }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="relative rounded-xl shadow-lg overflow-hidden group cursor-pointer"
  >
    {/* Image with zoom */}
    <div className="overflow-hidden">
      <img
        src={img}
        alt={title}
        className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-300 flex flex-col items-center justify-center text-white p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm">{count} Jobs</p>
      <p className="mt-2 text-center text-xs">
        Discover jobs in <strong>{title}</strong> and grow your expertise.
      </p>
    </div>

    {/* Title & count (visible by default) */}
    <div className="p-4 bg-white">
      <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      <span className="mt-1 text-sm text-gray-500">{count} Jobs</span>
    </div>
  </motion.div>
);

const Section6 = () => {
  return (
    <section className="py-14 bg-[var(--sidebar-bg)]">
      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-3xl font-bold">Find Your Jobs Easily</h1>
        <p className="text-gray-600 mt-2">
          Select a category and find jobs in your expertise area.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-10">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <SimpleGradientButton
          colors={{
            base: { from: "#000000", via: "#4F46E5", to: "#9333EA" },
            hover: { from: "#4F46E5", via: "#000000", to: "#EF4444" },
            focusRing: "#48acca",
          }}
          onClick={() => alert("View All clicked!")}
        >
          View All
        </SimpleGradientButton>
      </div>
    </section>
  );
};

export default Section6;
