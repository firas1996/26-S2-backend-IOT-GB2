const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required !!!!"],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "The name is required !!!!"],
    unique: true,
    lowercase: true,
    // uppercase: true,
    validate: [validator.isEmail, "This email is not valid !!!"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
