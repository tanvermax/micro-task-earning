import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
// import useTask from "./useTask";
import userTask from "./userTask";

const Mytask = () => {
  const axiosSecure = useAxiosSecure();

  // const { data: task = [], refetch } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get("/task");
  //     return res.data;
  //   },
  // });
  // const [task]= useTask();
  const [task] = userTask();
  //   console.log(task);
  const [sortedata, setSortedData] = useState([]);

  useEffect(() => {
    if (task.length > 0) {
      const sorted = [...task].sort(
        (a, b) => new Date(b.taskDate) - new Date(a.taskDate)
      );
      setSortedData(sorted);
    }
  }, [task]);
  console.log(task);
  
  const handledeletetask = (id) => {
    console.log(id);
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
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
          
        }
      });
  };
  return (
    <div>
      <h1>my task : {task.length}</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Required Workers</th>
                <th>Payable Amount</th>
                <th>compliton date</th>
                <th>Edit</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {sortedata.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.taskName}</td>
                  <td>{item.requiredWorkers}</td>
                  <td>{item.payableAmount}</td>
                  <td>{item.taskDate}</td>
                  <td><Link  to={`/dashbord/taskupdate/${item._id}`} >Update</Link></td>
                  <td>
                    <button onClick={() => handledeletetask(item._id)}>
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
