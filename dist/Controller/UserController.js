"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../Models/User");
const _Utils_1 = require("../Utils");
const _Utils_2 = require("../Utils");
const bcrypt = __importStar(require("bcryptjs"));
const mongoose_1 = require("mongoose");
class UserController {
}
exports.default = UserController;
_a = UserController;
UserController.checkUserPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};
UserController.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, gender, img } = req.body;
    try {
        const verify = yield User_1.User.findOne({
            email: email.trim(),
        });
        if (verify) {
            throw verify;
        }
        const saved = yield User_1.User.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password.trim(), 8),
            gender,
            img,
        });
        yield (0, _Utils_2.sendMail)({
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
    }
    catch (err) {
        res.status(500).send(err);
    }
});
UserController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const infoUpdated = Object.assign({}, req.body);
    if (req.body.password) {
        infoUpdated.password = bcrypt.hashSync(req.body.password.trim(), 8);
    }
    try {
        const updated = yield User_1.User.findOneAndUpdate({
            _id: mongoose_1.Types.ObjectId(id),
        }, infoUpdated).exec();
        res.status(200).send(updated);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
UserController.comfirmMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, lastName } = req.body;
    try {
        const updated = yield User_1.User.findOne({
            email: email.trim(),
        });
        if (updated) {
            throw updated;
        }
        const code = (0, _Utils_1.getRandomInt)(99999);
        yield (0, _Utils_2.sendMail)({
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
    }
    catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
});
UserController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.User.findOne({
            email,
        });
        if (!_a.checkUserPassword(user._doc, password)) {
            return res.status(400).send({ message: "invalide login" });
        }
        if (user._doc.block) {
            throw user._doc;
        }
        const token = (0, _Utils_1.generateToken)(user._doc);
        res.status(200).send(Object.assign(Object.assign({}, user._doc), { token: token }));
    }
    catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
});
UserController.sendMailResetPassowrd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield User_1.User.findOne({
            email: email.trim(),
        });
        if (!user) {
            res.status(500).send({ err: "user not found" });
            return;
        }
        const token = (0, _Utils_1.generateToken)(user._doc);
        yield (0, _Utils_2.sendMail)({
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
    }
    catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
});
UserController.resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const token = res.getHeader("token");
    const id = (0, _Utils_1.getUserIdFromToken)(token);
    console.log("id", id);
    try {
        const user = yield User_1.User.updateOne({
            _id: mongoose_1.Types.ObjectId(id),
        }, {
            password: bcrypt.hashSync(password.trim(), 8),
        }).exec();
        console.log("resetPassword -> user", user);
        res.status(200).send({ success: true, user: user });
    }
    catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
});
UserController.getInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = res.getHeader("token");
    const id = (0, _Utils_1.getUserIdFromToken)(token);
    try {
        const user = yield User_1.User.findById(id);
        res.status(200).send({ success: true, user: user });
    }
    catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
});
UserController.getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, page } = req.query;
    try {
        const skipCount = (+page - 1) * 10;
        const list = yield User_1.User.find({
            $or: [
                { firstName: { $regex: filter, $options: "i" } },
                { lastName: { $regex: filter, $options: "i" } },
                { email: { $regex: filter, $options: "i" } },
            ],
        })
            .skip(skipCount)
            .limit(10)
            .exec();
        res.status(200).send(list);
    }
    catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
});
UserController.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield User_1.User.deleteOne({
            _id: mongoose_1.Types.ObjectId(id),
        }).exec();
        res.status(200).send(deleted);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
UserController.blockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Assuming you pass the document ID in the URL parameters
        const document = yield User_1.User.findById(id);
        document.block = !document.block;
        yield document.save();
        res.status(200).send(document);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
UserController.count = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield User_1.User.count();
        res.status(200).send({ count: total });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
//# sourceMappingURL=UserController.js.map