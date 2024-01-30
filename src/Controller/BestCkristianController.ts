import { Request, Response } from "express";
import { bestCkristian } from "@Models";
import { Types } from "mongoose";

export default class bestCkristianController {
  static createBestCkristian = async (req: Request, res: Response) => {
    const { title, description, seoDescription, path, time } = req.body;
    console.log("description", description);
    try {
      const saved = await bestCkristian.create({
        title,
        description,
        seoDescription,
        path,
        time,
      });
      res.status(200).send(saved);
    } catch (err: any) {
      console.log("err", err);
      res.status(500).send(err);
    }
  };

  static updateBestCkristian = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, seoDescription, path, time } = req.body;

    try {
      const updated = await bestCkristian
        .findOneAndUpdate(
          {
            _id: Types.ObjectId(id),
          },
          {
            description,
            seoDescription,
            path,
            time,
          },
          { new: true }
        )
        .exec();

      res.status(200).send(updated);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static deleteBestCkristian = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const deleted = await bestCkristian.deleteOne({
        _id: Types.ObjectId(id),
      });
      res.status(200).send(deleted);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static getBestCkristian = async (req: Request, res: Response) => {
    const { filter, page } = req.query;
    try {
      const skipCount = (+page - 1) * 10;
      const list = await bestCkristian
        .find({
          title: { $regex: filter as string, $options: "i" },
        })
        .skip(skipCount)
        .limit(10)
        .exec();

      res.status(200).send(list);
    } catch (err: any) {
      console.log("err", err);
      res.status(500).send(err);
    }
  };

  static findOneBestCkristian = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const list = await bestCkristian.findById(id);
      res.status(200).send(list);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static findbyTitle = async (req: Request, res: Response) => {
    try {
      const one = await bestCkristian.findOne({
        title: `${req.query.title}`,
      });
      res.status(200).send(one);
    } catch (err: any) {
      console.error(err);
      res.status(500).send(err);
    }
  };
}
