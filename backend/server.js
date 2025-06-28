import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./lib/connectDb.js";
dotenv.config();

import userRoute from "./Router/user.route.js";
import postRoute from "./Router/post.route.js";
import reviewRoute from "./Router/review.route.js";
import subscriptionRoute from "./Router/subscription.route.js";
import paymentStripeRoute from "./Router/PaymentStripe.route.js";
import musdarRoute from "./Router/musdarai.route.js";
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public/uploads"));

app.use("/public/uploads", express.static("public/uploads"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const allowedOrigins = ["http://localhost:5173", "https://frolicking-beignet-912530.netlify.app"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(cookieParser());
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/review", reviewRoute);
app.use("/api/subscription", subscriptionRoute);
app.use("/api/payment-stripe", paymentStripeRoute);
app.use("/api/musdarai", musdarRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port : " + PORT);
});
