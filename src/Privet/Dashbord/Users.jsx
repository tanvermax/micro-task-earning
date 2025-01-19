import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Axios/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUser, FaUsers } from "react-icons/fa";

const Users = () => {
  //   const [data, setData] = useState([]);
  //   useEffect(() => {
  //     fetch("http://localhost:5000/users")
  //       .then((result) => result.json())
  //       .then((data) => setData(data));
  //   }, []);

  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleadmin = (item) => {
    axiosSecure.patch(`/users/admin/${item._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${users.userName} is Admin Now`,
          showConfirmButton: false,
          timer: 1500,
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
                  {item.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleadmin(item)}
                      className="btn  bg-orange-500 "
                    >
                      Make user Admin
                    </button>
                  )}
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
