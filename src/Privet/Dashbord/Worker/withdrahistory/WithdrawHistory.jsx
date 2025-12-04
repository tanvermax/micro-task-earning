import React from 'react';
import { motion } from 'framer-motion';

export default function WorkerWithdrawRequestCard({ data }) {
  const formatDate = (date) => {
    const d = new Date(date);
    const today = new Date();
    const isToday = d.toDateString() === today.toDateString();
    const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return isToday ? `Today at ${time}` : d.toLocaleString();
  };
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto p-5 rounded-2xl shadow-xl bg-white border border-gray-100"
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Withdraw Request</h2>
        <span className={`px-3 py-1 rounded-xl text-sm font-medium ${statusColors[data.status]}`}>{data.status}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
        <p><span className="font-medium">Name:</span> {data.worker_name}</p>
        <p><span className="font-medium">Email:</span> {data.worker_email}</p>
        <p><span className="font-medium">Coin:</span> {data.withdrawal_coin}</p>
        <p><span className="font-medium">Amount:</span> ${data.withdrawal_amount}</p>
        <p><span className="font-medium">Method:</span> {data.payment_system}</p>
        <p><span className="font-medium">Account:</span> {data.account_number}</p>
      </div>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mt-4 text-right text-xs text-gray-500"
      >
        {formatDate(data.created_at)}
      </motion.div>
    </motion.div>
  );
}
