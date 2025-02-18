import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import Sectiontitle from "./Sectiontitle";

const Banner = () => {
  return (
    <div className="bg-white ">
      <div className="w-full lg:h-[500px] h-[300px] ">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="h-full "
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <Sectiontitle
              heading={"Track Your Submissions Effortlessly"}
              subheading={
                "Stay organized with real-time updates on your tasks, payments, and statuses—all in one place."
              }
            ></Sectiontitle>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <Sectiontitle
              heading={"Empowering Workers and Buyers Alike"}
              subheading={
                "Seamlessly manage submissions, approvals, and payouts with an intuitive dashboard designed for everyone."
              }
            ></Sectiontitle>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <Sectiontitle
              heading={"Maximize Your Productivity"}
              subheading={
                "Leverage advanced tools to track progress, customize settings, and focus on what matters most—your work."
              }
            ></Sectiontitle>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
