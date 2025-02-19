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
      <div className="overflow-scroll">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="lg:text-sm text-[8px]">Name</th>
              <th className="lg:text-sm text-[8px]">email</th>
              <th className="lg:text-sm text-[8px]"> job</th>
              <th className="lg:text-sm text-[8px]">Role</th>
              <th className="lg:text-sm text-[8px]">Edit</th>
            </tr>
          </thead>
          
          <tbody>
            {/* row 1 */}
            {users.map((item, index) => (
              <tr key={item._id}>
                <th className="lg:text-base text-[8px]">{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle lg:h-12 h-5 lg:w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold lg:text-sm text-[8px]">{item.userName}</div>
                      <div className="lg:text-sm text-[8px] opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td className="lg:text-sm text-[8px]">{item.email}</td>
                <td className="lg:text-sm text-[8px]">{item.role}</td>
                <th className="lg:text-sm text-[8px]">
                  <select
                    onChange={(e) => handleRoleChange(item, e.target.value)}
                    className="select select-bordered lg:w-full lg:max-w-xs "
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
                    className="btn p-1 bg-red-500 lg:text-sm text-[8px]"
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
