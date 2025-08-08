import React from 'react';
import SimpleGradientButton from '../Shared/Banner/glow-button';

const Section5 = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 px-6 md:px-20 py-12 " style={{ backgroundColor: "var(--sidebar-bg)" }}>
      {/* Left Section */}
      <div className="bg-[#ddbd9d] text-white rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-4">
          Micro Tasks - Deliver Work Make Money: This is how:
        </h2>
        <div className="h-1 w-16 bg-red-500 mb-6"></div>
        <p className="mb-6">
          Take surveys, download apps, play games, or follow social media apps. Picoworkers offers a diverse range of options to boost your income. Whether you are a student, freelancer, or stay-at-home parent, our platform connects you with employers quickly and safely with a seamless payment experience. Register now!
        </p>
        <SimpleGradientButton
          colors={{
            base: { from: "#000000", via: "#4F46E5", to: "#9333EA" },
            hover: { from: "#4F46E5", via: "#000000", to: "#EF4444" },
            focusRing: "#48acca",
          }}
          onClick={() => alert("Clicked!")}
        >
          Find A Job
        </SimpleGradientButton>

      </div>

      {/* Right Section */}
      <div className="bg-white text-gray-900 rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-4">
          Hire Talent in Minutes, and Get Work Done
        </h2>
        <div className="h-1 w-16 bg-red-500 mb-6"></div>
        <p className="mb-6">
          Whether you are a company or an individual, crowdsource talent for your micro jobs and start getting it done in minutes. App testing, surveys, promoting social media, or getting sign-ups—get it done with Picoworkers. One platform for all your needs; sign up now and start creating a job!
        </p>
        <SimpleGradientButton
          colors={{
            base: { from: "#ffffff", via: "blue", to: "blue" },
            hover: { from: "red", via: "#000000", to: "#EF4444" },
            focusRing: "#48acca",
          }}
          onClick={() => alert("Clicked!")}
        >
          <span className='text-black'>Post A Job</span>
        </SimpleGradientButton>
       
      </div>
    </div>
  );
};

export default Section5;