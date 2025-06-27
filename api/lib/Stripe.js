import stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const Stripe = new stripe(process.env.STRIPE_API_KEY);

export default Stripe;
