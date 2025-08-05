import { IoIosNotifications } from "react-icons/io";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import useAuth from "../Provider/useAuth";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popUpRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: notofi = [], refetch } = useQuery({
    queryKey: ["notofi"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/newnotificatio`);
      const userNotifications = response.data.filter(
        (item) => item.woekermail === user.email
      );
      return userNotifications.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
    },
  });

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

  return (
    <div className="relative">
      <div className="relative">
        <button onClick={() => setIsOpen(!isOpen)} className="relative">
          <IoIosNotifications className="text-3xl text-gray-700 hover:text-black transition duration-150" />
          {notofi.length > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded-full">
              {notofi.length}
            </span>
          )}
        </button>

        {isOpen && (
          <div
            ref={popUpRef}
            className="absolute right-0 mt-3 bg-white border border-gray-200 shadow-md rounded-md z-50"
          >
            <div className="px-4 py-3 border-b font-semibold text-gray-700">
              Notifications
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notofi.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {notofi.map((notification, index) => (
                    <li
                      key={index}
                      className="px-4 py-3 hover:bg-gray-50 transition text-sm"
                    >
                      <div className="font-medium text-gray-800 mb-1">
                        {notification.workermessage || "Notification"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {notification.woekermail}
                      </div>
                      <div className="text-xs text-gray-500">
                        {notification.data}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-6 text-sm text-center text-gray-500">
                  No new notifications
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
