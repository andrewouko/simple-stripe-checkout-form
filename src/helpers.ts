import store from "./store";
import { increaseTotal, addCartItem } from "./store/cart-slice";
import { Stripe, loadStripe } from "@stripe/stripe-js";

/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default getStripe;

export const addToCart = (price: number, product_id: string) => {
  store.dispatch(increaseTotal(price));
  store.dispatch(addCartItem(product_id));
};
