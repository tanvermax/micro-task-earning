import React from "react";
import useTask from "./Buyer/useTask";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import Swal from "sweetalert2";

const ManageTask = () => {
  const axiosSecure = useAxiosSecure();
  const [task, refetch] = useTask(); //
  const handleDeletetask = (id) => {
    // console.log(id);
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
                console.log(res.data);
                
                if (res.data.deletedCount > 0) {
                  
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
      <h1 className="text-2xl font-bold mb-4">Total Task ({task.length})</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Task Name</th>
              <th className="border border-gray-300 px-4 py-2">Owner</th>
              <th className="border border-gray-300 px-4 py-2">
                Required Workers
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Payable Amount
              </th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {task.map((taskk) => (
              <tr key={taskk._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {taskk.taskName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {taskk.taskowner}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {taskk.requiredWorkers}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {taskk.payableAmount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDeletetask(taskk._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
  );
};

export default ManageTask;
