
import mongoose from "mongoose";
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: { type: String },
  content: { type: String },
  date: { type: String },
  priority: { type: String },
  status: { type: String },
  user_id: { type: String },
});

todoSchema.plugin(uniqueValidator, {
  message: "El ID debe ser único",
});

export const Todo = mongoose.model("todo", todoSchema);
