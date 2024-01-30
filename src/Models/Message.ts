import mongoose, { model, Schema, Model, Document } from "mongoose";

export interface IMessage extends Document {
  path: string;
  user: any;
  message: string;
  createdAt: Date;
  canal: any;
}

// Create Schema
export const MessageSchema: Schema = new Schema({
  path: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
  canal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

MessageSchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  //   delete obj._id;

  return obj;
});

export const Message: Model<IMessage> = model("Message", MessageSchema) as any;
