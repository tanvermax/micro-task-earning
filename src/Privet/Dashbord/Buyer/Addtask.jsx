import { useForm } from "react-hook-form";
import useAuth from "../../../Provider/useAuth";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useaxiospublic from "../../../Axios/useaxiospublic";

const image_hostin_key = import.meta.env.VITE_IMAGEBB;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hostin_key}`;


const Addtask = () => {
  const { user } = useAuth();
  const axiosPublic = useaxiospublic();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user?.email) {
      axiosSecure(`/users?email=${user.email}`).then((res) => {
        setUserData(res.data);
      });
    }
  }, [user?.email]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data.task_image_url[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const totalCost = data.required_workers * data.payable_amount;
      if (userData.coins >= totalCost) {
        const taskitem = {
          taskowner: user.email,
          ownername: user.displayName,
          taskName: data.task_title,
          taskDetails: data.task_detail,
          taskCategory: data.task_category,
          requiredWorkers: parseInt(data.required_workers),
          payableAmount: parseInt(data.payable_amount),
          taskDate: data.completion_date,
          submissinInfo: data.submission_info,
          taskImage: res.data.data.display_url,
        };

        axiosSecure.post("/task", taskitem).then((res) => {
          if (res.data.insertedId) {
            const updatedCoins = userData.coins - totalCost;
            axiosSecure
              .patch(`/users/coins/${userData._id}`, {
                email: user.email,
                coins: updatedCoins,
              })
              .then((updateRes) => {
                if (updateRes.data.success) {
                  setUserData((prevData) => ({
                    ...prevData,
                    coins: updatedCoins,
                  }));
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Task added successfully!",
                    text: "Your coins have been deducted.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Not enough Coins",
          text: "You do not have enough coins. Please top up.",
        });
        navigate("/dashbord/purchase");
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-200 via-white to-indigo-200 p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Create a Task</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Task Title</label>
          <input
            type="text"
            {...register("task_title", { required: "Task title is required" })}
            placeholder="e.g., Watch video and comment"
            className="input input-bordered w-full"
          />
          {errors.task_title && <p className="text-red-500 text-sm">{errors.task_title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Task Detail</label>
          <textarea
            {...register("task_detail", { required: "Task detail is required" })}
            className="textarea textarea-bordered w-full"
            rows="3"
            placeholder="Provide a detailed task description"
          ></textarea>
          {errors.task_detail && <p className="text-red-500 text-sm">{errors.task_detail.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Task Category(flatfrom)</label>
          {/* <select {...register("task_category", { required: true })} className="select select-bordered w-full">
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select> */}
          <input type="text"
           {...register("task_category", { required: "Task Category is required" })}
            placeholder="Category flatfrom(e.g., YouTube, Facebook)"
            className="input input-bordered w-full" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Required Workers</label>
            <input
              type="number"
              {...register("required_workers", { required: true, min: 1 })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Payable Amount</label>
            <input
              type="number"
              {...register("payable_amount", { required: true, min: 1 })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Completion Date</label>
          <input
            type="date"
            {...register("completion_date", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Submission Info</label>
          <input
            type="text"
            {...register("submission_info", { required: true })}
            placeholder="e.g., Screenshot or proof"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Task Image</label>
          <input
            type="file"
            {...register("task_image_url", { required: true })}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg font-semibold"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default Addtask;
