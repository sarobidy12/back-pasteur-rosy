import { Request, Response } from "express";
import { Album, IAlbum } from "@Models";
import { Mongoose, Types } from "mongoose";

export default class AlbumController {
  static createAlbum = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      const verify = await Album.find({ name });
      if (verify.length) {
        res.status(500).send({ err: true, message: "album already existe." });
      }
      const albumSaved = await Album.create({ name });
      res.status(200).send(albumSaved);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static getAlbum = async (req: Request, res: Response) => {
    const { favorite } = req.query;
    let logic: any = {};
    if (favorite) {
      logic.favorite = favorite;
    }

    console.log("logic", logic);

    try {
      const allAlbum: IAlbum[] | [] = await Album.find(logic);
      res.status(200).send(allAlbum);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static deleteAlbum = async (req: Request, res: Response) => {
    const { listID } = req.body;
    try {
      const albumDeleted = await Album.deleteMany(listID);
      res.status(200).send("these album is deleted");
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static favoriteAlbum = async (req: Request, res: Response) => {
    const { album } = req.body;
    try {
      await Album.updateMany(
        {},
        {
          $set: { favorite: false },
        }
      );

      const array = await [...album].map(async (x: any) => {
        let update;
        try {
          update = await Album.updateOne(
            {
              _id: Types.ObjectId(x._id),
            },
            {
              $set: { favorite: true },
            }
          );
        } catch (err: any) {
          console.error(err);
        }
        return update;
      });

      const result = await Promise.all(array);

      res.status(200).send(result);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };
}
