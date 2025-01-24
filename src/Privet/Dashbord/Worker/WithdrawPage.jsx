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

  // Fetch user data (coins)
 const [userData,refetch]= userMange();
//  console.log(userData);
 

  const totalCoins = userData.coins ;
  const withdrawableAmount = Math.floor(totalCoins / 20); // 20 coins = 1 dollar

  const handleCoinChange = (e) => {
    const coins = parseInt(e.target.value);
    if (coins <= totalCoins && coins % 20 === 0) {
      setCoinsToWithdraw(coins);
      setWithdrawAmount(coins / 20); // 20 coins = 1 dollar
    } else {
      setWithdrawAmount(0);
    }
  };

  const handleWithdraw = async (coinsToWithdraw,paymentSystem,accountNumber) => {
    if (coinsToWithdraw >= 200) {
      try {
        const withdrawalData = {
            worker_email: userData.email,
            worker_name: userData.userName,
            withdrawal_coin: coinsToWithdraw,
            withdrawal_amount: withdrawAmount,
            payment_system: paymentSystem,
            status :'pending',
            account_number: accountNumber,
          };
          console.log(withdrawalData);
          
        axiosSecure.post('/withdrawals',withdrawalData)
        .then(res=>{
            console.log(res.data);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Successfulyy added!",
                    text: 'lease try again later',
                  });
            }
            
        })
      } catch (error) {

        console.error("Error making withdrawal", error);
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: error.message,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Insufficient Coins",
        text: "You must have at least 200 coins to withdraw.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Withdraw Your Earnings</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <p className="text-lg text-gray-700"><strong>Total Coins:</strong> {totalCoins}</p>
        <p className="text-lg text-gray-700"><strong>Withdrawal Amount:</strong> ${withdrawableAmount}</p>
      </div>

      <form className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="text-lg text-gray-700">Coins to Withdraw:</label>
          <input
            type="number"
            className="p-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={coinsToWithdraw}
            onChange={handleCoinChange}
            max={totalCoins}
            min="200"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg text-gray-700">Withdrawal Amount ($):</label>
          <input
            type="number"
            className="p-3 text-lg rounded-md border border-gray-300 bg-gray-100 cursor-not-allowed"
            value={withdrawAmount}
            readOnly
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg text-gray-700">Select Payment System:</label>
          <select
            className="p-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={paymentSystem}
            onChange={(e) => setPaymentSystem(e.target.value)}
          >
            <option value="">Select Payment System</option>
            <option value="Bkash">Bkash</option>
            <option value="Rocket">Rocket</option>
            <option value="Nagad">Nagad</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg text-gray-700">Account Number:</label>
          <input
            type="text"
            className="p-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>

        <div className="flex justify-center mt-4">
          {coinsToWithdraw >= 200 ? (
            <button
              type="button"
              className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none"
              onClick={()=>handleWithdraw(coinsToWithdraw,paymentSystem,accountNumber)}
            >
              Withdraw
            </button>
          ) : (
            <p className="text-red-600 text-lg font-semibold">Insufficient coin for withdrawal</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default WithdrawPage;
