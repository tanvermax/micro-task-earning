import { IoIosNotifications } from "react-icons/io";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle for showing/hiding notifications
  const axiosSecure = useAxiosSecure();

  const { data: notofi = [], refetch } = useQuery({
    queryKey: ["notofi"], // Unique key for caching and identifying the query
    queryFn: async () => {
      const response = await axiosSecure.get(`/newnotificatio`);
      return response.data; // Return the fetched notifications
    },
  });

  // Toggle the notification dropdown
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="items-center lg:w-32 relative -left-11 lg:block">
      <div className="relative">
        <div className="indicator">
          <span className="indicator-item badge badge-secondary">{notofi.length}</span>
          <button onClick={toggleNotifications}>
            <IoIosNotifications className="ml-10 lg:text-5xl" />
          </button>
        </div>
        
        {/* Notification Dropdown */}
        {isOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-lg border rounded-lg w-72 p-4 z-50">
            {notofi.length > 0 ? (
              <ul>
                {notofi.map((notification, index) => (
                  <li
                    key={index}
                    className="p-2 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
                  >
                    <h4 className="font-semibold">{notification.workermessage || "Notification"}</h4>
                    <p className="text-sm text-gray-600">{notification.woekermail || "Details not available"}</p>
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
