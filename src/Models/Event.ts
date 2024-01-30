import { model, Schema, Model, Document } from "mongoose";
import { contentSchema, IContent } from "./content";

export interface IEvent extends Document {
  title: string;
  shortDescription: string;
  seoDescription: string;
  description: IContent[];
  date: Date;
  path: string;
  place: string;
  live: string;
}

// Create Schema

const EventSchema: Schema = new Schema({
  title: {
    type: String,
    require: true,
  },
  shortDescription: {
    type: String,
    require: true,
  },
  seoDescription: {
    type: String,
    require: true,
  },
  description: contentSchema,
  date: {
    type: Date,
    require: true,
  },
  path: {
    type: String,
    require: true,
  },
  place: {
    type: String,
    require: true,
  },
  live: {
    type: String,
    require: true,
  },
});

EventSchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export const event: Model<IEvent> = model("Event", EventSchema) as any;
