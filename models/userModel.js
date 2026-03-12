const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

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
  password: {
    type: String,
    required: [true, "The password is required !!!!"],
    minlength: 8,
    select: false,
    // validate: [validator.isStrongPassword, "your pass is too weak !!!"],
  },
  confirm_password: {
    type: String,
    required: [true, "The confirm password is required !!!!"],
    minlength: 8,
    validate: {
      validator: function (confirmPass) {
        return confirmPass === this.password;
      },
      message: " pass and cPass does not match !!!!",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "test1", "test2"],
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  pass_updated_at: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
    this.confirm_password = undefined;
  }
  return next;
});

userSchema.methods.checkPass = async function (pass, hPass) {
  return await bcryptjs.compare(pass, hPass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
