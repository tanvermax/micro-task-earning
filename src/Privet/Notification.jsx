import { IoIosNotifications } from "react-icons/io";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import useAuth from "../Provider/useAuth";
import { motion, AnimatePresence } from "framer-motion";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popUpRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: notofi = [], refetch } = useQuery({
    queryKey: ["notofi"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/newnotificatio`);
      const sorted = (response.data || []).reverse();
      return sorted
        .filter((item) => item.woekermail === user.email)
        .sort((a, b) => new Date(b.data) - new Date(a.data)); // newest first
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 500); // every 5 seconds
    return () => clearInterval(interval);
  }, [refetch])


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-gray-700 hover:text-gray-900 transition-all duration-200"
      >
        <IoIosNotifications className="text-3xl md:text-4xl" />
        {notofi.length > 0 && (
          <span className="absolute -top-1 -right-1 text-[10px] md:text-xs bg-red-600 text-white px-2 py-0.5 rounded-full animate-pulse">
            {notofi.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popUpRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-[300px] md:w-[500px] bg-white border border-gray-200 shadow-xl rounded-xl z-50 overflow-hidden"
          >
            <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 font-semibold text-gray-700 flex justify-between items-center">
              <span>Notifications</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                ✕
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {notofi.length > 0 ? (
                <ul>
                  {notofi.map((notification, index) => (
                    <li
                      key={index}
                      className="px-4 py-3 hover:bg-indigo-50 transition cursor-pointer flex flex-col gap-1 border-b border-gray-100"
                    >
                      <div className="font-medium text-gray-800 text-sm md:text-base">
                        {notification.workermessage || "Notification"}
                      </div>
                      <div className="flex justify-between items-center text-[10px] md:text-xs text-gray-500">
                        <p>{notification.woekermail}</p>
                        <p>{formatDate(notification.data)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-6 text-center text-gray-500 text-sm">
                  No new notifications
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
