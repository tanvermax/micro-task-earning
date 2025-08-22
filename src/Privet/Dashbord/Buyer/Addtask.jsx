import { useForm } from "react-hook-form";
import useAuth from "../../../Provider/useAuth";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useaxiospublic from "../../../Axios/useaxiospublic";
import { URL } from "../../../constans";
import "./task.css"; // Assuming you have a CSS file for styling

const image_hostin_key = import.meta.env.VITE_IMAGEBB;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hostin_key}`;

const Addtask = () => {
  const { user } = useAuth();
  const axiosPublic = useaxiospublic();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [question, setQuestion] = useState("like: i need  task idea for social media engagement");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (user?.email) {
      axiosSecure(`/users?email=${user.email}`).then((res) => {
        setUserData(res.data);
      });
    }
  }, [user?.email]);

  const { register, handleSubmit, formState: { errors } } = useForm();

  // --- SUBMIT TASK ---
  const onSubmit = async (data) => {
    const imageFile = { image: data.task_image_url[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "Content-Type": "multipart/form-data" },
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
            axiosSecure.patch(`/users/coins/${userData._id}`, {
              email: user.email, coins: updatedCoins,
            }).then((updateRes) => {
              if (updateRes.data.success) {
                setUserData((prev) => ({ ...prev, coins: updatedCoins }));
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Task added successfully!",
                  text: "Your coins have been deducted.",
                  showConfirmButton: false,
                  timer: 2000,
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

  // --- GEMINI AI ---
  const payload = {
    contents: [
      {
        parts:
          [{
            text: `i am buyer of this website , i have give task to woker , 
            now how i say ${question} to the best way to my worker in this website ,
             please give me a task title idea with budget and details
              just like this example: "Watch a YouTube video and comment on it.
               Budget: $5 , woker need 20 pepole. Details: Watch the video and
                leave a meaningful comment.just seggest 3 best organized ideasof title, budget and details , don't
                 add any very unnecessary text  and dont repeat your self"`,
          }]
      }]
  };

  const askquestion = async () => {
    setAnswer(""); // clear previous answer

    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    response = await response.json();

    const text = response.candidates[0].content.parts[0]?.text || "No answer found";

    // Show it word by word
    let i = 0;
    const words = text.split(" ");
    const interval = setInterval(() => {
      setAnswer((prev) => prev + " " + words[i]);
      i++;
      if (i >= words.length) clearInterval(interval);
    }, 100); // 100ms per word (adjust speed)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-12 px-6 flex gap-10 justify-center">
      {/* Left Side - Task Form */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-[55%]">
        <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">✨ Create a New Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Task Title</label>
            <input
              type="text"
              {...register("task_title", { required: "Task title is required" })}
              placeholder="e.g., Watch video and comment"
              className="input input-bordered w-full rounded-xl shadow-sm"
            />
            {errors.task_title && <p className="text-red-500 text-sm">{errors.task_title.message}</p>}
          </div>

          {/* Task Details */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Task Detail</label>
            <textarea
              {...register("task_detail", { required: "Task detail is required" })}
              rows="3"
              placeholder="Provide a detailed task description"
              className="textarea textarea-bordered w-full rounded-xl shadow-sm"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Task Category</label>
            <input
              type="text"
              {...register("task_category", { required: "Task Category is required" })}
              placeholder="e.g., YouTube, Facebook"
              className="input input-bordered w-full rounded-xl shadow-sm"
            />
          </div>

          {/* Workers + Payment */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Required Workers</label>
              <input type="number" {...register("required_workers", { required: true, min: 1 })}
                className="input input-bordered w-full rounded-xl shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Payable Amount</label>
              <input type="number" {...register("payable_amount", { required: true, min: 1 })}
                className="input input-bordered w-full rounded-xl shadow-sm" />
            </div>
          </div>

          {/* Completion Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Completion Date</label>
            <input type="date" {...register("completion_date", { required: true })}
              className="input input-bordered w-full rounded-xl shadow-sm" />
          </div>

          {/* Submission Info */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Submission Info</label>
            <input type="text" {...register("submission_info", { required: true })}
              placeholder="e.g., Screenshot or proof"
              className="input input-bordered w-full rounded-xl shadow-sm" />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Task Image</label>
            <input type="file" {...register("task_image_url", { required: true })}
              className="file-input file-input-bordered w-full rounded-xl shadow-sm" />
          </div>

          <button type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition">
            🚀 Submit Task
          </button>
        </form>
      </div>

      {/* Right Side - Gemini AI Assistant */}
      <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 text-white rounded-3xl shadow-2xl p-6 w-[35%] flex flex-col">
        <h2 className="text-2xl font-bold mb-4">🤖 Task AI Assistant</h2>
        <p className="text-sm text-indigo-100 mb-4">Ask task ai to refine your task idea, suggest better details, or check budget validity.</p>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 px-3 py-2 rounded-xl text-black"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            onClick={askquestion}
            className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-xl hover:bg-indigo-200 transition">
          ✨  Ask
          </button>
        </div>

        <div className="bg-white/20 p-4 rounded-xl flex-1 max-h-[61vh] overflow-y-auto text-wrap">
          <p className="whitespace-pre-wrap text-left typing">
            {answer || "✨ Task AI response will appear here"}
          </p>
        </div>


        {/* AI Autofill Button */}
        <button
          onClick={() => setQuestion("Generate a sample YouTube engagement task with budget and details")}
          className="mt-4 bg-pink-400 hover:bg-pink-500 py-2 rounded-xl font-semibold transition">
          🎯 Generate Sample Task
        </button>
      </div>
    </div>
  );
};

export default Addtask;
