import { Request, Response } from "express";

export default class FileController {
  static uploadFile = async (req: any, res: Response) => {
    const uploadedFiles = req.files.map((file) => ({
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
    }));

    res.status(200).send(uploadedFiles);
  };

  static uploadOnePicture = async (req: any, res: Response) => {
    try {
      return res.status(200).send({
        originalname: req.files[0].originalname,
        filename: req.files[0].filename,
        path: req.files[0].path,
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).send(err);
    }
  };

  static sinceEditor = async (req: any, res: Response) => {
    try {
      return res.status(200).send({
        success: 1,
        file: {
          url: `${process.env.BACK_URI}/${req.files[0].path}`,
          // ... and any additional fields you want to store, such as width, height, color, extension, etc
        },
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).send(err);
    }
  };
}
