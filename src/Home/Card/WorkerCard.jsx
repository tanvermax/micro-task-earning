import React from "react";
import { FaBitcoin } from "react-icons/fa";
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

  const handlefollow = () => {
    if (!userData) navigate("/login");
  };

  const handlemessage = () => {
    if (!userData) navigate("/login");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm border border-gray-200 hover:shadow-xl transition-all duration-300">
      {/* Cover Photo */}
      <div className="relative w-full h-28 bg-gray-200">
        <img
          className="object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=60"
          alt="cover"
        />
        {/* Profile Picture */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 border-4 border-white rounded-full w-24 h-24 overflow-hidden shadow-md">
          <img
            className="object-cover w-full h-full"
            src={photo}
            alt={userName}
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-16 text-center px-4">
        <h2 className="text-lg font-semibold text-gray-800">{userName}</h2>
        <p className="text-sm text-gray-500">
          Role: <span className="font-medium capitalize">{role}</span>
        </p>

        {/* Coins */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <FaBitcoin className="text-yellow-500 text-xl" />
          <span className="font-semibold text-gray-700">{coins}</span>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 mt-3 italic">{bio}</p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6 pb-6">
          <SimpleGradientButton
            colors={{
              base: { from: "#000000", via: "#4F46E5", to: "#9333EA" },
              hover: { from: "#4F46E5", via: "#000000", to: "#EF4444" },
              focusRing: "#48acca",
            }}
            onClick={handlefollow}
          >
            Follow
          </SimpleGradientButton>

          <SimpleGradientButton
            colors={{
              base: { from: "#000000", via: "#4F46E5", to: "#9333EA" },
              hover: { from: "#4F46E5", via: "#000000", to: "#EF4444" },
              focusRing: "#48acca",
            }}
            onClick={handlemessage}
          >
            Message
          </SimpleGradientButton>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
