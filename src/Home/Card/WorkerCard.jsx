import React from "react";
import { FaBitcoin, FaUserPlus, FaEnvelope } from "react-icons/fa";
import userMange from "../../Privet/Dashbord/userMange";
import { useNavigate } from "react-router-dom";
import SimpleGradientButton from "../../Shared/Banner/glow-button";

const WorkerCard = ({
  photo,
  userName,
  role,
  coins,
  bio = "This user hasn’t written a bio yet. 🚀",
}) => {
  const [userData] = userMange();
  const navigate = useNavigate();

  const handleFollow = () => {
    if (!userData) navigate("/login");
  };

  const handleMessage = () => {
    if (!userData) navigate("/login");
  };

  return (
    <div className="bg-white/90 rounded-2xl shadow-lg overflow-hidden w-full max-w-sm border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      {/* Cover Photo */}
      <div className="relative w-full h-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <img
          className="object-cover w-full h-full opacity-80"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=60"
          alt="cover"
        />
      </div>

      {/* Info Section */}
      <div className="px-5 relative">
        {/* Profile Picture */}
        <div className="absolute -top-24 left-[18%] transform -translate-x-1/2 border-4 border-white rounded-full w-24 h-24 overflow-hidden shadow-xl">
          <img
            className="object-cover w-full h-full"
            src={photo}
            alt={userName}
          />
        </div>

        {/* User Info */}
        <div className="text-center mt-16">
          <h2 className="text-xl font-bold text-gray-800">{userName}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Role:{" "}
            <span className="font-medium capitalize text-indigo-600">
              {role}
            </span>
          </p>

          {/* Coins */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <FaBitcoin className="text-yellow-500 text-xl animate-bounce" />
            <span className="font-semibold text-gray-700">{coins}</span>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-600 mt-3 italic px-2 line-clamp-3">
            {bio}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6 pb-6">
            <SimpleGradientButton
              onClick={handleFollow}
              colors={{
                base: { from: "#4F46E5", via: "#9333EA", to: "#EF4444" },
                hover: { from: "#9333EA", via: "#EF4444", to: "#000000" },
                focusRing: "#48acca",
              }}
            >
              <span className="flex items-center gap-2">
                <FaUserPlus /> Follow
              </span>
            </SimpleGradientButton>

            <SimpleGradientButton
              onClick={handleMessage}
              colors={{
                base: { from: "#4F46E5", via: "#9333EA", to: "#EF4444" },
                hover: { from: "#9333EA", via: "#EF4444", to: "#000000" },
                focusRing: "#48acca",
              }}
            >
              <span className="flex items-center gap-2">
                <FaEnvelope /> Message
              </span>
            </SimpleGradientButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
