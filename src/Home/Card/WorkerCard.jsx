import React, { useState, useEffect } from "react";
import { FaBitcoin, FaUserPlus, FaUserCheck } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import { useNavigate } from "react-router-dom";
import SimpleGradientButton from "../../Shared/Banner/glow-button";
import axios from "axios";
import useAuth from "../../Provider/useAuth";

const WorkerCard = ({
  photo,
  userName,
  role,
  coins,
  bio = "This user hasn't written a bio yet. 🚀",
  userId, 
}) => {
 const { user: userData } = useAuth();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const API_BASE = "http://localhost:5000";

  // Check if current user is following this user
  useEffect(() => {
    if (userData && userId) {
      checkFollowStatus();
      fetchUserDetails();
    }
  }, [userData, userId]);

  const checkFollowStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE}/users/${userId}`);
      const user = response.data;
      
      // Check if current user is in the followers list
      const following = user.followers?.some(follower => 
        follower._id === userData._id || follower === userData._id
      );
      setIsFollowing(following);
      setFollowersCount(user.followers?.length || 0);
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE}/users/${userId}`);
      setFollowersCount(response.data.followers?.length || 0);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleFollow = async () => {
    if (!userData) {
      navigate("/login");
      return;
    }
console.log("processin")
    setLoading(true);
    try {
      // if (isFollowing) {
        // Unfollow logic
        // await axios.post(`${API_BASE}/users/${userData._id}/unfollow/${userId}`);
        // setIsFollowing(false);
        // setFollowersCount(prev => prev - 1);
      // } else {
        // Follow logic
        await axios.post(`${API_BASE}/users/${userData._id}/follow/${userId}`);
        // setIsFollowing(true);
        // setFollowersCount(prev => prev + 1);
      // }
    } catch (error) {
      console.error('Error following/unfollowing user:', error);
      // Handle specific errors
      if (error.response?.status === 400) {
        alert(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMessage = () => {
    if (!userData) {
      navigate("/login");
      return;
    }
    // Add your message logic here
    console.log("Navigate to message page for user:", userId);
  };

  const handleViewProfile = () => {
    navigate(`/profile/${userId}`);
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
        
        {/* Followers Badge */}
        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
          {followersCount} followers
        </div>
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

          {/* Follow Status */}
          {isFollowing && (
            <div className="mt-2">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Following ✓
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-6 pb-6">
            <SimpleGradientButton
              onClick={handleFollow}
              disabled={loading}
              colors={{
                base: { 
                  from: isFollowing ? "#EF4444" : "#4F46E5", 
                  via: isFollowing ? "#DC2626" : "#9333EA", 
                  to: isFollowing ? "#B91C1C" : "#EF4444" 
                },
                hover: { 
                  from: isFollowing ? "#DC2626" : "#9333EA", 
                  via: isFollowing ? "#B91C1C" : "#EF4444", 
                  to: isFollowing ? "#991B1B" : "#000000" 
                },
                focusRing: "#48acca",
              }}
            >
              <span className="flex items-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isFollowing ? "Unfollowing..." : "Following..."}
                  </>
                ) : (
                  <>
                    {isFollowing ? <FaUserCheck /> : <FaUserPlus />}
                    {isFollowing ? "Unfollow" : "Follow"}
                  </>
                )}
              </span>
            </SimpleGradientButton>

            <SimpleGradientButton
              onClick={handleViewProfile}
              colors={{
                base: { from: "#4F46E5", via: "#9333EA", to: "#EF4444" },
                hover: { from: "#9333EA", via: "#EF4444", to: "#000000" },
                focusRing: "#48acca",
              }}
            >
              <span className="flex items-center gap-2">
                <CgProfile /> View Profile
              </span>
            </SimpleGradientButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;