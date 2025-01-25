import { IoIosNotifications } from "react-icons/io";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import useAuth from "../Provider/useAuth";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle for showing/hiding notifications
  const popUpRef = useRef(null); // Reference for the pop-up
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: notofi = [], refetch } = useQuery({
    queryKey: ["notofi"], // Unique key for caching and identifying the query
    queryFn: async () => {
      const response = await axiosSecure.get(`/newnotificatio`);
      const userNotifications = response.data.filter(
        (item) => item.woekermail === user.email
      );
      // Sort notifications in descending order based on the date
      return userNotifications.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp) // Assuming the field is 'timestamp'
      ); // Filter notifications for the logged-in user
    },
  });

  // Toggle the notification pop-up
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  // Close the pop-up when clicking outside
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
    <div className="items-center lg:w-32 relative -left-11 lg:block">
      <div className="relative">
        <div className="indicator">
          <span className="indicator-item badge badge-secondary">
            {notofi.length}
          </span>
          <button onClick={toggleNotifications}>
            <IoIosNotifications className="ml-10 lg:text-5xl" />
          </button>
        </div>

        {/* Notification Floating Pop-Up */}
        {isOpen && (
          <div
            ref={popUpRef}
            className="absolute top-12 right-0 bg-white shadow-lg border rounded-lg w-72 p-4 z-50"
          >
            {notofi.length > 0 ? (
              <ul>
                {notofi.map((notification, index) => (
                  <li
                    key={index}
                    className="p-2 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
                  >
                    <h4 className="font-semibold">
                      {notification.workermessage || "Notification"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {notification.woekermail || "Details not available"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {notification.data}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No new notifications</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
