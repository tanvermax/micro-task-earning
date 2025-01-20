import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Cheakouform from "./Cheakouform";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GET);

const Purchase = ({ coinAmount, price }) => {
  return (
    <div>
      <h1>Purchase Coins</h1>
      <Elements stripe={stripePromise}>
        <Cheakouform coinAmount={coinAmount} price={price} />
      </Elements>
    </div>
  );
};

export default Purchase;
