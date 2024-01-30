import mongoose, { model, Schema, Model, Document } from "mongoose";
import { IUser } from "./User";

export interface IChat extends Document {
  name: string;
  listAccess: IUser[] | [];
  description: string;
}

// Create Schema

const ChatSchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  listAccess: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

ChatSchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export const chat: Model<IChat> = model("Chat", ChatSchema) as any;
