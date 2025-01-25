import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { FaBitcoin } from "react-icons/fa";

const Section2 = () => {
  const axiosSecure = useAxiosSecure();

  const { data: wokerdata = [], refetch } = useQuery({
    queryKey: ["wokerdata"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/role", {
        params: { role: "worker" },
      });
      return res.data;
    },
  });
  // console.log(wokerdata);
  

  return (
    <div>
      {/* <h1>The Best Worker{wokerdata.length}</h1> */}
      <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-10 ">
        {wokerdata.map((item) => (
          <div key={item._id} className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
            <div className="rounded-t-lg h-32 overflow-hidden">
              <img
                className="object-cover object-top w-full"
                src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                alt="Mountain"
              />
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
              <img
                className="object-cover object-center h-20 lg:w-32 w-20 mx-auto lg:h-32"
                src={item.photo}
                alt="Woman looking front"
              />
            </div>
            <div className="text-center mt-2">
              <h2 className="font-semibold">{item.userName}</h2>
              <p className="text-gray-500">Web <span className="font-bold">{item.role}</span></p>
            </div>
            <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
              
              <li className="flex flex-col items-center justify-between">
               <h1>Total Coin</h1>
              </li>
              <li className="flex flex-col items-center justify-around">
              <FaBitcoin className="text-yellow-500 text-2xl"/>
                
                <div>{item.coins}</div>
              </li>
            </ul>
            <div className="p-4 border-t mx-8 mt-2">
              <button className="lg:w-1/2 text-xs  lg:text-xl block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white lg:px-6 p-2">
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Section2;
