import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const taskData = [
  { name: "Jan", tasks: 20 },
  { name: "Feb", tasks: 25 },
  { name: "Mar", tasks: 30 },
  { name: "Apr", tasks: 40 },
  { name: "May", tasks: 35 },
];

const coinData = [
  { name: "Jan", coins: 200 },
  { name: "Feb", coins: 250 },
  { name: "Mar", coins: 300 },
  { name: "Apr", coins: 400 },
  { name: "May", coins: 350 },
];

const statusData = [
  { name: "Accepted", count: 120 },
  { name: "Rejected", count: 30 },
];

export default function WorkerStatsPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center lg:p-8 p-4 bg-gradient-to-tr from-white via-blue-50 to-white min-h-screen">
      <motion.h1
        className="lg:text-5xl text-3xl font-extrabold text-gray-800 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Worker Performance Overview
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* Tasks Chart */}
        <motion.div
          className="p-6 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 shadow-xl hover:shadow-2xl transition-all"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-purple-900">
            Tasks Submitted Per Month
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={taskData}>
              <XAxis dataKey="name" stroke="#9333ea" />
              <YAxis stroke="#9333ea" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="tasks"
                stroke="#7e22ce"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Coins Chart */}
        <motion.div
          className="p-6 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-xl hover:shadow-2xl transition-all"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">
            Coins Earned Per Month
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={coinData}>
              <XAxis dataKey="name" stroke="#d97706" />
              <YAxis stroke="#d97706" />
              <Tooltip />
              <Bar dataKey="coins" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Status Chart */}
        <motion.div
          className="p-6 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 shadow-xl hover:shadow-2xl transition-all col-span-1 md:col-span-2"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-green-800">
            Task Acceptance & Rejection
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={statusData}>
              <XAxis dataKey="name" stroke="#059669" />
              <YAxis stroke="#059669" />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
