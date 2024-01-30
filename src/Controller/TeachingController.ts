import { Request, Response } from "express";
import { teaching, ITeaching } from "@Models"; // Updated import and model name
import { Types } from "mongoose";

export default class TeachingController {
  // Updated class name
  static createTeaching = async (req: Request, res: Response) => {
    // Updated method name
    const {
      title,
      seoDescription,
      description,
      path,
      linkVideo,
      category,
      favorite,
    } = req.body;
    try {
      const saved: ITeaching = await teaching.create({
        // Updated model name
        title,
        seoDescription,
        description,
        path,
        linkVideo,
        category,
        favorite,
      });
      res.status(200).send(saved);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static updateTeaching = async (req: Request, res: Response) => {
    // Updated method name
    const { id } = req.params;
    const { seoDescription, description, path, linkVideo, category, favorite } =
      req.body;

    try {
      const updated: ITeaching | {} = await teaching.findOneAndUpdate(
        {
          // Updated model name
          _id: Types.ObjectId(id),
        },
        {
          seoDescription,
          description,
          path,
          category,
          linkVideo,
          favorite,
        },
        { new: true }
      );
      res.status(200).send(updated);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static deleteTeaching = async (req: Request, res: Response) => {
    // Updated method name
    const { id } = req.params;

    try {
      const deleted = await teaching.deleteOne({
        // Updated model name
        _id: Types.ObjectId(id),
      });
      res.status(200).send(deleted);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static getTeaching = async (req: Request, res: Response) => {
    // Updated method name
    const { filter, category, page } = req.query;

    const skipCount = (+page - 1) * 10;

    try {
      const filterRequest: any = {
        title: { $regex: filter as string, $options: "i" },
      };

      if (category) {
        filterRequest.category = category;
      }
      const list: ITeaching[] = await teaching
        .find(filterRequest)
        .skip(skipCount)
        .limit(10)
        .exec();

      res.status(200).send(list);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static findOneTeaching = async (req: Request, res: Response) => {
    // Updated method name
    const { id } = req.params;

    try {
      const item: ITeaching = await teaching.findById(id); // Updated model name
      res.status(200).send(item);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static findbyTitle = async (req: Request, res: Response) => {
    console.log("call", (req.query.title as string).trim());
    try {
      const one = await teaching.findOne({
        title: `${(req.query.title as string).trim()}`,
      });
      console.log("one", one);
      res.status(200).send(one);
    } catch (err: any) {
      console.error(err);
      res.status(500).send(err);
    }
  };

  static getFavorite = async (req: Request, res: Response) => {
    // Updated method name
    try {
      const list: ITeaching[] = await teaching
        .find({ favorite: true })
        .limit(10)
        .exec();

      res.status(200).send(list);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static getSuggestionsByCategory = async (req: Request, res: Response) => {
    try {
      // Assuming the item ID is passed as a parameter in the request
      const itemId = req.params.itemId;

      // Find the item by ID
      const currentItem = await teaching.findById(itemId).exec();

      if (!currentItem) {
        return res
          .status(404)
          .json({ success: false, error: "Item not found" });
      }

      // Get the category of the current item
      const currentCategory = currentItem.category;

      // Retrieve random items from the same category, excluding the current item
      const randomItems = await teaching.aggregate([
        {
          $match: {
            category: currentCategory,
            _id: { $ne: Types.ObjectId(itemId) },
          },
        },
        { $sample: { size: 4 } }, // Adjust the size as needed for the number of random items
      ]);

      // Include the current item in the response
      const suggestions = [currentItem, ...randomItems];

      res.json({ success: true, suggestions });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  };
}
