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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const _Utils_1 = require("../Utils");
class supportController {
}
exports.default = supportController;
_a = supportController;
supportController.SendMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, title } = req.body;
    try {
        yield (0, _Utils_1.sendMail)({
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
    }
    catch (err) {
        res.status(500).send(err);
    }
});
//# sourceMappingURL=supportController.js.map