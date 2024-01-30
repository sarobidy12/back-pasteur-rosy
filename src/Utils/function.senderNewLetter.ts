import { NewLetter } from "@Models";
import editorJsHtml from "editorjs-html";
import { sendNewLetter } from "@Utils";

export const functionSenderNewLetter = async (
  title: string,
  content: string
) => {
  const EditorJsToHtml = editorJsHtml();
  const html = EditorJsToHtml ? EditorJsToHtml.parse(content) : null;

  const list = await NewLetter.find();

  let BodyContent = "";

  html.forEach(
    (item) =>
      (BodyContent += item.replace(
        "<blockquote>",
        `<blockquote style="margin: 0;
      padding: 4.5vh;
      border-radius: 0 15px 15px 0;
      font-style: italic;
      border-left: 5px solid #048b9a;
      color: #048b9a;
      background-color: #048b9a17;">`
      ))
  );

  list.map(async (x: any) => {
    await sendNewLetter({
      to: x.email,
      subject: title,
      id_user: x._id,
      body: BodyContent,
    });
  });
};
