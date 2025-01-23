import React from "react";

const Section4 = () => {
  const stats = [
    {
      id: 1,
      icon: "✅", // Replace with your awsomecomponent icon if applicable
      count: "50K+",
      description: "Total Job Posts",
    },
    {
      id: 2,
      icon: "✅", // Replace with your awsomecomponent icon if applicable
      count: "26K+",
      description: "Completed Projects",
    },
    {
      id: 3,
      icon: "✅", // Replace with your awsomecomponent icon if applicable
      count: "94K+",
      description: "Registered Freelancers",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6  text-black py-20 p-8">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white text-black flex flex-col items-center justify-center w-64 h-32 rounded-lg shadow-md p-4"
        >
          <div className="text-3xl mb-2">{stat.icon}</div>
          <h3 className="text-2xl font-bold">{stat.count}</h3>
          <p className="text-sm text-gray-600">{stat.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Section4;
