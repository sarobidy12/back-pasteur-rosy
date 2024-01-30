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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const _Models_1 = require("../Models");
const checkRole = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        //Get the user ID from previous midleware
        const id = res.locals.jwtPayload.userId;
        let user;
        try {
            user = yield _Models_1.User.findOne({ _id: id });
        }
        catch (err) {
            res.status(400).send({ err: "Could not check who you are" });
        }
        //Check if array of authorized roles includes the user's role
        if (roles.indexOf((_a = user === null || user === void 0 ? void 0 : user.role) !== null && _a !== void 0 ? _a : "") > -1)
            next();
        else
            res.status(401).send({ err: "You don't have the permission to proceed" });
    });
};
exports.checkRole = checkRole;
//# sourceMappingURL=checkRole.js.map