import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import Sectiontitle from "./Sectiontitle";
import photo1 from './../../assets/photo1.jpg'
import photo2 from './../../assets/photo23.jpg'
import photo3 from './../../assets/photo54.jpg'
const Banner = () => {
  return (
    <div className=" ">
      <div className="">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 1200000, disableOnInteraction: false }}
          loop
          className="h-full "
        >
          {/* Slide 1 */}
          <SwiperSlide  style={{ backgroundColor: "var(--sidebar-bg)" }}>
           <div className="px-20  gap-10 lg:py-28 py-10  items-center">
           <img className="lg:h-60 w-10 h-10 mx-auto lg:w-60 mask mask-hexagon-2" src={photo1} alt="" />
            <Sectiontitle
              heading={"Track Your Submissions Effortlessly"}
              subheading={
                "Stay organized with real-time updates on your tasks, payments, and statuses—all in one place."
              }
            ></Sectiontitle>
           </div>
          </SwiperSlide>


          <SwiperSlide style={{ backgroundColor: "var(--sidebar-bg)" }}>
          <div className="px-20  gap-10 lg:py-28 py-10 items-center">
          <img className="lg:h-60 w-10 h-10 lg:w-60 mask mask-hexagon-2 mx-auto" src={photo2} alt="" />
            <Sectiontitle
              heading={"Empowering Workers and Buyers Alike"}
              
              subheading={
                "Seamlessly manage submissions, approvals, and payouts with an intuitive dashboard designed for everyone."
              }
            ></Sectiontitle>
          </div>
          </SwiperSlide>


          <SwiperSlide style={{ backgroundColor: "var(--sidebar-bg)" }}>
          <div className="px-20 = lg:gap-10 py-10 lg:py-28 items-center">
          <img className="lg:h-60 w-10 h-10 lg:w-60 mask mask-hexagon-2 mx-auto" src={photo3} alt="" />
            <Sectiontitle
              heading={"Maximize Your Productivity"}
              subheading={
                "Leverage advanced tools to track progress, customize settings, and focus on what matters most—your work."
              }
            >
              
            </Sectiontitle>
          </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
