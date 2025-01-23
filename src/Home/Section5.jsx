import React from 'react';

const Section5 = () => {
    return (
        <div className="grid md:grid-cols-2 gap-8 px-6 md:px-20 py-12 bg-gray-100">
        {/* Left Section */}
        <div className="bg-red-900 text-white rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            Micro Tasks - Deliver Work Make Money: This is how:
          </h2>
          <div className="h-1 w-16 bg-red-500 mb-6"></div>
          <p className="mb-6">
            Take surveys, download apps, play games, or follow social media apps. Picoworkers offers a diverse range of options to boost your income. Whether you are a student, freelancer, or stay-at-home parent, our platform connects you with employers quickly and safely with a seamless payment experience. Register now!
          </p>
          <button className="bg-white text-red-900 font-semibold px-6 py-2 rounded hover:bg-red-500 hover:text-white transition">
            Find A Job
          </button>
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
          <button className="bg-red-500 text-white font-semibold px-6 py-2 rounded hover:bg-red-700 transition">
            Post A Job
          </button>
        </div>
      </div>
    );
};

export default Section5;