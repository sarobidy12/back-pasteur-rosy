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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const checkJwt = (req, res, next) => {
    //Get the jwt token from the head
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(401).send({
            status: "ERROR",
            code: "TOKEN_REQUIRED",
            message: 'No token'
        });
    }
    token = token.replace("Bearer ", "");
    let jwtPayload;
    //Try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, process.env.jwtSecret || "");
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        //If token is not valid, respond with 423 (locked)
        res.status(423).send({
            status: "ERROR",
            code: error.name,
            message: "Your token has expired"
        });
        return;
    }
    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, process.env.jwtSecret || "", {
        expiresIn: "3h",
    });
    res.setHeader("token", newToken);
    //Call the next middleware or controller
    next();
};
exports.checkJwt = checkJwt;
//# sourceMappingURL=checkJwt.js.map