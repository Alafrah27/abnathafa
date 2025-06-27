import SocialMediaPost from "../model/post.model.js";
import User from "../model/User.model.js";

export const createPost = async (req, res) => {
  try {
    const { title } = req.body;
    const files = req.files || []; // <-- change
    const images = [];
    let post = null;
    const pathUrl = `${req.protocol}://${req.get("host")}/public/uploads/`;

    if (files?.length > 0) {
      for (const file of files) {
        images.push(`${pathUrl}${file.filename}`);
      }
      post = new SocialMediaPost({ title, images, userId: req.user._id });
    } else {
      post = new SocialMediaPost({ title, userId: req.user._id });
    }
    await post.save();
    return res
      .status(201)
      .json({ post, message: "لقد تم انشاء المنشور بنجاح" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await SocialMediaPost.findByIdAndDelete(id);
    res.status(201).json({ message: "لقد تم حذف المنشور بنجاح" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};

export const getAllPosts = async (req, res) => {
  const SearchByName = req.query.name || "";

  // Enhanced validation

  try {
    const query = {};
    if (SearchByName && SearchByName.trim().length < 2) {
      return res.status(400).json({
        message: "يجب أن يكون اسم البحث أكثر من حرفين",
      });
    }

    if (SearchByName && SearchByName.trim()) {
      // Adjust path to your User model

      const matchingUsers = await User.find({
        name: { $regex: SearchByName, $options: "i" },
      }).select("_id");

      const userIds = matchingUsers.map((user) => user._id);

      if (userIds.length === 0) {
        // No users found with that name
        return res.status(200).json([]);
      }

      // Filter posts by matching user IDs
      query.userId = { $in: userIds };
    }

    const posts = await SocialMediaPost.find(query)
      .populate("userId", "name email avatar")
      .populate("comments.user", "name avatar")
      .sort({ createdAt: -1 }) // Most recent first

      .lean();

    // Process posts (same as your existing logic)
    posts.forEach((post) => {
      post.totalLikes = post.likes.length;
      post.totalComments = post.comments.length;
    });

    // Optional: Additional sorting
    posts.sort((a, b) => {
      const aTotal = a.totalLikes + a.totalComments;
      const bTotal = b.totalLikes + b.totalComments;
      return bTotal - aTotal;
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Posts retrieval error:", error);
    return res.status(500).json({
      message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق",
    });
  }
};

export const AddLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await SocialMediaPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "المنشور غير موجود" });
    }

    const userId = req.user._id;

    if (post.likes.includes(userId)) {
      // If the user already liked the post, remove the like
      post.likes = post.likes.filter(
        (like) => like.toString() !== userId.toString()
      );
    } else {
      // If the user hasn't liked the post, add the like
      post.likes.push(userId);
    }

    await post.save();
    return res.status(200).json({ message: "تم تحديث الإعجاب بنجاح", post });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    console.log("Adding comment to post:", postId);
    console.log("Comment content:", content);

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "محتوى التعليق غير صالح" });
    }

    const post = await SocialMediaPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "المنشور غير موجود" });
    }

    const comment = {
      content,
      user: req.user._id,
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    return res.status(201).json({ message: "تم إضافة التعليق بنجاح", post });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await SocialMediaPost.findById(postId)
      .populate("comments.user", "name avatar")
      .sort({ "comments.createdAt": -1 });

    if (!post) {
      return res.status(404).json({ message: "المنشور غير موجود" });
    }

    if (post.comments.length === 0) {
      return res
        .status(200)
        .json({ message: "لا توجد تعليقات على هذا المنشور" });
    }

    return res.status(200).json(post.comments);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};

export const userpost = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await SocialMediaPost.find({ userId: userId })
      .populate("userId", "name email avatar")
      .populate("comments.user", "name avatar")
      .sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(200).json({ message: "لا توجد منشورات لهذا المستخدم" });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};

export const deleteUserPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await SocialMediaPost.findOneAndDelete({
      _id: postId,
      userId: userId,
    });

    if (!post) {
      return res.status(404).json({ message: "المنشور غير موجود" });
    } else {
      return res.status(200).json({ message: "تم حذف المنشور بنجاح" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};
