/*
 */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
});

userSchema.method.encryptPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

userSchema.method.comparePassword = (password) =>
  bcrypt.compareSync(password, this.password);

module.exports = mongoose.model("users", userSchema);
