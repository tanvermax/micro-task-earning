import React from "react";

const Newsletter = () => {
  return (
    <div className="bg-[linear-gradient(71deg,#ffffff,#e1edf0,#c2dce0,#a4cad1,#86b8c1,#67a6b2,#4995a2,#2a8393,#0c7183)] py-20 px-10 ">
      <div className="max-w-4xl w-full mx-auto text-center">
        <h2 className="text-[#000000] text-xl md:text-5xl font-extrabold mb-6 lg:leading-[45px]">
          Subscribe Our Newsletter
        </h2>
        <p className="lg:text-base text-[10px] text-gray-600">
          Stay updated with our latest news and exclusive offers. Join our
          community today!
        </p>

        <div className="mt-12 bg-white flex items-center sm:p-4 p-2 max-w-xl mx-auto rounded-2xl border border-gray-300">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-transparent lg:py-4 px-2 text-gray-800 text-base border-none outline-none"
          />
          <button className="bg-[#000000] hover:bg-gray-800 text-[#19d1e9] text-base font-semibold py-4 px-4 sm:px-8 rounded-xl focus:outline-none">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
