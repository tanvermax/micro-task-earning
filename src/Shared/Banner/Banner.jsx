import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles


const Banner = () => {
    return (
        <div>
            <div className="w-full h-[500px] bg-gray-100">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white">
            <div className="text-center">
              <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
              <p className="mt-4 text-lg">Explore the best features and services we have to offer!</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center bg-green-500 text-white">
            <div className="text-center">
              <h1 className="text-4xl font-bold">Unleash Your Potential</h1>
              <p className="mt-4 text-lg">Join us and grow your skills to the next level.</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="w-full h-full flex items-center justify-center bg-purple-500 text-white">
            <div className="text-center">
              <h1 className="text-4xl font-bold">Your Journey Begins Here</h1>
              <p className="mt-4 text-lg">Discover a world of opportunities and adventures.</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
        </div>
    );
};

export default Banner;