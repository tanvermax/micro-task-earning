import React from "react";

const PromoCard = () => {
  return (
    <div className="flex w-11/12 lg:w-full mx-auto  justify-center items-center py-10 bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl lg:flex items-center w-full max-w-4xl py-5">
        {/* Left Content */}
        <div className="flex-1 p-6">
          <h2 data-aos="zoom-in" className="text-2xl font-bold text-gray-800 mb-4">
            Start Your Journey - Earn Now
          </h2>
          <p className="text-sm text-gray-600">
            Take a few minutes to complete micro jobs anytime and anywhere with
            no prior experience. Be stress-free and choose simple jobs in
            various categories and start earning now with Picoworkers!
          </p>
        </div>

        {/* Right Button */}
        <div className="lg:p-6 flex justify-center items-center">
          <button className="bg-[#b1804e] text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-md hover:bg-red-600 focus:ring-4 focus:ring-red-300">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
