import Subscription from "../model/Subscription.model.js";

export const AddSubscription = async (req, res) => {
  try {
    const { plan, title, description, price } = req.body;

    if (!plan) {
      return res
        .status(400)
        .json({ message: " يرجى تحديد الخطة والمستخدم لاضافة الاشتراك." });
    }

    const subscription = new Subscription({
      plan,
      user: req.user._id, // Assuming req.user is populated by authentication middleware
      title,
      description,
      price,
    });

    await subscription.save();
    if (!subscription) {
      return res
        .status(400)
        .json({ message: "خطأ في إضافة الاشتراك. الرجاء المحاولة لاحقاً." });
    }
    return res
      .status(201)
      .json({ message: "لقد تم اضافة الاشتراك بنجاح.", subscription });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const GetAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate("user", "name email") // Assuming you want to populate user details
      .sort({ createdAt: -1 });

    if (subscriptions.length === 0) {
      return res.status(200).json({ message: "لا توجد اشتراكات." });
    }

    return res.status(200).json(subscriptions);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "خطأ في السيرفر. الرجاء المحاولة لاحقاً." });
  }
};
