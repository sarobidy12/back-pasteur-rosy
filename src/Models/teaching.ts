import mongoose, { model, Schema, Model, Document } from "mongoose";
import { contentSchema, IContent } from "./content";

export interface ITeaching extends Document {
  title: string;
  seoDescription: string;
  description: IContent;
  Date: Date;
  path: string;
  linkVideo: string;
  category: any;
  favorite: boolean;
}

// Create Schema

const teachingSchema: Schema = new Schema({
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
  linkVideo: {
    type: String,
    require: false,
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
  favorite: {
    type: Boolean,
    require: true,
  },
});

teachingSchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export const teaching: Model<ITeaching> = model(
  "teaching",
  teachingSchema
) as any;
