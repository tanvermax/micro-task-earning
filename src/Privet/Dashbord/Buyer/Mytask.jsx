import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
// import useTask from "./useTask";
import userTask from "./userTask";
import userMange from "../userMange";

const Mytask = () => {
  const axiosSecure = useAxiosSecure();
  const [userData] = userMange();

  const [task, refetch] = userTask();

  //   console.log(task);
  const [sortedata, setSortedData] = useState([]);

  const addbalecoin = useEffect(() => {
    if (task.length > 0) {
      const sorted = [...task].sort(
        (a, b) => new Date(b.taskDate) - new Date(a.taskDate)
      );
      setSortedData(sorted);
    }
  }, [task]);
  // console.log(task);

  const handledeletetask = (id) => {
    // console.log(id);
    const taskTodelete = task.find((t) => t._id === id);
    const CoinToadd =
      taskTodelete?.payableAmount * taskTodelete?.requiredWorkers || 0;
      // console.log(taskTodelete);
      // console.log(CoinToadd);
      
      
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/task/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {

            
            const updatedCoins = userData.coins + CoinToadd;
            // console.log("updateted coin : ",updatedCoins);
             
            axiosSecure
              .patch(`/users/coins/${userData._id}`, { email: userData.email, coins: updatedCoins}
            )
              .then((updateRes) => {
                // console.log(updateRes.data);
                
                if (updateRes.data.success) {
                  // Update userData state with the new coins value
                

                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Task added successfully!",
                    text: "Your coins have been deducted.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  refetch();
                  // window.location.reload(false);
                }
              });
          }
        });
      }
    });
  };
  return (
    <div>
      <h1>my task : {task.length}</h1>
      <div>
        <div className="lg:px-2 overflow-x-auto max-w-[230px] md:max-w-full">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th className="lg:text-sm text-[8px]">Name</th>
                <th className="lg:text-sm text-[8px]">Required Workers</th>
                <th className="lg:text-sm text-[8px]">Payable Amount</th>
                <th className="lg:text-sm text-[8px]">compliton date</th>
                <th className="lg:text-sm text-[8px]">Edit</th>
                <th className="lg:text-sm text-[8px]">Edit</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {sortedata.map((item, index) => (
                <tr key={item._id}>
                  <th  className="lg:text-sm text-[8px]">{index + 1}</th>
                  <td className="lg:text-sm text-[8px]">{item.taskName}</td>
                  <td className="lg:text-sm text-[8px]">{item.requiredWorkers}</td>
                  <td className="lg:text-sm text-[8px]">{item.payableAmount}</td>
                  <td className="lg:text-sm text-[8px]">{item.taskDate}</td>
                  <td className="lg:text-sm text-[8px]">
                    <Link
                      className="btn lg:text-sm text-[8px]"
                      to={`/dashbord/taskupdate/${item._id}`}
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn lg:text-sm text-[8px]"
                      onClick={() => handledeletetask(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Mytask;
