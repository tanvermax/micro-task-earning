import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";
import WorkerCard from "./Card/WorkerCard";

const Section2 = () => {
  const axiosSecure = useAxiosSecure();

  const { data: wokerdata = [] } = useQuery({
    queryKey: ["wokerdata"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/role", {
        params: { role: "worker" },
      });
      return res.data;
    },
  });

  return (
    <section className="py-10">
      <h1 className="text-2xl lg:text-3xl font-bold   text-center mb-10">
        Our Best Workers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-20">
        {wokerdata.map((worker) => (
          <WorkerCard
          userId={worker._id}
            key={worker._id}
            photo={worker.photo}
            userName={worker.userName}
            role={worker.role}
            coins={worker.coins}
            bio={worker.bio}
          />
        ))}
      </div>
    </section>
  );
};

export default Section2;
