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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const _Route_1 = __importDefault(require("./Route"));
const bodyParser = __importStar(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = require("dotenv");
const socket_io_1 = require("socket.io");
const _Models_1 = require("./Models");
(0, dotenv_1.config)();
const userConnected = [];
const mongoURI = process.env.mongoDBURI || "";
const app = (0, express_1.default)();
console.log("mongoURI", mongoURI);
mongoose_1.default
    .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("MongoDB Connected");
})
    .catch((err) => console.log(err));
app.use("/file", express_1.default.static("File"));
app.use((0, cors_1.default)({
    exposedHeaders: ["token"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
}));
app.use((0, helmet_1.default)());
app.use(bodyParser.json({ limit: "50mb" }));
// Set all routes from routes folder
app.use("/", _Route_1.default);
const server = app.listen(process.env.PORT || 3009, () => {
    console.log(`Server started on port ${process.env.PORT || 3009}!`);
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
app.set("socket_io", io);
io.on("connection", (socket) => {
    socket.on("user-connect", (userData) => __awaiter(void 0, void 0, void 0, function* () {
        if (userData.userId &&
            !userConnected.find((x) => x.userId === userData.userId && x.canal === userData.canal)) {
            userConnected.push(Object.assign({ id: socket.id }, userData));
            io.sockets.emit(`users-connected-${userData.canal}`, userConnected.filter((x) => x.canal === userData.canal));
            console.log("Users online: " + userConnected.length);
        }
    }));
    socket.on("send-message", (messageData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newMessage = yield _Models_1.Message.create(messageData);
            const oneMessage = yield _Models_1.Message.findById(newMessage._id).populate("user");
            io.sockets.emit(messageData.canal, oneMessage);
        }
        catch (err) {
            console.log(err);
            io.sockets.emit("error", err);
        }
    }));
    socket.on("disconnect", () => {
        userConnected.map((user, index) => {
            if (userConnected[index].id === socket.id)
                return userConnected.splice(index, 1);
        });
        io.sockets.emit("users-connected", userConnected);
    });
});
exports.default = server;
//# sourceMappingURL=app.js.map