import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer
} from "recharts";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import useProfile from "../../../Provider/userProfile";
import { useQuery } from "@tanstack/react-query";

const COLORS = ["#F59E0B", "#3B82F6", "#10B981"];

export default function BuyerStatsPage() {
  const axiosSecure = useAxiosSecure();
  const { userData } = useProfile();
  const email = userData?.email;

  // Fetch added tasks per month
  const { data: addedTasks } = useQuery({
    queryKey: ["addedTasks", email],
    enabled: !!email,
    queryFn: async () =>
      axiosSecure.get(`/buyer/tasks-added/${email}`).then(res => res.data)
  });

  // Fetch completed tasks per month
  const { data: completedTasks } = useQuery({
    queryKey: ["completedTasks", email],
    enabled: !!email,
    queryFn: async () =>
      axiosSecure.get(`/buyer/tasks-completed/${email}`).then(res => res.data)
  });

  // Fetch task distribution
  const { data: statusDist } = useQuery({
    queryKey: ["taskStatus", email],
    enabled: !!email,
    queryFn: async () =>
      axiosSecure.get(`/buyer/task-status/${email}`)
    .then(res => res.data)
    .catch( res =>console.log(res.data))
  });

  if (!addedTasks || !completedTasks || !statusDist) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center lg:p-6 px-4 py-8">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        📊 Buyer Task Dashboard
      </motion.h1>

      <p className="text-gray-500 max-w-xl mb-8">
        View your task statistics including added tasks, completed tasks, and current task distribution.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">

        {/* Tasks Added */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-2">📈 Tasks Added Per Month</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={addedTasks}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Line dataKey="tasks" stroke="#4F46E5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tasks Completed */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-2">✅ Tasks Completed</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={completedTasks}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="tasks" fill="#EAB308" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Task Distribution */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-2">📌 Task Status Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusDist}
                cx="50%"
                cy="50%"
                outerRadius={60}
                dataKey="value"
                label
              >
                {statusDist.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="mt-10 text-sm text-gray-400">
        Need help? Visit <strong>Support</strong> or manage your settings in <strong>Account</strong>.
      </div>
    </div>
  );
}
