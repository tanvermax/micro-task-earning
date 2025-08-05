import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Provider/useAuth";

const Users = () => {
  const { deleteUser1 } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = (item, role) => {
    Swal.fire({
      title: `Make ${item.userName} a ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${item._id}`, { role }).then((res) => {
          if (res.data.success > 0) {
            refetch();
            Swal.fire({
              icon: "success",
              title: `${item.userName} is now ${role}`,
              timer: 1500,
              showConfirmButton: false,
              position: "top-end",
            });
          }
        });
      }
    });
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User has been removed.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User Management</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Change Role</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={item.photo}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border-2 border-gradient-to-r from-indigo-500 to-blue-500"
                  />
                  <div>
                    <p className="font-semibold">{item.userName}</p>
                    <p className="text-xs text-gray-500">United States</p>
                  </div>
                </td>
                <td className="px-4 py-3">{item.email}</td>
                <td className="px-4 py-3 capitalize">{item.role}</td>
                <td className="px-4 py-3">
                  <select
                    onChange={(e) => handleRoleChange(item, e.target.value)}
                    defaultValue={item.role}
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="admin">Admin</option>
                    <option value="worker">Worker</option>
                    <option value="buyer">Buyer</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(item)}
                    className="px-3 py-1 rounded text-white text-sm bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
