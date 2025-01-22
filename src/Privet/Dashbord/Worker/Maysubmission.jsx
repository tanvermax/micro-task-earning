import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import userMange from "../userMange";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Provider/useAuth";
import { useLoaderData } from "react-router-dom";
import "./mysubmis.css";

const Maysubmission = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userData] = userMange();
  const { count } = useLoaderData();
  const [itemperPage, setItemPerPage] = useState(8);
  console.log(count);
  // const itemperPage = 8;
  const numberofPage = Math.ceil(count / itemperPage);

  const [currentPage, setCurrentPage] = useState(0);
  // Fetch worker submissions
  const { data: submissions = [],refetch } = useQuery({
    queryKey: ["workerSubmissions", user.email, currentPage, itemperPage],
    queryFn: async () => {
      const response = await axiosSecure.get(`/submitted?page=${currentPage}&size=${itemperPage}`);
      return response.data.filter((sub) => sub.worker_email === user.email);
    },
    keepPreviousData:true
  });

  // const page= [];
  // for (let i = 0; i < numberofPage; i++) {
  //   page.push(i);

  // }
  useEffect(() => {
    refetch();
  }, [currentPage, itemperPage, refetch]);

  const page = [...Array(numberofPage).keys()];
  console.log(page);
  const handleitemperpage = (e) => {
    const val = parseInt(e.target.value);
    console.log(val);

    setItemPerPage(val);
    setCurrentPage(0);
    
    
  };
  const handlprev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      refetch();
    }
  };
  const handlenext = () => {
    if (currentPage < page.length) {
      setCurrentPage(currentPage + 1);
      refetch();

    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        My Submissions
      </h1>
      {submissions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Task Title</th>
                <th className="py-3 px-4 text-left">Payable Amount</th>
                <th className="py-3 px-4 text-left">Submission Details</th>
                <th className="py-3 px-4 text-left">Worker Name</th>
                <th className="py-3 px-4 text-left">Buyer Email</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Submission Date</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub.id} className="border-t border-gray-200">
                  <td className="py-3 px-4">{sub.task_title}</td>
                  <td className="py-3 px-4">${sub.payable_amount}</td>
                  <td className="py-3 px-4">{sub.submission_details}</td>
                  <td className="py-3 px-4">{sub.worker_name}</td>
                  <td className="py-3 px-4">{sub.Buyer_email}</td>
                  <td
                    className={`py-3 px-4 font-semibold text-white rounded-lg ${
                      sub.status.toLowerCase() === "completed"
                        ? "bg-green-500"
                        : sub.status.toLowerCase() === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {sub.status}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(sub.current_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <p>current page{currentPage}</p> */}
          <div className="pagination py-10 items-center flex justify-center gap-5">
            <button onClick={handlprev} className="btn">
              prev
            </button>
            {page.map((pag) => (
              <button
                onClick={() => setCurrentPage(pag)}
                className={currentPage === pag && "selected"}
                key={pag}
              >
                {pag}
              </button>
            ))}
            <select
              name=""
              id=""
              value={itemperPage}
              onChange={handleitemperpage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <button onClick={handlenext} className="btn">
              next
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No submissions found.</p>
      )}
    </div>
  );
};

export default Maysubmission;
