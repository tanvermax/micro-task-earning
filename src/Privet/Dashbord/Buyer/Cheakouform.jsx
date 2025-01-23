import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import useAuth from "../../../Provider/useAuth";
// import userMange from "../userMange";

const Cheakouform = ({ coinAmount }) => {
  const stripe = useStripe();
  const element = useElements();
  const { user } = useAuth();
  // const [userData] = userMange(); // User information
  const axiosSecure = useAxiosSecure(); // Secure Axios instance
  const [error, setError] = useState("");
  const [transictionid, setTransictionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [price, setPrice] = useState(5);

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
  }, [axiosSecure,price]);

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
      }
      setError("");
    }
  };

  return (
    <>
      <div className="mb-4">
        <h3>Select Payment Amount:</h3>
        <div className="flex space-x-4">
          {[1, 10, 20, 40].map((value) => (
            <button
              key={value}
              onClick={() => setPrice(value)}
              className={`px-4 py-2 border rounded ${
                price === value ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              ${value}
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
          className="btn btn-sm btn-primary"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          pay${price}
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
