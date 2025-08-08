import React from "react";
import SimpleGradientButton from "../Shared/Banner/glow-button";

const jobs = [
  {
    id: 1,
    title: "Social Media Marketing",
    count: 43,
    img: "https://plus.unsplash.com/premium_photo-1684179641331-e89c6320b6a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8U29jaWFsJTIwTWVkaWElMjBNYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D",
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
    img: "https://images.unsplash.com/photo-1566458383719-239ca2d59a37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEZvbGxvdyUyQyUyMFN1YnNjcmliZXxlbnwwfHwwfHx8MA%3D%3D",
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
    img: "https://plus.unsplash.com/premium_photo-1685208166965-d04149118ca5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8U0VPfGVufDB8fDB8fHww",
  },
  {
    id: 6,
    title: "Reviews",
    count: 1,
    img: "https://plus.unsplash.com/premium_photo-1738635133589-cb29d4905b45?q=80&w=1046&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const JobCard = ({ title, count, img }) => (
  <div className="relative rounded-lg shadow-md overflow-hidden group transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
    {/* Front Side */}
    <div className=" flex flex-col items-center bg-[#e4ebeab6]  group-hover:opacity-0 group-hover:absolute transition-opacity duration-300">
      <img src={img} alt={title} className="w-[600px] h-[350px] mb-4 object-cover" />
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <span className="mt-1 text-sm text-gray-600">{count} Jobs</span>
    </div>
    {/* Back Side */}
    <div className="absolute inset-0 p-4 bg-[#2d8a8a6b] text-black flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-center text-sm">
        Discover jobs in <strong>{title}</strong> and grow your expertise.
      </p>
    </div>
  </div>
);

const Section6 = () => {
  return (
    <section className="py-10 bg-[var(--sidebar-bg)]">
      <div className="text-center mb-10 px-4">
        <h1 className="text-3xl font-bold">Find Your Jobs Easily</h1>
        <p className="text-gray-600 mt-2">
          Select a category and find jobs easily in your expert category.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-10">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>

      <div className="text-center mt-10">
        <SimpleGradientButton
          colors={{
            base: { from: "#000000", via: "#4F46E5", to: "#9333EA" },
            hover: { from: "#4F46E5", via: "#000000", to: "#EF4444" },
            focusRing: "#48acca",
          }}
          onClick={() => alert("Clicked!")}
        >
          View All
        </SimpleGradientButton>
       
      </div>
    </section>
  );
};

export default Section6;
