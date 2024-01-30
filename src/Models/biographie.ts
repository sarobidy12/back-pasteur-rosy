import { model, Schema, Model, Document } from "mongoose";
import { contentSchema, IContent } from "./content";

export interface IBiography extends Document {
  content: IContent;
}

// Create Schema

const BiographySchema: Schema = new Schema({
  content: contentSchema,
});

BiographySchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export const biography: Model<IBiography> = model(
  "biography",
  BiographySchema
) as any;
