import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination,Autoplay } from "swiper/modules"; // Correct path for modules
import "swiper/css/autoplay";

const Section3 = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      photo:
        "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "This platform exceeded my expectations. Amazing experience!",
    },
    {
      id: 2,
      name: "Jane Smith",
      photo:
        "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "Outstanding service! I highly recommend it to everyone.",
    },
    {
      id: 3,
      name: "Michael Brown",
      photo:
        "https://randomuser.me/api/portraits/men/54.jpg",
      quote: "A seamless and enjoyable experience. Absolutely love it!",
    },
    {
      id: 4,
      name: "Emily Johnson",
      photo:
        "https://randomuser.me/api/portraits/women/36.jpg",
      quote: "Fantastic platform with excellent support. Truly impressed!",
    },
  ];

  return (
    <section className="bg-gray-100 ">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-[#b1804e] py-14">What Our Users Say</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Pagination,Autoplay]}
          className="mySwiper "
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white lg:p-32 p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="lg:w-24 w-16 lg:h-24 mx-auto rounded-full mb-4"
                />
                <h3 className="lg:text-xl font-semibold text-[#b1804e]">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600 mt-4">{testimonial.quote}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Section3;
