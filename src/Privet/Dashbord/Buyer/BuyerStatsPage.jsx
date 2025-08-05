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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const addedTaskData = [
  { name: "Jan", tasks: 15 },
  { name: "Feb", tasks: 20 },
  { name: "Mar", tasks: 25 },
  { name: "Apr", tasks: 30 },
  { name: "May", tasks: 28 },
];

const completedTaskData = [
  { name: "Jan", tasks: 10 },
  { name: "Feb", tasks: 18 },
  { name: "Mar", tasks: 22 },
  { name: "Apr", tasks: 27 },
  { name: "May", tasks: 25 },
];

const taskDistribution = [
  { name: "Pending", value: 12 },
  { name: "In Progress", value: 8 },
  { name: "Completed", value: 30 },
];

const COLORS = ["#F59E0B", "#3B82F6", "#10B981"];

export default function BuyerStatsPage() {
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
        Welcome to your task analytics dashboard. Track tasks added, completed by workers, and their current status.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-2">📈 Tasks Added Per Month</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={addedTaskData}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Line type="monotone" dataKey="tasks" stroke="#4F46E5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-2">✅ Tasks Completed By Workers</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={completedTaskData}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="tasks" fill="#EAB308" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-2">📌 Task Status Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={taskDistribution}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {taskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-10 text-sm text-gray-400">
        <p>
          Need help understanding your stats or managing tasks? Head to the <strong>Support</strong> section or update settings in your <strong>Account</strong> page.
        </p>
      </div>
    </div>
  );
}