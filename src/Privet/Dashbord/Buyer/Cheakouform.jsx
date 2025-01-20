import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Axios/useAxiosSecure";
import userMange from "../userMange";

const Cheakouform = ({ coinAmount, price }) => {
  const stripe = useStripe();
  const element = useElements();
  const [userData] = userMange(); // User information
  const axiosSecure = useAxiosSecure(); // Secure Axios instance
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Create a payment intent when the component loads
    axiosSecure.post("/create-payment-intent", { amount: price * 100 }) // Convert dollars to cents
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.error("Error creating payment intent:", err));
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !element || !clientSecret) {
      console.log("Stripe or elements not loaded.");
      return;
    }

    const card = element.getElement(CardElement);
    if (!card) {
      console.error("Card Element not found.");
      return;
    }

    setProcessing(true);

    // Confirm payment with Stripe
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: userData?.email || "anonymous@example.com",
        },
      },
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else if (paymentIntent?.status === "succeeded") {
      setError(null);
      setSuccess(true);

      // Save payment history and update coins
      axiosSecure.post("/payments", {
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount / 100, // Convert back to dollars
        userId: userData?.id,
        coinAmount,
      })
        .then(() => {
          console.log("Payment info saved and coins updated.");
        })
        .catch((err) => console.error("Error saving payment:", err))
        .finally(() => setProcessing(false));
    }
  };

  return (
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
        disabled={!stripe || processing}
      >
        {processing ? "Processing..." : `Pay $${price}`}
      </button>
    </form>
  );
};

export default Cheakouform;
