import { Request, Response } from "express";
import { WordOfDay, IWordOfDay } from "@Models";
import { Types } from "mongoose";

export default class WordOfDayController {
  static createWordOfDay = async (req: Request, res: Response) => {
    const { content, verse } = req.body;
    try {
      const bio = await WordOfDay.create({ content, verse });
      res.status(200).send(bio);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static updateWordOfDay = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content, verse } = req.body;

    try {
      const bio = await WordOfDay.updateOne(
        { _id: Types.ObjectId(id) },
        { content, verse }
      );
      res.status(200).send(bio);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static getWordOfDay = async (req: Request, res: Response) => {
    try {
      const [a, b, ...other] = await WordOfDay.find();
      res.status(200).send(a);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

}
