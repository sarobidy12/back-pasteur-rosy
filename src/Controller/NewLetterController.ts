import { Request, Response } from "express";
import { functionSenderNewLetter } from "@Utils";
import { NewLetter } from "@Models";
import { Types } from "mongoose";

export default class NewLetterController {
  static addNewLetter = async (req: Request, res: Response) => {
    const { lastName, email } = req.body;
    try {
      const verify = await NewLetter.findOne({
        email,
      });

      if (verify || !email) {
        throw verify;
      }

      const saved = await NewLetter.create({
        lastName,
        email,
      });
      res.status(200).send(saved);
    } catch (err: any) {
      console.log("err", err);
      res.status(500).send(err);
    }
  };

  static RemoveNewLetter = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const saved = await NewLetter.deleteOne({ _id: Types.ObjectId(id) });
      res.status(200).send(
        `<div>
        <h2>Vous ne recevrez plus de newLetter.</h2>
        </div>`
      );
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static sendNewLetter = async (req: Request, res: Response) => {
    const { content, title } = req.body;

    try {
      functionSenderNewLetter(title, content);

      res.status(200).send({ success: true });
    } catch (err: any) {
      console.log("test");
      res.status(500).send(err);
    }
  };

  static count = async (req: Request, res: Response) => {
    try {
      const list = await NewLetter.find();
      res.status(200).send({ success: true, count: list.length });
    } catch (err: any) {
      res.status(500).send(err);
    }
  };
}
