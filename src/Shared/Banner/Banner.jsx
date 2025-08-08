import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

import SectionTitle from "./Sectiontitle";
import photo1 from "../../assets/photo1.jpg";
import photo2 from "../../assets/photo23.jpg";
import photo3 from "../../assets/photo54.jpg";
import SimpleGradientButton from "./glow-button";
const slides = [
  {
    id: 1,
    image: photo1,
    heading: "Track Your Submissions Effortlessly",
    subheading:
      "Stay organized with real-time updates on your tasks, payments, and statuses—all in one place.",
  },
  {
    id: 2,
    image: photo2,
    heading: "Empowering Workers and Buyers Alike",
    subheading:
      "Seamlessly manage submissions, approvals, and payouts with an intuitive dashboard designed for everyone.",
  },
  {
    id: 3,
    image: photo3,
    heading: "Maximize Your Productivity",
    subheading:
      "Leverage advanced tools to track progress, customize settings, and focus on what matters most—your work.",
  },
];

const Banner = () => {
  return (
    <div className="relative bottom-28">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="h-full"
      >
        {slides.map(({ id, image, heading, subheading }) => (
          <SwiperSlide key={id}>
            <div
              className="relative bg-cover bg-center bg-no-repeat h-[400px] lg:h-[800px] flex items-center justify-center px-4 lg:px-20"
              style={{ backgroundImage: `url(${image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

              {/* Content */}
              <div className="relative   z-10 text-center item-center text-white max-w-3xl mx-auto">
                <SectionTitle heading={heading} subheading={subheading} />
                {/* <GlowButton variant="blue">Blue Glow</GlowButton> */}
                <div className=" w-52 py-10 mx-auto">
                  <SimpleGradientButton
                    colors={{
                      base: { from: "#000000", via: "#4F46E5", to: "#9333EA" },
                      hover: { from: "#4F46E5", via: "#000000", to: "#EF4444" },
                      focusRing: "#48acca",
                    }}
                    onClick={() => alert("Clicked!")}
                  >
                    Join_With_Us
                  </SimpleGradientButton>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
