import mongoose, { model, Schema, Model, Document, now } from "mongoose";
import { contentSchema, IContent } from "./content";

export interface IbestCkristian extends Document {
  title: string;
  description: IContent;
  seoDescription: string;
  path: string;
  time: string;
  createdAt: Date;
}

// Create Schema
const bestCkristianSchema: Schema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: contentSchema,
  seoDescription: {
    type: String,
    require: true,
  },
  path: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

bestCkristianSchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export const bestCkristian: Model<IbestCkristian> = model(
  "bestCkristian",
  bestCkristianSchema
) as any;
