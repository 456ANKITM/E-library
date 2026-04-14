import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
     return res.json({ success: false, message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      isAdmin,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.json({ success: true, message: "User Created Succesfully" });
  } catch (error) {
    res.json({ success: false, message: "Server Error" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Password did not matched" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    
    const { password: _, ...userData } = user._doc;

    res.cookie("token", token,{
      httpOnly:true,
      secure: true,
      sameSite: "none"
    })
      .json({ success: true, message: "Login Successfull", user: userData });
  } catch (error) {
    res.json({ success: false, message: "Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).select("-password")
    if(!user){
      return res.json({success:false, message:"User not found"})
    }
    res.json({success:true, user})
  } catch (error) {
    res.json({success:false, message:"Server error"})
  }
}


