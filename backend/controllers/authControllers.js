import User from "../models/userSchema.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields must be entered...!",
    });
  }

  try {
    const alreadyUser = await User.findOne({ email });

    if (alreadyUser) {
      return res.status(409).json({
        success: false,
        message: "please login..you are already a user..!",
      });
    }

    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();
    const token = generateToken({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });

    res.json({
      success: true,
      message: "User Added successfully...!",
      data: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
      timestamp: true,
      token:token,
    });
  } catch (error) {
    console.error(error, error.message);
    res.status(500).json({
      success: false,
      message: "Server error, Failed to register the user..!",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All the fields are required..",
    });
  }
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials...",
      });
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
    });

    res.json({
      success: true,
      message: "Login success...!",
      token:token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    console.error("Login failed...", error);
    res.json({
        success: false,
        message: "Login Failed..",
        error: error.message,
      });
  }
};
