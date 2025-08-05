import React from "react";
import { FaBitcoin } from "react-icons/fa";

const WorkerCard = ({ photo, userName, role, coins }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col items-center text-center p-6 hover:shadow-xl transition-shadow">
      <div className="w-full h-24 overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=60"
          alt="cover"
        />
      </div>
      <div className="-mt-12 w-24 h-24 border-4 border-white rounded-full overflow-hidden shadow-md">
        <img className="object-cover w-full h-full" src={photo} alt={userName} />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-gray-800">{userName}</h2>
      <p className="text-sm text-gray-500">
        Role: <span className="font-medium capitalize">{role}</span>
      </p>

      <div className="flex items-center justify-center gap-2 mt-4">
        <FaBitcoin className="text-yellow-500 text-xl" />
        <span className="font-semibold text-gray-700">{coins}</span>
      </div>

      <button className="mt-4 bg-[#b1804e] hover:bg-[#9c6c3e] text-white text-sm font-semibold py-2 px-6 rounded-full transition">
        Follow
      </button>
    </div>
  );
};

export default WorkerCard;
