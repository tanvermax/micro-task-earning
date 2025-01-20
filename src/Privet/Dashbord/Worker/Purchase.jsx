import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import Cheakouform from "./Cheakouform";
import { Elements } from "@stripe/react-stripe-js";

const StripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GET);

const Purchase = () => {
  return (
    <div>
      <h1>purchase Coin</h1>
      <div>
        <Elements stripe={StripePromise}>
          <Cheakouform></Cheakouform>
        </Elements>
      </div>
    </div>
  );
};

export default Purchase;
