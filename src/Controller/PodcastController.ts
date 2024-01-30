import { Request, Response } from "express";
import { podcast, IPodcast } from "@Models";
import { Types } from "mongoose";

export default class PadcastController {
  static createPodcast = async (req: Request, res: Response) => {
    const { title, seoDescription, textIcon, category, urlImg, urlUpload } =
      req.body;

    try {
      const saved: IPodcast = await podcast.create({
        title,
        seoDescription,
        textIcon,
        category,
        urlImg,
        urlUpload,
      });
      res.status(200).send(saved);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static updatePodcast = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { seoDescription, textIcon, category, urlImg, urlUpload } = req.body;

    try {
      const updated: IPodcast | {} = await podcast.findOneAndUpdate(
        {
          _id: Types.ObjectId(id),
        },
        {
          seoDescription,
          textIcon,
          category,
          urlImg,
          urlUpload,
        },
        { new: true }
      );
      res.status(200).send(updated);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static deletePodcast = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const deleted = await podcast.deleteOne({
        _id: Types.ObjectId(id),
      });
      res.status(200).send(deleted);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static getPodcast = async (req: Request, res: Response) => {
    // Updated method name
    const { filter, category, page } = req.query;

    const skipCount = (+page - 1) * 10;

    try {
      const filterRequest: any = {
        title: { $regex: filter as string, $options: "i" },
      };

      if (category) {
        filterRequest.category = category;
      }
      const list: IPodcast[] = await podcast
        .find(filterRequest)
        .skip(skipCount)
        .limit(10)
        .exec();

      res.status(200).send(list);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static findbyTitle = async (req: Request, res: Response) => {
    try {
      const one = await podcast.findOne({
        title: `${req.query.title}`,
      });
      res.status(200).send(one);
    } catch (err: any) {
      console.error(err);
      res.status(500).send(err);
    }
  };

  static lastedPodcast = async (req: Request, res: Response) => {
    try {
      const one = await podcast.findOne({}).sort({ createdAt: -1 });
      res.status(200).send(one);
    } catch (err: any) {
      console.error(err);
      res.status(500).send(err);
    }
  };
}
