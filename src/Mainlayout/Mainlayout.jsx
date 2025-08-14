import React, { useEffect, useState } from "react";
import Navber from "../Home/Navber";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Home/Footer";
import Aos from "aos";
import { ToastContainer } from "react-toastify";


const Mainlayout = () => {
  const location = useLocation();
  const noHeaderfoot = location.pathname.includes("dashbord");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    Aos.init({
      duration: 3000, // Animation duration in milliseconds
      once: true, // Animation only happens once
      easing: "ease-in-out",
    });
  }, []);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  
  return (
    <>
      <div className="items-center text-center">
        {loading ? (
          <span className="loading loading-bars   mt-32 loading-3xl mx-auto w-20 "></span>
        ) : (
            <div data-aos="fade-up" className="">
                <ToastContainer />
            {noHeaderfoot || <Navber></Navber>}
            <div data-aos="fade-up" className="min-h-screen">
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
