import { IoIosNotifications } from "react-icons/io";

const Notification = () => {
  return (
    <div className="items-center  w-32 ">
      <div>
        
        <div className="indicator">
          <span className="indicator-item badge badge-secondary">99+</span>
          <button ><IoIosNotifications className="text-5xl" /></button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
