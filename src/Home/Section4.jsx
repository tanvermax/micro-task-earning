import React from "react";
import { GoCodeOfConduct, GoThumbsup } from "react-icons/go";

const Section4 = () => {
  const stats = [
    {
      id: 1,
      icon: "✅", // Replace with your awsomecomponent icon if applicable
      count: "50K+",
      description: "Total task Posts",
    },
    {
      id: 2,
      icon: <GoThumbsup />, // Replace with your awsomecomponent icon if applicable
      count: "26K+",
      description: "Completed Projects",
    },
    {
      id: 3,
      icon: <GoCodeOfConduct />, // Replace with your awsomecomponent icon if applicable
      count: "94K+",
      description: "Registered Freelancers",
    },
  ];

  return (
    <div className="flex flex-row justify-center items-center gap-6  text-black py-20 p-8">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white text-black flex flex-col items-center justify-center lg:w-64 lg:h-32 h-24 w-36 rounded-lg shadow-md p-4"
        >
          <div className="lg:text-3xl text-[12px] mb-2">{stat.icon}</div>
          <h3 className="lg:text-2xl text-[8px] font-bold">{stat.count}</h3>
          <p className="lg:text-sm text-[8px] text-gray-600">{stat.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Section4;
