import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkerWithdrawRequestCard from "./WithdrawHistory";

export default function WorkerWithdrawList() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = "http://localhost:5001/withdrawals";

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      const sorted = (res.data || []).reverse();
      setWithdrawals(sorted || []);
    } catch (err) {
      setError("Failed to load withdrawals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center p-10">
        <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-gray-600 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center text-red-600 font-medium py-5">
        {error}
        <button
          onClick={fetchWithdrawals}
          className="ml-3 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4 ">
      {withdrawals.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No withdrawal requests found</p>
      ) : (
        withdrawals.map((item) => (
          <WorkerWithdrawRequestCard key={item._id} data={item} />
        ))
      )}
    </div>
  );
}
