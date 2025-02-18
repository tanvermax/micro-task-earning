import React, { useEffect, useState } from "react";
import Navber from "../Home/Navber";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Home/Footer";


const Mainlayout = () => {
  const location = useLocation();
  const noHeaderfoot = location.pathname.includes("dashbord");
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <>
      <div className="items-center text-center">
        {loading ? (
          <span className="loading loading-bars text-[#b1804e] mt-32 loading-3xl mx-auto w-20 "></span>
        ) : (
            <div className="">
            {noHeaderfoot || <Navber></Navber>}
            <div className="min-h-screen">
              <Outlet></Outlet>
            </div>
            {noHeaderfoot || <Footer></Footer>}
          </div>
        )}
      </div>
      
    </>
  );
};

export default Mainlayout;
