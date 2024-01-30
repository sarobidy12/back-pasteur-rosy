import mongoose, { model, Schema, Model, Document } from "mongoose";
import { contentSchema, IContent } from "./content";

export interface IDiscover extends Document {
  title: string;
  seoDescription: string;
  description: IContent;
  Date: Date;
  path: string;
  category: any;
}

// Create Schema

const discoverSchema: Schema = new Schema({
  title: {
    type: String,
    require: true,
  },
  seoDescription: {
    type: String,
    require: true,
  },
  description: contentSchema,
  Date: {
    type: String,
    require: true,
    default: Date.now,
  },
  path: {
    type: String,
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

discoverSchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export const discover: Model<IDiscover> = model(
  "discover",
  discoverSchema
) as any;
