import { Request, Response } from "express";
import { biography, IBiography } from "@Models";
import { Types } from "mongoose";

export default class biographyController {
  static createBiography = async (req: Request, res: Response) => {
    const { content } = req.body;
    try {
      const bio = await biography.create({ content });
      res.status(200).send(bio);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static updateBiography = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
      const bio = await biography.updateOne(
        { _id: Types.ObjectId(id) },
        { content }
      );
      res.status(200).send(bio);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static getBiography = async (req: Request, res: Response) => {
    try {
      const [a, b, ...other] = await biography.find();
      res.status(200).send(a);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };
}
