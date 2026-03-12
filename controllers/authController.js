const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
      role: req.body.role === "admin" ? "user" : req.body.role,
    });
    res.status(201).json({
      message: "User Created !!",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!",
      error: error,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required !!!!",
      });
    }
    const user = await User.findOne({ email }).select("password");
    if (!user || user.checkPass(password, user.password)) {
      res.status(400).json({
        message: "Email or password are incorrect !!!!",
      });
    }
    res.status(200).json({
      message: "Logged In !!!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Fail !!",
      error: error,
    });
  }
};
