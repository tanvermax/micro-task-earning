import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer } from "recharts";

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
    <div className="flex flex-col items-center justify-center  text-center lg:p-6">
      <motion.h1
        className="lg:text-4xl font-bold lg:mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Worker Performance Overview
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className=" p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Tasks Submitted Per Month</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={taskData}>
              <XAxis dataKey="name" stroke="orange" />
              <YAxis stroke="orange" />
              <Tooltip />
              <Line type="monotone" dataKey="tasks" stroke="#4F46E5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className=" p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Coins Earned Per Month</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={coinData}>
              <XAxis dataKey="name" stroke="orange" />
              <YAxis stroke="orange" />
              <Tooltip />
              <Bar dataKey="coins" fill="#EAB308" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className=" p-6 rounded-lg shadow-lg col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Task Acceptance & Rejection</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={statusData}>
              <XAxis dataKey="name" stroke="orange" />
              <YAxis stroke="orange" />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
