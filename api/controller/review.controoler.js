import Review from "../model/Review.model.js";

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: "رقم التقييم والتعليق مطلوب." });
    }

    const review = new Review({
      user: req.user._id,
      rating,
      comment,
    });

    await review.save();

    return res
      .status(201)
      .json({ message: "لقد تم اضافة التقييم بنجاح.", review });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    if (reviews.length === 0) {
      return res.status(200).json({ message: "No reviews found." });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
