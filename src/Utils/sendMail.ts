import nodemailer from "nodemailer";

interface IParam {
  to: string;
  subject: string;
  body: string;
  title: string;
}
// async..await is not allowed in global scope, must use a wrapper
export const sendMail = async (param: IParam) => {
  const transporter = nodemailer.createTransport({
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
  const info = await transporter.sendMail({
    from: `"CEPD" <${process.env.email}>`, // sender address
    to: param.to, // list of receivers
    subject: param.subject, // Subject line
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
};
