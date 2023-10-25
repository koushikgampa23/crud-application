const express = require("express");
const app = express();
const http = require("http");

const cors = require("cors");
app.use(express.json());
app.use(cors());
const socketIo = require("socket.io");

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost:27017/"
  )
  .then(() => {
    console.log("Connected to Mongo Db");
  })
  .catch((e) => {
    console.log("Error->", e);
  });

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow connections from any origin
  },
});

const userRoute = require("./Routes/UserRoute");
app.use("/users", userRoute);

const taskRoute = require("./Routes/TaskRoute")(io);
app.use("/task", taskRoute);

const loginRoute = require("./Routes/LoginRoute");
app.use("/login", loginRoute);

server.listen(3001, () => {
  console.log("Running");
});
