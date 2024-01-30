"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// async..await is not allowed in global scope, must use a wrapper
const sendMail = (param) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.host,
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.email,
            pass: process.env.pass,
        },
    });
    // send mail with defined transport object
    const info = yield transporter.sendMail({
        from: `"CEPD" <${process.env.email}>`,
        to: param.to,
        subject: param.subject,
        html: `
    <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="margin: 0;padding: 0;">
    <div
        style="width: 100%;height: 15vh;display: flex;align-items: center;justify-content: center;background-color: #048b9a;text-align: center;">
        <h2 style="color: white;font-size: 4vh;">
            ${param.title}
        </h2>
    </div>
    <div style="width: 80%;margin: 2vh auto;min-height: 50vh;">
         ${param.body}
    </div>
    <div style="width: 80%;margin: 2vh auto">
        <p style="margin-top: 10vh;">
            Equipe de Pasteur Rosy.
        </p>
    </div>
    <div
        style="width: 100%;height: 15vh;display: flex;align-items: center;justify-content: center;background-color: #f8a820;text-align: center;" />
</body>
</html>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
});
exports.sendMail = sendMail;
//# sourceMappingURL=sendMail.js.map