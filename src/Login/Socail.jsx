import React from "react";
import { Link } from "react-router-dom";

const Socail = () => {
  return (
    <div>
      <div className="flex mt-4 justify-center space-x-4">
        <Link className="p-2 rounded-full border hover:bg-gray-100">
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google"
            className="h-6 w-6"
          />
        </Link>
        <button className="p-2 rounded-full border hover:bg-gray-100">
          <img
            src="https://img.icons8.com/color/48/facebook-new.png"
            alt="Facebook"
            className="h-6 w-6"
          />
        </button>
        <button className="p-2 rounded-full border hover:bg-gray-100">
          <img
            src="https://img.icons8.com/color/48/twitter.png"
            alt="Twitter"
            className="h-6 w-6"
          />
        </button>
      </div>
    </div>
  );
};

export default Socail;
