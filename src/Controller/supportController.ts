import { Request, Response } from "express";
import { WordOfDay, IWordOfDay } from "@Models";
import { sendMail } from "@Utils";

export default class supportController {
  static SendMail = async (req: Request, res: Response) => {
    const { content, title } = req.body;
    try {
      await sendMail({
        to: "contact@ranaivomanana-tahiana.com",
        subject: `[PROBLEME CEPD] ${title}`,
        body: `
        <div>
          Bonjour Tahiana,<br /><br />
          <p>${content}</p>
        </div>`,
        title: "BUG.",
      });

      res.status(200).send({ successs: true });
    } catch (err: any) {
      res.status(500).send(err);
    }
  };
}
