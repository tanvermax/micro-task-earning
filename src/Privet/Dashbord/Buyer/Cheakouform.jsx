import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import useAuth from "../../../Provider/useAuth";
import userMange from "../userMange";
import Swal from "sweetalert2";

const Cheakouform = () => {
  const stripe = useStripe();
  const element = useElements();
  const { user } = useAuth();
  const [userData, refetch] = userMange();
  const axiosSecure = useAxiosSecure();

  const [error, setError] = useState("");
  const [transictionid, setTransictionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [price, setPrice] = useState(1);

  const priceToCoinMap = {
    1: 10,
    10: 150,
    20: 500,
    35: 1000,
  };

  useEffect(() => {
    if (price) {
      axiosSecure
        .post("/createpaymentintent", { price: parseInt(price) })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => console.error("Error creating payment intent:", err));
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !element) return;

    const card = element.getElement(CardElement);
    if (!card) return;

    const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (cardError) {
      setError(cardError.message);
      return;
    } else {
      setError("");
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user.email || "anonymous",
          name: user.displayName || "Guest User",
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const coinToAdd = priceToCoinMap[price] || 0;
      const updatedCoins = (userData.coins || 0) + coinToAdd;

      axiosSecure
        .patch("/users", {
          email: user.email,
          coins: updatedCoins,
        })
        .then(() => {
          const postData = {
            transitsection_id: paymentIntent.id,
            transittuserName: user.displayName,
            trasnsituseEmail: user.email,
            trasitTIme: new Date(),
            coinbuyed: coinToAdd,
            moneyforcoin: price,
          };

          axiosSecure.post("/transit", postData).then((res) => {
            if (res.data.acknowledged) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Transaction successful!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        });

      setTransictionId(paymentIntent.id);
      setError("");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-white via-gray-100 to-gray-200 shadow-2xl rounded-2xl p-8 mt-10 border">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Purchase Coins
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Payment Amount:</h3>
        <div className="grid grid-cols-2 gap-4">
          {[1, 10, 20, 35].map((value) => (
            <button
              key={value}
              onClick={() => setPrice(value)}
              className={`w-full py-4 text-lg font-medium rounded-lg border transition duration-200 ${
                price === value
                  ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              ${value} = {priceToCoinMap[value]} coins
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg p-4 shadow-inner mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>

        {error && <p className="text-red-600 mb-2 font-medium">{error}</p>}

        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="w-full py-3 text-xl font-semibold text-white rounded-lg bg-gradient-to-r from-[#bffa35] to-[#3e479c] hover:from-[#9c6c3e] hover:to-[#6db14e] transition duration-200"
        >
          Pay ${price}
        </button>

        {transictionid && (
          <p className="mt-4 text-green-600 font-medium">
            Transaction ID: <span className="break-words">{transictionid}</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Cheakouform;
