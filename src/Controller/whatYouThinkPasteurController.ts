import { Request, Response } from "express";
import { whatYouThinkPastor, IWhatYouThinkPastor } from "@Models";
import { Types } from "mongoose";

export default class WhatYouThinkPastorController {
  static createWhatYouThinkPastor = async (req: Request, res: Response) => {
    const { name, email, message, resumeQuestion, category } = req.body;
    try {
      const saved = await whatYouThinkPastor.create({
        name,
        email,
        message,
        resumeQuestion,
        category,
      });
      res.status(200).send(saved);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static answerWhatYouThinkPastor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { answer, linkVideo } = req.body;

    try {
      const updated = await whatYouThinkPastor.updateOne(
        {
          _id: Types.ObjectId(id),
        },
        {
          answer,
          linkVideo,
          answered: true,
        }
      );
      res.status(200).send({ ...updated, _id: id });
    } catch (err: any) {
      console.error(err);
      res.status(500).send(err);
    }
  };

  static deleteWhatYouThinkPastor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleted = await whatYouThinkPastor
        .deleteOne({
          _id: Types.ObjectId(id),
        })
        .exec();
      res.status(200).send(deleted);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static getWhatYouThinkPastor = async (req: Request, res: Response) => {
    const { filter, answered, page, category, email } = req.query as any;
    try {
      const skipCount = (+page - 1) * 10;

      const filterRequest: any = {
        resumeQuestion: { $regex: filter as string, $options: "i" },
        answered: answered === "true" ? true : (false as boolean),
      };

      if (category) {
        filterRequest.category = category;
      }

      if (email) {
        filterRequest.email = email;
      }

      const list = await whatYouThinkPastor
        .find(filterRequest)
        .skip(skipCount)
        .limit(10)
        .exec();
      res.status(200).send(list);
    } catch (err: any) {
      console.log("err", err);
      res.status(500).send(err);
    }
  };

  static findOneWhatYouThinkPastorNoAnswered = async (
    req: Request,
    res: Response
  ) => {
    const { id } = req.params;

    try {
      const one = await whatYouThinkPastor.findById(id);
      res.status(200).send(one);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };
}
