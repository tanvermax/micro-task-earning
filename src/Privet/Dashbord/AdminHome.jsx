import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import WorkerPaymnet from "./WorkerPaymnet";
import OverviewPage from "./OverviewPage";
import { FaUsers, FaUserTie, FaCoins, FaDollarSign } from "react-icons/fa";

const AdminHome = () => {
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

  const { data: Buyerdata = [] } = useQuery({
    queryKey: ["Buyerdata"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/role", {
        params: { role: "buyer" },
      });
      return res.data;
    },
  });

  const { data: totaldollerearn = [] } = useQuery({
    queryKey: ["totaldollerearn"],
    queryFn: async () => {
      const res = await axiosSecure.get("withdrawals");
      return res.data.filter((item) => item.status === "approve");
    },
  });

  const totalpaymnetcoin = totaldollerearn.reduce(
    (sum, user) => sum + (user.withdrawal_amount || 0),
    0
  );

  const totalWorkerCoins = Buyerdata.reduce(
    (sum, user) => sum + (user.coins || 0),
    0
  );

  const totalBuyerCoins = wokerdata.reduce(
    (sum, user) => sum + (user.coins || 0),
    0
  );

  const totalCoins = totalWorkerCoins + totalBuyerCoins;

  return (
    <div className="container mx-auto p-6 lg:p-10">
      <h1 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">
        Admin Dashboard
      </h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Workers */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md p-6 rounded-xl transition hover:shadow-lg">
          <div className="flex items-center gap-4">
            <FaUsers className="text-3xl text-blue-500" />
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Workers
              </h2>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {wokerdata.length}
              </p>
            </div>
          </div>
        </div>

        {/* Buyers */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md p-6 rounded-xl transition hover:shadow-lg">
          <div className="flex items-center gap-4">
            <FaUserTie className="text-3xl text-green-500" />
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Buyers
              </h2>
              <p className="text-2xl font-bold text-green-600">
                {Buyerdata.length}
              </p>
            </div>
          </div>
        </div>

        {/* Coins */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md p-6 rounded-xl transition hover:shadow-lg">
          <div className="flex items-center gap-4">
            <FaCoins className="text-3xl text-yellow-500" />
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Coins
              </h2>
              <p className="text-2xl font-bold text-yellow-600">
                {totalCoins}
              </p>
            </div>
          </div>
        </div>

        {/* Payments */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md p-6 rounded-xl transition hover:shadow-lg">
          <div className="flex items-center gap-4">
            <FaDollarSign className="text-3xl text-red-500" />
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Payments
              </h2>
              <p className="text-2xl font-bold text-red-600">
                ${totalpaymnetcoin.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="mt-12">
        <WorkerPaymnet />
      </div>
      <div className="mt-10">
        <OverviewPage />
      </div>
    </div>
  );
};

export default AdminHome;
