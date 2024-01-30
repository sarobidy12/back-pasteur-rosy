import mongoose, { model, Schema, Model, Document } from "mongoose";

export interface IPodcast extends Document {
  title: string;
  seoDescription: string;
  urlUpload: string;
  category: any;
  urlImg: string;
  listnning: number;
  createdAt: Date;
}

// Create Schema

const PodcastSchema: Schema = new Schema({
  title: {
    type: String,
    require: true,
  },
  seoDescription: {
    type: String,
    require: true,
  },
  urlUpload: {
    type: String,
    require: true,
  },
  urlImg: {
    type: String,
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  listnning: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

PodcastSchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export const podcast: Model<IPodcast> = model("podcast", PodcastSchema) as any;
