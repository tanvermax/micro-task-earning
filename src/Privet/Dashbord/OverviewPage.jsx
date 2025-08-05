import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const taskTrendData = [
  { name: "Jan", value: 200 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 700 },
  { name: "May", value: 600 },
];

const revenueData = [
  { name: "Jan", value: 100 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 400 },
  { name: "Apr", value: 700 },
  { name: "May", value: 500 },
];

const usersData = [
  { name: "Jan", users: 150 },
  { name: "Feb", users: 200 },
  { name: "Mar", users: 300 },
  { name: "Apr", users: 450 },
  { name: "May", users: 600 },
];

const conversionData = [
  { name: "Jan", conversion: 2.5 },
  { name: "Feb", conversion: 3.1 },
  { name: "Mar", conversion: 3.8 },
  { name: "Apr", conversion: 4.0 },
  { name: "May", conversion: 4.3 },
];

const metrics = [
  { label: "Total Sales", value: "$24,500" },
  { label: "Active Users", value: "8,200" },
  { label: "Revenue Growth", value: "12.5%" },
  { label: "Conversion Rate", value: "4.3%" },
];

export default function OverviewPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 lg:p-6">
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Business Overview Dashboard
      </motion.h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 w-full max-w-6xl">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white shadow-lg rounded-xl p-4 text-left border">
            <p className="text-sm text-gray-500">{metric.label}</p>
            <p className="text-xl font-semibold text-gray-800">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <h2 className="text-xl font-semibold mb-2 text-left">Task Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={taskTrendData}>
              <XAxis dataKey="name" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <h2 className="text-xl font-semibold mb-2 text-left">Revenue Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData}>
              <XAxis dataKey="name" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip />
              <Bar dataKey="value" fill="#EAB308" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <h2 className="text-xl font-semibold mb-2 text-left">User Growth</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={usersData}>
              <XAxis dataKey="name" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip />
              <Area type="monotone" dataKey="users" stroke="#10B981" fill="#D1FAE5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <h2 className="text-xl font-semibold mb-2 text-left">Conversion Rate (%)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={conversionData}>
              <XAxis dataKey="name" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip />
              <Line type="monotone" dataKey="conversion" stroke="#F97316" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
