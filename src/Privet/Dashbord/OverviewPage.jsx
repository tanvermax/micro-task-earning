import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 200 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 700 },
  { name: "May", value: 600 },
];
const data2 = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 400 },
    { name: "Apr", value: 700 },
    { name: "May", value: 500 },
  ];

export default function OverviewPage() {
  return (
    <div className="flex flex-col items-center justify-center   text-center lg:p-6">
      <motion.h1
        className="text-4xl text-[#b1804e]  font-bold lg:mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Overview Statistics
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className=" p-6 rounded-lg shadow-lg border">
          <h2 className="text-xl text-[#b1804e] font-semibold mb-2">Task Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#b1804e" />
              <YAxis stroke="#b1804e" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className=" p-6 rounded-lg shadow-lg border">
          <h2 className="text-xl font-semibold mb-2 text-[#b1804e] ">Revenue Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data2}>
              <XAxis dataKey="name" stroke="#b1804e" />
              <YAxis stroke="#b1804e" />
              <Tooltip />
              <Bar dataKey="value" fill="#EAB308" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-6"
      >
        
      </motion.div>
    </div>
  );
}
