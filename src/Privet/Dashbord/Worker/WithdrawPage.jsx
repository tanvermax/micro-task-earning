import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import useAuth from "../../../Provider/useAuth";
import Swal from "sweetalert2";
import userMange from "../userMange";

const WithdrawPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [coinsToWithdraw, setCoinsToWithdraw] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [userData, refetch] = userMange();

  const totalCoins = userData.coins;
  const withdrawableAmount = Math.floor(totalCoins / 20); // 20 coins = 1 USD

  const handleCoinChange = (e) => {
    const coins = parseInt(e.target.value);
    if (coins <= totalCoins && coins % 20 === 0) {
      setCoinsToWithdraw(coins);
      setWithdrawAmount(coins / 20);
    } else {
      setWithdrawAmount(0);
    }
  };

  const handleWithdraw = async () => {
    if (coinsToWithdraw >= 200) {
      try {
        const withdrawalData = {
          worker_email: userData.email,
          worker_name: userData.userName,
          withdrawal_coin: coinsToWithdraw,
          withdrawal_amount: withdrawAmount,
          payment_system: paymentSystem,
          account_number: accountNumber,
          status: "pending",
        };

        const res = await axiosSecure.post("/withdrawals", withdrawalData);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Withdrawal Request Submitted!",
            text: "Please wait for approval.",
          });
          setCoinsToWithdraw(0);
          setWithdrawAmount(0);
          setAccountNumber("");
          setPaymentSystem("");
          refetch();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Withdrawal Failed!",
          text: error.message,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Minimum 200 coins required",
        text: "Please enter at least 200 coins (in multiples of 20).",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Withdraw Your Earnings
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200">
        <p className="text-lg font-medium text-gray-700 mb-1">
          💰 Total Coins: <span className="font-bold">{totalCoins}</span>
        </p>
        <p className="text-lg font-medium text-gray-700">
          💵 Equivalent USD:{" "}
          <span className="text-green-600 font-bold">
            ${withdrawableAmount}
          </span>
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-1">
            Coins to Withdraw:
          </label>
          <input
            type="number"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            placeholder="Enter coins (min 200, multiples of 20)"
            value={coinsToWithdraw}
            onChange={handleCoinChange}
            min={200}
            max={totalCoins}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Withdrawal Amount (USD):
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-200 bg-gray-100 rounded-lg cursor-not-allowed"
            value={withdrawAmount}
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Select Payment System:
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            value={paymentSystem}
            onChange={(e) => setPaymentSystem(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Bkash">Bkash</option>
            <option value="Rocket">Rocket</option>
            <option value="Nagad">Nagad</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Account Number:
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your payment account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={handleWithdraw}
            disabled={coinsToWithdraw < 200}
            className={`w-full px-6 py-3 text-white font-semibold rounded-lg transition-all duration-200 ${
              coinsToWithdraw >= 200
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Withdraw
          </button>
        </div>
      </form>
    </div>
  );
};

export default WithdrawPage;
