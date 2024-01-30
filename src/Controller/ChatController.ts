import { Request, Response } from "express";
import { chat, IChat, Message, IMessage } from "@Models";
import { Types } from "mongoose";

export default class ChatController {
  static createChat = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    try {
      const saved: IChat = await chat.create({
        name,
        description,
      });
      res.status(200).send(saved);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static updateChat = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const updated: IChat | {} = await chat.findOneAndUpdate(
        {
          _id: Types.ObjectId(id),
        },
        {
          name,
          description,
        },
        { new: true }
      );
      res.status(200).send(updated);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static deleteChat = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const deleted = await chat.deleteOne({
        _id: Types.ObjectId(id),
      });
      res.status(200).send(deleted);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static getChat = async (req: Request, res: Response) => {
    const { filter } = req.query;

    try {
      const list: IChat[] | [] = await chat.find();
      res.status(200).send(list);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static addNewMember = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;

    try {
      const list: IChat | {} = await chat.updateOne(
        {
          _id: Types.ObjectId(id),
        },
        {
          content: {
            $push: user,
          },
        }
      );
      res.status(200).send(list);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const list: IChat | {} = await chat.findById(id);
      res.status(200).send(list);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };
  static getConvesation = async (req: Request, res: Response) => {
    const { canal, page } = req.query;
    try {
      const skipCount = (+page - 1) * 20;
      const list: IMessage[] | [] = await Message.find({
        canal: Types.ObjectId(canal as string),
      })
        .skip(skipCount)
        .sort({ createdAt: -1 })
        .limit(20)
        .populate("user")
        .exec();
      res.status(200).send(list);
    } catch (err: any) {
      console.log("err", err);
      res.status(500).send(err);
    }
  };
}
