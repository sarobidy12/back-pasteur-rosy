import express from "express";
import cors from "cors";
import routes from "@Route";
import * as bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import { config } from "dotenv";
import { Server, Socket } from "socket.io";
import { Message } from "@Models";

config();
const userConnected = [];

const mongoURI: string = process.env.mongoDBURI || "";

const app = express();

console.log("mongoURI", mongoURI);

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

app.use("/file", express.static("File"));

app.use(
  cors({
    exposedHeaders: ["token"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use(helmet());

app.use(bodyParser.json({ limit: "50mb" }));

// Set all routes from routes folder
app.use("/", routes);

const server = app.listen(process.env.PORT || 3009, () => {
  console.log(`Server started on port ${process.env.PORT || 3009}!`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("socket_io", io);

io.on("connection", (socket: Socket) => {
  socket.on("user-connect", async (userData) => {
    if (
      userData.userId &&
      !userConnected.find(
        (x: any) => x.userId === userData.userId && x.canal === userData.canal
      )
    ) {
      userConnected.push({ id: socket.id, ...userData });
      io.sockets.emit(
        `users-connected-${userData.canal}`,
        userConnected.filter((x: any) => x.canal === userData.canal)
      );
      console.log("Users online: " + userConnected.length);
    }
  });
  socket.on("send-message", async (messageData) => {
    try {
      const newMessage = await Message.create(messageData);
      const oneMessage = await Message.findById(newMessage._id).populate(
        "user"
      );
      io.sockets.emit(messageData.canal, oneMessage);
    } catch (err) {
      console.log(err);
      io.sockets.emit("error", err);
    }
  });

  socket.on("disconnect", () => {
    userConnected.map((user, index) => {
      if (userConnected[index].id === socket.id)
        return userConnected.splice(index, 1);
    });
    io.sockets.emit("users-connected", userConnected);
  });
});

export default server;
