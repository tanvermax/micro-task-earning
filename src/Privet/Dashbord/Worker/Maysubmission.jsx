import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Provider/useAuth";
import { useLoaderData } from "react-router-dom";
import "./mysubmis.css";

const Maysubmission = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { count } = useLoaderData();

  const [itemperPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const numberofPage = Math.ceil(count / itemperPage);
  const pages = [...Array(numberofPage).keys()];

  const { data: result = [], refetch } = useQuery({
    queryKey: ["workerSubmissions", user.email, currentPage, itemperPage],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/submitted?page=${currentPage}&size=${itemperPage}&userEmail=${user.email}`
      );
      return response.data;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    refetch();
  }, [currentPage, itemperPage, refetch]);

  const handleItemPerPageChange = (e) => {
    setItemPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < numberofPage - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="lg:max-w-7xl mx-auto lg:p-6 p-2">
      <h1 className="lg:text-3xl text-xl font-semibold text-gray-800 mb-6 text-center">
        My Submissions
      </h1>

      {result.length > 0 ? (
        <div className="overflow-auto rounded-lg shadow-lg bg-gradient-to-br from-white via-slate-50 to-gray-100 p-4">
          <table className="min-w-full border-collapse">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm">Task Title</th>
                <th className="py-3 px-4 text-left text-sm">Payable Amount</th>
                <th className="py-3 px-4 text-left text-sm">Submission Details</th>
                <th className="py-3 px-4 text-left text-sm">Worker Name</th>
                <th className="py-3 px-4 text-left text-sm">Buyer Email</th>
                <th className="py-3 px-4 text-left text-sm">Status</th>
                <th className="py-3 px-4 text-left text-sm">Submission Date</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {result.map((sub) => (
                <tr
                  key={sub._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{sub.task_title}</td>
                  <td className="py-3 px-4">${sub.payable_amount}</td>
                  <td className="py-3 px-4">{sub.submission_details}</td>
                  <td className="py-3 px-4">{sub.worker_name}</td>
                  <td className="py-3 px-4">{sub.Buyer_email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-white px-2 py-1 rounded-md text-xs font-semibold ${
                        sub.status.toLowerCase() === "approve"
                          ? "bg-green-500"
                          : sub.status.toLowerCase() === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(sub.current_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex flex-col lg:flex-row items-center justify-between mt-6 gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
              >
                Prev
              </button>
              {pages.map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === p
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {p + 1}
                </button>
              ))}
              <button
                onClick={handleNext}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
              >
                Next
              </button>
            </div>

            {/* Items per page */}
            <div className="flex items-center gap-2">
              <label htmlFor="perPage" className="text-sm text-gray-600">
                Rows per page:
              </label>
              <select
                id="perPage"
                value={itemperPage}
                onChange={handleItemPerPageChange}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No submissions found.</p>
      )}
    </div>
  );
};

export default Maysubmission;
