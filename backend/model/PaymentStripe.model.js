import mongoose from "mongoose";
const paymentStripeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subscripeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    amount: {
      type: Number,
      required: true, // Amount in cents
      min: 0,
    },
    paymentId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    isSpecial: {
      type: Boolean,
      default: false, // Indicates if the payment is for a special subscription
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const PaymentStripe = mongoose.model("PaymentStripe", paymentStripeSchema);
export default PaymentStripe;
