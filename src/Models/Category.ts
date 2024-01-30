import { model, Schema, Model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  seoDescription: string;
  textIcon: string;
  favorite: boolean;
}

// Create Schema

const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  seoDescription: {
    type: String,
    require: true,
  },
  textIcon: {
    type: String,
    require: true,
  },
  favorite: {
    type: Boolean,
    require: true,
    default: false,
  },
});

CategorySchema.method("transform", function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export const category: Model<ICategory> = model(
  "Category",
  CategorySchema
) as any;
