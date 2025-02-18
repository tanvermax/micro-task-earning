import React from 'react';

const Section6 = () => {

    const jobs = [
        { id: 1, title: "Social Media Marketing", count: 43, img: "https://www.wordstream.com/wp-content/uploads/2022/02/social-media-marketing-fundamentals-wordstream.png" },
        { id: 2, title: "Create Account", count: 16, img: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/6f998234431327.56d02b9c57f25.png" },
        { id: 3, title: "Follow, Subscribe", count: 15, img: "https://cdn.vectorstock.com/i/500p/43/37/thumb-up-tags-with-like-and-subscribe-buttons-vector-37174337.jpg" },
        { id: 4, title: "CPA Leads", count: 9, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmbQzsAaicNW6-PDkBA2zOdJBHXkCYBHvYow&s" },
        { id: 5, title: "Pay Per View / SEO-1X", count: 3, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPaHNspOw6rRhwFWh-92ab8Bq9vqqGgo9IaA&s" },
        { id: 6, title: "Reviews", count: 1, img: "https://www.tradifyhq.com/hubfs/Imported_Blog_Media/5-star-reviews-tradies-2.png" },
      ];
    return (
        <div className="bg-gray-100 py-10">
        <h1 className="text-3xl font-bold text-center mb-6">Find Your Jobs Easily</h1>
        <p className="text-center text-gray-600 mb-10">
          Select a category and find jobs easily in your expert category
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-10">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="relative bg-white rounded-lg shadow-md overflow-hidden group transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              {/* Front Content */}
              <div className="p-4 flex flex-col items-center group-hover:opacity-0 group-hover:absolute transition-opacity duration-300">
                <img src={job.img} alt={job.title} className="w-20 h-20 mb-4" />
                <h2 className="text-lg font-medium text-gray-800">{job.title}</h2>
                <span className="mt-2 text-gray-500">{job.count} Jobs</span>
              </div>
              {/* Back Content */}
              <div className="absolute inset-0 p-4 bg-[#ddbd9d] text-black flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-lg font-medium">{job.title}</h2>
                <p className="mt-2 text-center">
                  Discover jobs in <br /> {job.title} and grow your expertise.
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="px-6 py-3 bg-[#ddbd9d] text-black font-medium rounded-lg hover:bg-red-600 transition">
            View All
          </button>
        </div>
      </div>
    );
};

export default Section6;