import mongoose, { Schema } from "mongoose";

export interface IBlocks {
  id: string;
  type: string;
  data: any;
  tunes: any;
}

export interface IContent {
  time: number;
  version: string;
  blocks: IBlocks[];
}

// Create Schema

export const blockSchema: Schema = new Schema({
  data: {
    type: mongoose.Schema.Types.Mixed,
    require: true,
  },
  tunes: {
    type: mongoose.Schema.Types.Mixed,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  id: {
    type: String,
    required: true,
  },
});

export const contentSchema: Schema = new Schema({
  time: {
    type: Number,
    require: true,
  },
  version: {
    type: String,
    required: true,
  },
  blocks: [blockSchema],
});
