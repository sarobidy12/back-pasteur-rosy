import { Request, Response } from "express";
import { Trainning } from "@Models";
import { Types } from "mongoose";

export default class TrainningController {
  static createTrainning = async (req: Request, res: Response) => {
    const { title, purpose, description, content } = req.body;

    try {
      const saved = await Trainning.create({
        title,
        purpose,
        description,
        content,
      });
      res.status(200).send(saved);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static updateTrainning = async (req: Request, res: Response) => {
    const { _id } = req.params;
    const { title, purpose, description, content } = req.body;

    try {
      const updated = await Trainning.updateOne(
        {
          _id: Types.ObjectId(_id),
        },
        {
          title,
          purpose,
          description,
          content,
        }
      );
      res.status(200).send(updated);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static deleteTrainning = async (req: Request, res: Response) => {
    const { _id } = req.params;

    try {
      const deleted = await Trainning.deleteOne({
        _id: Types.ObjectId(_id),
      });
      res.status(200).send(deleted);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static getTrainning = async (req: Request, res: Response) => {
    const { filter } = req.query;

    try {
      const list = await Trainning.find();
      res.status(200).send(list);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static findOneTrainning = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const list = await Trainning.findById(id);
      res.status(200).send(list);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };
}
