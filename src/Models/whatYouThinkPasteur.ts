import mongoose, { model, Schema, Model, Document } from "mongoose";
import { contentSchema, IContent } from "./content";

export interface IWhatYouThinkPastor extends Document {
  date: Date;
  name: string;
  email: string;
  resumeQuestion: string;
  message: string;
  answer: IContent[];
  linkVideo: String;
  answered: boolean;
  category: string;
}

// Create Schema

const WhatYouThinkPastorSchema: Schema = new Schema({
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
  name: {
    type: String,
    require: true,
  },
  resumeQuestion: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  answer: contentSchema,
  linkVideo: {
    type: String,
  },
  answered: {
    type: Boolean,
    default: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

WhatYouThinkPastorSchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export const whatYouThinkPastor: Model<IWhatYouThinkPastor> = model(
  "WhatYouThinkPastor",
  WhatYouThinkPastorSchema
) as any;
