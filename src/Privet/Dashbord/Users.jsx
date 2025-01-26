import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUser, FaUsers } from "react-icons/fa";
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
  // console.log(users);
  

  const handleRoleChange = (item, role) => {
    Swal.fire({
      title: `Are you want to make ${item.userName} to ${role}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${item._id}`, { role }).then((res) => {
          // console.log(res.data);
          if (res.data.success > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${item.userName} is ${role} Now`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });

    //
  };
  const handledelete = (item) => {
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
        axiosSecure.delete(`/users/${item._id}`).then((res) => {
          // console.log(res.data);

          // console.log(item._id);

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
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>email</th>
              <th> job</th>
              <th>Role</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.userName}</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <th>
                  <select
                    onChange={(e) => handleRoleChange(item, e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                    defaultValue={item.role}
                  >
                    <option value="admin">Admin</option>
                    <option value="worker">Worker</option>
                    <option value="buyer">Buyer</option>
                  </select>
                </th>
                <th>
                  <button
                    onClick={() => handledelete(item)}
                    className="btn  bg-red-500 "
                  >
                    Delete user
                  </button>
                </th>
              </tr>
            ))}
            {/* row 2 */}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
};

export default Users;
