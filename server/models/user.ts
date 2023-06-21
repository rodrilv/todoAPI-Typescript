import mongoose from "mongoose";
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
});

userSchema.plugin(uniqueValidator, {
  message: "El ID debe ser único",
});

export const User = mongoose.model("user", userSchema);
