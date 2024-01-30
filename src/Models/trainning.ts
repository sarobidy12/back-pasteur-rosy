import mongoose, { model, Schema, Model, Document, now } from "mongoose";

export interface IChildTrainnig extends Document {
  title: string;
  content: string;
}

// Create Schema

const ChildTrainnig: Schema = new Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
});

export interface ITrainning extends Document {
  title: string;
  purpose: string;
  description: string;
  content: IChildTrainnig;
}

// Create Schema

const PictureSchema: Schema = new Schema({
  title: {
    type: String,
    require: true,
  },
  purpose: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  content: [ChildTrainnig],
});

PictureSchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export const Trainning: Model<ITrainning> = model(
  "Trainnig",
  PictureSchema
) as any;
