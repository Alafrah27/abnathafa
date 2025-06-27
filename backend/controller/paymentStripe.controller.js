import Stripe from "../lib/Stripe.js";
import PaymentStripe from "../model/PaymentStripe.model.js";
import Subscription from "../model/Subscription.model.js";
import User from "../model/User.model.js";
import dotenv from "dotenv";
dotenv.config();

export const addPaymentStripe = async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    const userId = req.user._id;

    const subscriptionData = await Subscription.findById(subscriptionId);
    const user = await User.findById(userId);

    console.log("User ID:", userId);
    console.log("Subscription ID:", subscriptionId);

    if (!subscriptionData || !user) {
      return res
        .status(404)
        .json({ message: "الاشتراك أو المستخدم غير موجود" });
    }

    // Ensure price is a valid number
    const subscriptionPrice = parseFloat(subscriptionData.price);
    if (isNaN(subscriptionPrice) || subscriptionPrice <= 0) {
      return res.status(400).json({
        message: "سعر الاشتراك غير صالح",
      });
    }

    const unitAmountInCents = Math.round(subscriptionPrice * 100);

    const line_items = [
      {
        price_data: {
          currency: "sar",
          product_data: {
            name: `اشتراك ${subscriptionData.plan}`,
          },
          unit_amount: unitAmountInCents, // Fixed: use subscriptionPrice instead of NewPaymentStripe.pric
        },
        quantity: 1,
      },
    ];

    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.SUCESS_CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`, // Fixed: proper URL format
      cancel_url: `${process.env.FAILD_CLIENT_URL}/cancel`, // Fixed: proper URL format
      metadata: {
        userId: user._id.toString(),
        subscriptionId: subscriptionData._id.toString(),
        amount: unitAmountInCents.toString(),
      },
    });
    console.log({ session_url: session.url });

    return res.status(200).json({ id: session.id, unitAmountInCents });
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    return res.status(500).json({
      message: "حصلت مشكلة في السيرفر اثناء الدفع",
    });
  }
};

export const CreatePaymentStripe = async (req, res) => {
  const { sessionId } = req.body;
  try {
    const session = await Stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const userId = session.metadata.userId;
      const subscriptionId = session.metadata.subscriptionId;
      const amount = parseInt(session.metadata.amount); // Get amount from metadata

      const payment = new PaymentStripe({
        userId,
        subscripeId: subscriptionId,
        amount: amount / 100, // This should now have a valid value
        status: "completed",
        paymentId: session.payment_intent,
      });

      await payment.save();
      return res.status(200).json({ message: "لقد تم الدفع بنجاح" });
    } else {
      return res.status(400).json({ message: "الدفع لم يكتمل بعد" });
    }
  } catch (error) {
    console.error("Payment creation error:", error);
    return res
      .status(500)
      .json({ message: "حصلت مشكلة في السيرفر اثناء الدفع" });
  }
};

export const getPaymentStripe = async (req, res) => {
  try {
    const userId = req.user._id;
    const payments = await PaymentStripe.find({ userId })
      .populate("subscripeId", "plan price")
      .populate("userId", "name lastname familyname email avatar")
      .sort({ createdAt: -1 });

    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: "لا توجد مدفوعات للمستخدم" });
    }

    return res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "حصلت مشكلة في السيرفر اثناء استرجاع المدفوعات" });
  }
};

export const getAllPaymentStripe = async (req, res) => {
  try {
    const payments = await PaymentStripe.find()
      .populate("subscripeId", "plan price")
      .populate("userId", "name lastname email avatar familyname")
      .sort({ createdAt: -1 });

    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: "لا توجد مدفوعات" });
    }

    return res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "حصلت مشكلة في السيرفر اثناء استرجاع المدفوعات" });
  }
};

export const getPaymentStripeById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await PaymentStripe.findById(id)
      .populate("subscripeId", "plan price")
      .populate("userId", "name lastname email avatar familyname");

    console.log(payment);
    if (!payment) {
      return res.status(404).json({ message: "لا توجد مدفوعات" });
    }

    return res.status(200).json(payment); // Add this line
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "حصلت مشكلة في السيرفر اثناء استرجاع المدفوعات" });
  }
};
