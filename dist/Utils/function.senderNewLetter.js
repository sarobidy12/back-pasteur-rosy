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
exports.functionSenderNewLetter = void 0;
const _Models_1 = require("../Models");
const editorjs_html_1 = __importDefault(require("editorjs-html"));
const _Utils_1 = require(".");
const functionSenderNewLetter = (title, content) => __awaiter(void 0, void 0, void 0, function* () {
    const EditorJsToHtml = (0, editorjs_html_1.default)();
    const html = EditorJsToHtml ? EditorJsToHtml.parse(content) : null;
    const list = yield _Models_1.NewLetter.find();
    let BodyContent = "";
    html.forEach((item) => (BodyContent += item.replace("<blockquote>", `<blockquote style="margin: 0;
      padding: 4.5vh;
      border-radius: 0 15px 15px 0;
      font-style: italic;
      border-left: 5px solid #048b9a;
      color: #048b9a;
      background-color: #048b9a17;">`)));
    list.map((x) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, _Utils_1.sendNewLetter)({
            to: x.email,
            subject: title,
            id_user: x._id,
            body: BodyContent,
        });
    }));
});
exports.functionSenderNewLetter = functionSenderNewLetter;
//# sourceMappingURL=function.senderNewLetter.js.map