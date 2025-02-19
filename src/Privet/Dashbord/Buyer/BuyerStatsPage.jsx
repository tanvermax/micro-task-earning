import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer } from "recharts";

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

export default function BuyerStatsPage() {
  return (
    <div className="flex flex-col items-center justify-center  text-center lg:p-6">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Buyer Task Overview
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-2">Tasks Added Per Month</h2>
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
          <h2 className="text-xl font-semibold mb-2 text-white">Tasks Completed By Workers</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={completedTaskData}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="tasks" fill="#EAB308" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
