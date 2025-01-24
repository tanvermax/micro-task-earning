import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import useAuth from "../../../Provider/useAuth";
import userMange from "../userMange";
import { data } from "react-router-dom";
import Swal from "sweetalert2";

const Cheakouform = () => {
  const stripe = useStripe();
  const element = useElements();
  const { user } = useAuth();
  const [userData,refetch] = userMange(); // User information
  const axiosSecure = useAxiosSecure(); // Secure Axios instance
  const [error, setError] = useState("");
  const [transictionid, setTransictionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [price, setPrice] = useState(1);
  const [coinAmount, setCoinAmount] = useState(10);
  // console.log(userData);

  const priceToCoinMap = {
    1: 10,
    10: 150,
    20: 500,
    35: 1000,
  };
  useEffect(() => {
    // Create a payment intent when the component loads
    if (price) {
      axiosSecure
        .post("/createpaymentintent", { price: parseInt(price) }) // Convert dollars to cents
        .then((res) => {
          console.log(res.data.clientSecret);

          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => console.error("Error creating payment intent:", err));
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !element) {
      console.log("go away");
      return;
    }
    const card = element.getElement(CardElement);
    if (!card) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    const { error: confirmerror, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || "anonymous",
            name: user.displayName || "janina",
          },
        },
      });
    if (confirmerror) {
      console.log("confirmerror", error);
      setError(error.message);
    } else {
      console.log("paymentMethod", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transiction id", paymentIntent.id);
        setTransictionId(paymentIntent.id);

        const coinToadd = priceToCoinMap[price] || 0;
        const updatecoins = (userData.coins || 0) + coinToadd;
        // setUserData({ ...userData, coins: updatecoins });

        axiosSecure
        .patch("/users", {
            email: user.email,
            coins: updatecoins,
          })
          .then((res) => {
            console.log(res.data.message);
            const postData={
              
                transitsection_id: paymentIntent.id,
                transittuserName : user.displayName,
                trasnsituseEmail : user.email,
                trasitTIme : new Date() ,
                coinbuyed : coinToadd,
                moneyforcoin : price,
              
            }
            axiosSecure.post('/transit',postData)
            .then(res=>{
              console.log("transit Data posted successfully:", res.data);
              if (res.data.acknowledged) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your Transiction has been success",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            })
            .catch((err) => {
              console.error("Error posting data:", err.response?.data || err.message);
            });            
            alert("success");
          });
      }
      setError("");
    }
  };

  return (
    <>
      <div className="mb-4">
        <h3>Select Payment Amount:</h3>
        <div className="grid grid-cols-2 gap-5 p-5">
          {[1, 10, 20, 35].map((value) => (
            <button
              key={value}
              onClick={() => {
                setPrice(value);
                setCoinAmount(priceToCoinMap[value]);
              }}
              className={`px-4 py-5  border rounded  ${
                price === value ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              ${value} = {priceToCoinMap[value]} coins
            </button>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
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

        {error && <p className="text-red-700">{error}</p>}
        {success && <p className="text-green-700">Payment successful!</p>}

        <button
          className="btn btn-xl text-xl my-10 btn-primary"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          pay {price}$
        </button>
        {transictionid && (
          <p className="text-green-500">
            your transiction id : {transictionid}
          </p>
        )}
      </form>
    </>
  );
};

export default Cheakouform;
