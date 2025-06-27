import User from "../model/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  const { name, lastname, familyname, email, password, policy } = req.body;

  try {
    if (!name || !lastname || !familyname || !email || !password) {
      res.status(400).json({ message: "كل الحقول مطلوبة" });
    }
    const exitEmail = await User.findOne({ email: email });

    if (exitEmail) {
      return res
        .status(400)
        .json({ message: "البريد الالكتروني مستخدم من قبل" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "كلمة المرور يجب ان تكون اكثر من 6 حروف" });
    }

    const slath = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, slath);

    const user = new User({
      name,
      lastname,
      familyname,
      email,
      password: hashPassword,
      policy,
    });

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    });

    return res.status(201).json({ message: "لقد تم التسجيل بنجاح" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ messag: "كل الحقول مطلوبة" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "لم يتم العثور على المستخدم" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "كلمة المرور غير صحيحة" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    });

    return res.status(201).json({ message: "لقد تم تسجيل الدخول بنجاح" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(201).json({ message: "لقد تم تسجيل الخروج بنجاح" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};

export const userInfo = async (req, res) => {
  try {
    return res.json(req.user);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const alloweFields = [
      "name",
      "lastname",
      "familyname",
      "email",
      "avatar",
      "statusProfile",
      "releationship",
      "about",
    ];
    const file = req.file || null;

    const updateFields = {};

    for (const field of alloweFields) {
      if (req.body[field]) {
        updateFields[field] = req.body[field];
      }
    }

    if (file) {
      const baseUrl =
        process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
      const pathUrl = `${baseUrl}/public/uploads/`;
      updateFields.avatar = `${pathUrl}${file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.user._id, updateFields, {
      new: true,
    });
    console.log(user);
    res.status(201).json({ message: "لقد تم تحديث الملف الشخصي بنجاح", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};

export const deleteMyAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;

    if (id !== userId) {
      return res.status(400).json({ message: " لا يمكنك حذف هذا المستخدم" });
    }

    await User.findByIdAndDelete(id);
    res.status(201).json({ message: "لقد تم حذف الملف الشخصي بنجاح" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(201).json({ message: "لقد تم حذف المستخدم بنجاح" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.user.id);
    const slath = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, slath);
    user.password = hashpassword;
    await user.save();
    res.status(201).json({ message: "لقد تم تغيير كلمة المرور بنجاح" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};
