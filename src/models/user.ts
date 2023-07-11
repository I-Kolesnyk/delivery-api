import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleMongooseError } from "../helpers";
import { emailRegex } from "../constants";

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegex,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 8,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

export const registerSchema = Joi.object({
    name: Joi.string().trim().min(2).required(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(8).required()    
  });

export const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(8).required(),
  });


  userSchema.post(/save/, handleMongooseError);

  export const User = model("user", userSchema);