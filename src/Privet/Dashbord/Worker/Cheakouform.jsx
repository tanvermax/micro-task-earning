import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import  { useState } from "react";

const Cheakouform = () => {
  const stripe = useStripe();
  const [error, setError] = useState('');
  const element = useElements();
  const handlesubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !element) {
        console.log("go away");
      return;
    }
    const card = element.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });
    
      if (error) {
        setError(error.message);
      } else {
        setError(null); // Clear error on success
        console.log(paymentMethod);
        // You can send paymentMethod to your server to create a payment intent or confirm a payment.
      }
  };
  return (
    <form onSubmit={handlesubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      
       <p className="text-red-700">{error}</p>
      
       <button className="btn btn-sm btn-primary" type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default Cheakouform;
