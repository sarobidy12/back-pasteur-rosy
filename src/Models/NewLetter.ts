import { model, Schema, Model, Document } from "mongoose";

export interface INewLetter extends Document {
  lastName: string;
  email: string;
}

// Create Schema
export const newLetterSchema: Schema = new Schema({
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
});

newLetterSchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  //   delete obj._id;

  return obj;
});

export const NewLetter: Model<INewLetter> = model(
  "NewLetter",
  newLetterSchema
) as any;
