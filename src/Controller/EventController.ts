import { Request, Response } from "express";
import { functionSenderNewLetter } from "@Utils";
import { event, IEvent } from "@Models";
import { Types } from "mongoose";

export default class EventController {
  static createEvent = async (req: Request, res: Response) => {
    const {
      title,
      shortDescription,
      seoDescription,
      description,
      date,
      path,
      place,
      live,
    } = req.body;

    try {
      const saved: IEvent = await event.create({
        shortDescription,
        seoDescription,
        description,
        date,
        path,
        place,
        live,
        title,
      });

      functionSenderNewLetter(title, description);

      res.status(200).send(saved);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static updateEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      shortDescription,
      seoDescription,
      description,
      date,
      path,
      place,
      live,
    } = req.body;

    try {
      const updated: IEvent | {} = await event.findOneAndUpdate(
        {
          _id: Types.ObjectId(id),
        },
        {
          shortDescription,
          seoDescription,
          description,
          date,
          path,
          place,
          live,
        },
        { new: true }
      );

      functionSenderNewLetter("[EVENEMENT MODIFIER]", description);

      res.status(200).send(updated);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const deleted = await event.deleteOne({
        _id: Types.ObjectId(id),
      });
      res.status(200).send(deleted);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static getEvent = async (req: Request, res: Response) => {
    const { filter, page } = req.query;

    try {
      const list: IEvent[] | [] = await event.find({}).sort({
        date: "desc",
      });
      res.status(200).send(list);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static findOneEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log("call");
    try {
      const list: IEvent = await event.findById(id);
      res.status(200).send(list);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static findbyTitle = async (req: Request, res: Response) => {
    try {
      const one: IEvent = await event.findOne({
        title: `${req.query.title}`,
      });
      res.status(200).send(one);
    } catch (err: any) {
      console.error(err);
      res.status(500).send(err);
    }
  };
}
