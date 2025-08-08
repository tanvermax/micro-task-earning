import React from "react";
import SimpleGradientButton from "../Shared/Banner/glow-button";

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
          <SimpleGradientButton
            colors={{
              base: { from: "#000000", via: "#4F46E5", to: "#9333EA" },
              hover: { from: "#4F46E5", via: "#000000", to: "#EF4444" },
              focusRing: "#48acca",
            }}
            onClick={() => alert("Clicked!")}
          >
            Subscribe
          </SimpleGradientButton>

        </div>
      </div>
    </div>
  );
};

export default Newsletter;
