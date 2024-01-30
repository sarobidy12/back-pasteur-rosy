import mongoose, { model, Schema, Model, Document } from "mongoose";

export interface IAlbum extends Document {
  name: string;
  favorite: boolean;
}

// Create Schema

const AlbumSchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  favorite: {
    type: Boolean,
    default: false,
    require: true,
  },
});

AlbumSchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export const Album: Model<IAlbum> = model("Album", AlbumSchema) as any;
