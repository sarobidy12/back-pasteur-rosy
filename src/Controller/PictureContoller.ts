import { Request, Response } from "express";
import { Album, IAlbum, Picture } from "@Models";
import { Types } from "mongoose";

export default class PictureController {
  static uploadPicture = async (req: any, res: Response) => {
    const decodedText = decodeURIComponent(req.query.folder);

    try {
      const getOneAlbum = await Album.findOne({ name: decodedText });
      const uploadedFiles = req.files.map(async (file) => {
        try {
          const savePicture = await Picture.create({
            album: Types.ObjectId(getOneAlbum._id),
            path: file.path,
          });

          return {
            originalname: file.originalname,
            filename: file.filename,
            path: file.path,
            _id: savePicture._id,
          };
        } catch (err: any) {
          console.error(err);
        }

        return {};
      });

      const response = await Promise.all(uploadedFiles);
      res.status(200).send(response);
    } catch (err: any) {
      console.error(err);
      res.status(500).send(err);
    }
  };

  static getPictureByAlbum = async (req: any, res: Response) => {
    const decodedText = decodeURIComponent(req.query.album);

    try {
      const albumSelected = await Album.findOne({ name: decodedText });
      const getPictureByAlbum = await Picture.find({
        album: albumSelected._id,
      });
      res.status(200).send(getPictureByAlbum);
    } catch (err: any) {
      console.error(err);
      res.status(500).send(err);
    }
  };

  static deletePicture = async (req: any, res: Response) => {
    const { list } = req.body;
    try {
      const getPictureByAlbum = await Picture.deleteMany({
        _id: {
          $in: list,
        },
      });
      res.status(200).send(getPictureByAlbum);
    } catch (err: any) {
      console.error(err);
      res.status(500).send(err);
    }
  };
}
