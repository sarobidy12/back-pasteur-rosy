import { model, Schema, Model, Document } from "mongoose";
import {} from "./content";

export interface IWordOfDay extends Document {
  verse: string;
  content: string;
}

// Create Schema

const wordOfDaySchema: Schema = new Schema({
  verse: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
});

wordOfDaySchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export const WordOfDay: Model<IWordOfDay> = model(
  "WordOfDay",
  wordOfDaySchema
) as any;
