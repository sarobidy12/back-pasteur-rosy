import { model, Schema, Model, Document } from "mongoose";
import { contentSchema, IContent } from "./content";
export interface ILifeWithJesus extends Document {
  title: string;
  seoDescription: string;
  description: IContent;
  Date: Date;
  path: string;
  linkVideo: string;
}

// Create Schema

const LifeWithJesusSchema: Schema = new Schema({
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
});

LifeWithJesusSchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export const lifeWithJesus: Model<ILifeWithJesus> = model(
  "LifeWithJesus",
  LifeWithJesusSchema
) as any;
