import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../Axios/useAxiosSecure";

const AdminHome = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: stats = {}, isLoading } = useQuery({
//     queryKey: ["adminStats"],
//     queryFn: async () => {
//       const response = await axiosSecure.get("/admin/stats");
//       return response.data;
//     },
//   });

//   if (isLoading) {
//     return <span className="loading loading-infinity loading-lg"></span>;
//   }

//   const { totalWorkers, totalBuyers, totalCoins, totalPayments } = stats;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Workers */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Total Workers</h2>
          <p className="text-2xl font-bold text-blue-600"></p>
        </div>

        {/* Total Buyers */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Total Buyers</h2>
          <p className="text-2xl font-bold text-green-600"></p>
        </div>

        {/* Total Coins */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Total Coins</h2>
          <p className="text-2xl font-bold text-yellow-600"></p>
        </div>

        {/* Total Payments */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Total Payments</h2>
          <p className="text-2xl font-bold text-red-600"></p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
