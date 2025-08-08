import React from "react";
import SimpleGradientButton from "../Shared/Banner/glow-button";

const PromoCard = () => {
  return (
    <div className="flex w-11/12 lg:w-full mx-auto  justify-center items-center py-10 b">
      <div className=" shadow-lg rounded-xl lg:flex items-center w-full max-w-4xl py-5">
        {/* Left Content */}
        <div className="flex-1 p-6">
          <h2 data-aos="zoom-in" className="text-2xl font-bold mb-4">
            Start Your Journey - Earn Now
          </h2>
          <p className="text-sm ">
            Take a few minutes to complete micro jobs anytime and anywhere with
            no prior experience. Be stress-free and choose simple jobs in
            various categories and start earning now with Picoworkers!
          </p>
        </div>

        {/* Right Button */}
        <div className="lg:p-6 flex justify-center items-center">
          <SimpleGradientButton
                    colors={{
                      base: { from: "#000000", via: "#4F46E5", to: "#9333EA" },
                      hover: { from: "#4F46E5", via: "#000000", to: "#EF4444" },
                      focusRing: "#48acca",
                    }}
                    onClick={() => alert("Clicked!")}
                  >
                    Get Started Now
                  </SimpleGradientButton>
         
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
