import React from "react";
import useTask from "./Buyer/useTask";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import Swal from "sweetalert2";

const ManageTask = () => {
  const axiosSecure = useAxiosSecure();
  const [task, refetch] = useTask();

  const handleDeletetask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/task/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Task has been removed successfully.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h1 className="lg:text-2xl font-bold mb-6 text-indigo-700">
        Manage Tasks <span className="text-gray-500">({task.length})</span>
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold"></th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Photo</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Task Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Owner</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Required Workers</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Payable Amount</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {task.map((taskk, index) => (
              <tr
                key={taskk._id}
                className={`hover:bg-indigo-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                 <td className="px-4 py-3">
                 {index+1}
                </td>
                <td className="px-4 py-3">
                  <img
                    src={taskk.taskImage}
                    alt={taskk.taskName}
                    className="w-14 h-14 rounded-lg object-cover border"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {taskk.taskName}
                </td>
                <td className="px-4 py-3 text-gray-600">{taskk.taskowner}</td>
                <td className="px-4 py-3 text-center text-gray-800 font-semibold">
                  {taskk.requiredWorkers}
                </td>
                <td className="px-4 py-3 text-center text-green-600 font-bold">
                  {taskk.payableAmount} Coins
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDeletetask(taskk._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm transition text-sm"
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
