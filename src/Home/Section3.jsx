import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import { motion } from "framer-motion";

const Section3 = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "This platform exceeded my expectations. Amazing experience!",
    },
    {
      id: 2,
      name: "Jane Smith",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "Outstanding service! I highly recommend it to everyone.",
    },
    {
      id: 3,
      name: "Michael Brown",
      photo: "https://randomuser.me/api/portraits/men/54.jpg",
      quote: "A seamless and enjoyable experience. Absolutely love it!",
    },
    {
      id: 4,
      name: "Emily Johnson",
      photo: "https://randomuser.me/api/portraits/women/36.jpg",
      quote: "Fantastic platform with excellent support. Truly impressed!",
    },
  ];

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: "var(--sidebar-bg)" }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Users Say
        </motion.h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg max-w-xl mx-auto transition-shadow duration-300 hover:shadow-2xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-20 h-20 lg:w-24 lg:h-24 mx-auto rounded-full border-4 border-gray-200 shadow mb-4 object-cover"
                />
                <h3 className="text-lg lg:text-xl font-semibold text-gray-800">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600 mt-4 italic">"{testimonial.quote}"</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Section3;
