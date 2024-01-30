import { Request, Response } from "express";
import { category, ICategory } from "@Models";
import { Types } from "mongoose";

export default class CategoryController {
  static createCategory = async (req: Request, res: Response) => {
    const { name, seoDescription, textIcon, favorite } = req.body;

    try {
      const verify: ICategory = await category.findOne({ name });

      if (verify) {
        res.status(500).send({ err: true, message: "category already exist" });
      }

      const saved: ICategory = await category.create({
        name,
        seoDescription,
        textIcon,
        favorite,
      });
      res.status(200).send(saved);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, seoDescription, textIcon, favorite } = req.body;

    try {
      const updated: ICategory | {} = await category
        .findOneAndUpdate(
          {
            _id: Types.ObjectId(id),
          },
          {
            name,
            seoDescription,
            textIcon,
            favorite,
          },
          { new: true }
        )
        .exec();
      res.status(200).send(updated);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const deleted = await category.deleteOne({
        _id: Types.ObjectId(id),
      });
      res.status(200).send(deleted);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static getCategory = async (req: Request, res: Response) => {
    const { filter, favorite } = req.query;

    const queryFilter: any = {};

    if (favorite === "true") {
      queryFilter.favorite = favorite;
    }

    try {
      const list: ICategory[] | [] = await category.find(queryFilter);
      res.status(200).send(list);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };
}
