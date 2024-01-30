import { Request, Response } from "express";
import { discover, IDiscover } from "@Models";
import { Types } from "mongoose";

export default class DiscoverController {
  static createDiscover = async (req: Request, res: Response) => {
    const { title, seoDescription, description, path, linkVideo, category } =
      req.body;
    try {
      const saved: IDiscover = await discover.create({
        title,
        seoDescription,
        description,
        path,
        linkVideo,
        category,
      });
      res.status(200).send(saved);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static updateDiscover = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { seoDescription, description, path, linkVideo, category } = req.body;

    try {
      const updated: IDiscover | {} = await discover.findOneAndUpdate(
        {
          _id: Types.ObjectId(id),
        },
        {
          seoDescription,
          description,
          path,
          linkVideo,
          category,
        },
        { new: true }
      );
      res.status(200).send(updated);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static deleteDiscover = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const deleted = await discover.deleteOne({
        _id: Types.ObjectId(id),
      });
      res.status(200).send(deleted);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static getDiscover = async (req: Request, res: Response) => {
    const { filter, page, category } = req.query;
    try {
      const skipCount = (+page - 1) * 10;

      const filterRequest: any = {
        title: { $regex: filter as string, $options: "i" },
      };

      if (category) {
        filterRequest.category = category;
      }

      const list = await discover
        .find(filterRequest)
        .skip(skipCount)
        .limit(10)
        .exec();
      res.status(200).send(list);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static findOneDiscover = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const list: IDiscover = await discover.findById(id);
      res.status(200).send(list);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };
}
