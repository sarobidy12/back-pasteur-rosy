import mongoose, { model, Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
  img: string;
  gender: string;
  block: boolean;
}

// Create Schema

const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
    default: "USER",
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
  block: {
    type: Boolean,
    require: true,
    default: false,
  },
});

UserSchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export const User: Model<IUser> = model("User", UserSchema) as any;
