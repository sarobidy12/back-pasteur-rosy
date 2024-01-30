import { Request, Response } from "express";
import { lifeWithJesus, ILifeWithJesus } from "@Models";
import { Types } from "mongoose";

export default class LifeWithJesusController {
  static createLifeWithJesus = async (req: Request, res: Response) => {
    const { title, seoDescription, description, path, linkVideo } = req.body;
    try {
      const saved: ILifeWithJesus = await lifeWithJesus.create({
        title,
        seoDescription,
        description,
        path,
        linkVideo,
      });
      res.status(200).send(saved);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static updateLifeWithJesus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, seoDescription, description, path, linkVideo } = req.body;

    try {
      const updated: ILifeWithJesus | {} = await lifeWithJesus.findOneAndUpdate(
        {
          _id: Types.ObjectId(id),
        },
        {
          seoDescription,
          description,
          path,
          linkVideo,
        },
        { new: true }
      );
      res.status(200).send(updated);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static deleteLifeWithJesus = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const deleted = await lifeWithJesus.deleteOne({
        _id: Types.ObjectId(id),
      });
      res.status(200).send(deleted);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static getLifeWithJesus = async (req: Request, res: Response) => {
    const { filter, page } = req.query;
    try {
      const skipCount = (+page - 1) * 10;
      const list: ILifeWithJesus[] | [] = await lifeWithJesus
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

  static findOneLifeWithJesus = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const list: ILifeWithJesus = await lifeWithJesus.findById(id);
      res.status(200).send(list);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static findbyTitle = async (req: Request, res: Response) => {
    try {
      const one: ILifeWithJesus = await lifeWithJesus.findOne({
        title: `${req.query.title}`,
      });
      res.status(200).send(one);
    } catch (err: any) {
      console.error(err);
      res.status(500).send(err);
    }
  };
}
