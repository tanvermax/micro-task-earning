import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Cheakouform from "./Cheakouform";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GET);

const Purchase = () => {
  return (
    <div>

      <Elements stripe={stripePromise}>
        <Cheakouform></Cheakouform>
      </Elements>
    </div>
  );
};

export default Purchase;
