import mongoose, { model, Schema, Model, Document, now } from "mongoose";

export interface IPicture extends Document {
  date: Date;
  path: string;
  album: string;
}

// Create Schema

const PictureSchema: Schema = new Schema({
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
  path: {
    type: String,
    require: true,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
    required: true,
  },
});

PictureSchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export const Picture: Model<IPicture> = model("Picture", PictureSchema) as any;
