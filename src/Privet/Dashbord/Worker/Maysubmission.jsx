import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
// import userMange from "../userMange";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Provider/useAuth";
import { useLoaderData } from "react-router-dom";
import "./mysubmis.css";

const Maysubmission = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const [userData] = userMange();
  const { count } = useLoaderData();
  const [itemperPage, setItemPerPage] = useState(10);
  // console.log(count);
  // const itemperPage = 8;
  const numberofPage = Math.ceil(count / itemperPage);

  const [currentPage, setCurrentPage] = useState(0);
  // Fetch worker submissions


  const { data:  result = [] , refetch } = useQuery({
    queryKey: ["workerSubmissions", user.email, currentPage, itemperPage],
    queryFn: async () => {
      const response = await axiosSecure.get(`/submitted?page=${currentPage}&size=${itemperPage}&userEmail=${user.email}`);
      // console.log(response.data);  // Ensure the response is correctly structured
      return response.data;
    },
    keepPreviousData: true
  });
  
// console.log(result);



  useEffect(() => {
    refetch();
  }, [currentPage, itemperPage, refetch]);

  const page = [...Array(numberofPage).keys()];
  // console.log(page);
  const handleitemperpage = (e) => {
    const val = parseInt(e.target.value);
    // console.log(val);

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
    <div className="lg:max-w-7xl mx-auto lg:p-6 p-1 overflow-scroll">
      <h1 className="lg:text-3xl text-[12px]  font-semibold text-gray-800 mb-6 text-center">
        My Submissions
      </h1>
      {result.length > 0 ? (
        <div className="overflow-scroll">
          <table className="min-w-full  shadow-md rounded-lg">
            <thead className="bg-blue-600 ">
              <tr>
                <th className="py-3 lg:px-4 px-1 text-left lg:text-base text-[8px] ">Task Title</th>
                <th className="py-3 lg:px-4 px-1 text-left  lg:text-base text-[8px]">Payable Amount</th>
                <th className="py-3 lg:px-4 px-1 text-left lg:text-base text-[8px]">Submission Details</th>
                <th className="py-3 lg:px-4 px-1 text-left lg:text-base text-[8px]">Worker Name</th>
                <th className="py-3 lg:px-4 px-1 text-left lg:text-base text-[8px]">Buyer Email</th>
                <th className="py-3 lg:px-4 px-1 text-left lg:text-base text-[8px]">Status</th>
                <th className="py-3 lg:px-4 px-1 text-left lg:text-base text-[8px]">Submission Date</th>
              </tr>
            </thead>
            <tbody>
              {result.map((sub) => (
                <tr key={sub._id} className="border-t border-gray-200">
                  <td className="py-3 lg:px-4 px-1 lg:text-base text-[8px]">{sub.task_title}</td>
                  <td className="py-3 lg:px-4 px-1 lg:text-base text-[8px]">${sub.payable_amount}</td>
                  <td className="py-3 lg:px-4 px-1 lg:text-base text-[8px]">{sub.submission_details}</td>
                  <td className="py-3 lg:px-4 px-1 lg:text-base text-[8px]">{sub.worker_name}</td>
                  <td className="py-3 lg:px-4 px-1 lg:text-base text-[8px]">{sub.Buyer_email}</td>
                  <td
                    className={`py-3 lg:px-4 px-1 lg:text-base text-[8px] font-semibold  rounded-lg ${
                      sub.status.toLowerCase() === "approve"
                        ? "bg-green-500"
                        : sub.status.toLowerCase() === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {sub.status}
                  </td>
                  <td className="py-3 lg:px-4 px-1 lg:text-base text-[8px]">
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
