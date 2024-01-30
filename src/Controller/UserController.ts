import { Request, Response } from "express";
import { User } from "Models/User";
import { generateToken, getRandomInt, getUserIdFromToken } from "@Utils";
import { sendMail } from "@Utils";
import * as bcrypt from "bcryptjs";
import { Types } from "mongoose";

export default class UserController {
  private static checkUserPassword = (user: any, password: string) => {
    return bcrypt.compareSync(password, user.password);
  };

  static register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, gender, img } = req.body;

    try {
      const verify = await User.findOne({
        email: email.trim(),
      });

      if (verify) {
        throw verify;
      }

      const saved = await User.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password.trim(), 8),
        gender,
        img,
      });

      await sendMail({
        to: email,
        subject: "Bienvenue",
        body: `
    <div>
    Bonjour <b>${lastName}</b>,<br /><br />
    
    <p>

    Bienvenue sur [Votre Service] ! Nous sommes ravis de vous accueillir dans notre communauté.<br />
    
    Nous sommes là pour vous offrir une expérience exceptionnelle et vous accompagner à chaque étape. Voici quelques informations pour vous aider à démarrer :<br /><br />
    
    Explorez [Votre Service] et découvrez toutes les fonctionnalités passionnantes que nous avons à offrir.<br />
     Que vous soyez ici pour [raison principale du service], [raison secondaire du service], ou simplement pour [autre raison], nous sommes là pour répondre à vos besoins.<br />
    
    N'hésitez pas à consulter notre [guide de démarrage rapide] pour obtenir des instructions détaillées sur la façon de tirer le meilleur parti de [Votre Service].<br /><br />
    
    Merci de faire partie de [Votre Service] ! Nous sommes impatients de vous accompagner dans cette nouvelle aventure.
    
    Cordialement,
    
    </p>
    </div>
    `,
        title: "Bienvenue",
      });

      res.status(200).send(saved);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.params;

    const infoUpdated = {
      ...req.body,
    };

    if (req.body.password) {
      infoUpdated.password = bcrypt.hashSync(req.body.password.trim(), 8);
    }
    try {
      const updated = await User.findOneAndUpdate(
        {
          _id: Types.ObjectId(id),
        },
        infoUpdated
      ).exec();
      res.status(200).send(updated);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static comfirmMail = async (req: Request, res: Response) => {
    const { email, lastName } = req.body;
    try {
      const updated = await User.findOne({
        email: email.trim(),
      });

      if (updated) {
        throw updated;
      }

      const code = getRandomInt(99999);

      await sendMail({
        to: email,
        subject: "Code de comfirmation ",
        body: `
    <div>
    Bonjour <b>${lastName}</b>,<br /><br />
    
    <p>

      Bienvenue sur [Votre Service] ! Nous sommes ravis de vous avoir parmi nous. <br /><br />

      Lors de l'activation, vous serez invité à saisir le code de confirmation suivant :<br /><br />

      <div style="padding:1vh;background-color:#CDCDCD;text-align:center">
        <b>${code}</b> 
      </div>

      <br /><br />

      Cordialement,

    </p>
    </div>
    `,
        title: "Code de comfirmation ",
      });

      res.status(200).send({ code: code });
    } catch (err: any) {
      console.log("err", err);
      res.status(500).send(err);
    }
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user: any = await User.findOne({
        email,
      });

      if (!this.checkUserPassword(user._doc, password)) {
        return res.status(400).send({ message: "invalide login" });
      }

      if (user._doc.block) {
        throw user._doc;
      }

      const token = generateToken(user._doc);

      res.status(200).send({ ...user._doc, token: token });
    } catch (err: any) {
      console.log("err", err);
      res.status(500).send(err);
    }
  };

  static sendMailResetPassowrd = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      const user: any = await User.findOne({
        email: email.trim(),
      });

      if (!user) {
        res.status(500).send({ err: "user not found" });
        return;
      }

      const token = generateToken(user._doc);

      await sendMail({
        to: email,
        subject: "Réinitialisation de votre mot de passe",
        body: `
    <div>
    Bonjour <b>${user.lastName}</b>,<br /><br />
    
    <p>

    Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte sur [Votre Service]. Pour procéder à la réinitialisation, veuillez suivre les étapes ci-dessous :<br /><br />
Cliquez sur le lien ci-dessous pour accéder à la page de réinitialisation du mot de passe : <br /><br />

<a href="${process.env.FRONT_URI}/p/reinitialiser-mot-de-passe/${token}"style="padding:1vh;background-color:#048b9a;text-align:center;width:100%;color:white;" >Réinitialiser</a><br /><br />

Vous serez redirigé(e) vers une page sécurisée où vous pourrez créer un nouveau mot de passe. Assurez-vous de choisir un mot de passe sécurisé.<br /><br />

Si vous n'avez pas demandé la réinitialisation de votre mot de passe, veuillez ignorer cet e-mail. Votre mot de passe actuel restera inchangé.<br /><br />

Si vous rencontrez des problèmes ou si vous n'avez pas effectué cette demande, veuillez nous contacter immédiatement à [votre adresse e-mail de support].<br /><br />

Merci de faire confiance à [Votre Service] !<br /><br />

Cordialement,
    </p>
    </div>
    `,
        title: "Réinitialisation de votre mot de passe",
      });

      res.status(200).send({ token: token });
    } catch (err: any) {
      console.log("err", err);
      res.status(500).send(err);
    }
  };

  static resetPassword = async (req: Request, res: Response) => {
    const { password } = req.body;
    const token = <string>res.getHeader("token");

    const id = getUserIdFromToken(token);
    console.log("id", id);
    try {
      const user: any = await User.updateOne(
        {
          _id: Types.ObjectId(id),
        },
        {
          password: bcrypt.hashSync(password.trim(), 8),
        }
      ).exec();
      console.log("resetPassword -> user", user);
      res.status(200).send({ success: true, user: user });
    } catch (err: any) {
      console.log("err", err);
      res.status(500).send(err);
    }
  };

  static getInfo = async (req: Request, res: Response) => {
    const token = <string>res.getHeader("token");
    const id = getUserIdFromToken(token);
    try {
      const user: any = await User.findById(id);
      res.status(200).send({ success: true, user: user });
    } catch (err: any) {
      console.log("err", err);
      res.status(500).send(err);
    }
  };

  static getUser = async (req: Request, res: Response) => {
    const { filter, page } = req.query;
    try {
      const skipCount = (+page - 1) * 10;
      const list: any[] | [] = await User.find({
        $or: [
          { firstName: { $regex: filter as string, $options: "i" } },
          { lastName: { $regex: filter as string, $options: "i" } },
          { email: { $regex: filter as string, $options: "i" } },
        ],
      })
        .skip(skipCount)
        .limit(10)
        .exec();
      res.status(200).send(list);
    } catch (err: any) {
      console.log("err", err);
      res.status(500).send(err);
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleted = await User.deleteOne({
        _id: Types.ObjectId(id),
      }).exec();
      res.status(200).send(deleted);
    } catch (err: any) {
      res.status(500).send(err);
    }
  };

  static blockUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // Assuming you pass the document ID in the URL parameters

      const document = await User.findById(id);
      document.block = !document.block;
      await document.save();
      res.status(200).send(document);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static count = async (req: Request, res: Response) => {
    try {
      const total = await User.count();
      res.status(200).send({ count: total });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
