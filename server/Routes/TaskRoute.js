const express = require("express");
const router = express.Router();

const TaskModel = require("../Models/Task");
const UserModel = require("../Models/User");
const { validateToken } = require("../Middleware/validateToken");

module.exports = (io) => {
  router.post("/", validateToken, async (req, res) => {
    const taskData = req.body;
    const task = new TaskModel(taskData);

    task
      .save()
      .then(() => {
        io.emit("taskAdded", taskData);
        res.status(201).json("Data Inserted SuccessFully");
      })
      .catch((e) => {
        res.status(501).json(`Error->${e}`);
      });
  });

  router.get("/", validateToken, async (req, res) => {
    const taskData = await TaskModel.find();
    const username = req.user.username;
    const user = await UserModel.findOne({ userName: username });
    io.emit("userRole", user.userRole);
    res.json(taskData);
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const task = await TaskModel.findOne({ _id: id });
    const deletedTask = await TaskModel.deleteOne({ _id: id });
    io.emit("taskDeleted", task);
    res.json("Deleted SuccessFull");
  });

  router.put("/", async (req, res) => {
    const { id, newTask } = req.body;
    const date = new Date();
    const updatedTask = await TaskModel.updateOne(
      { _id: id },
      { $set: { task: newTask, lastModified: date.toLocaleString() } }
    );
    const task = await TaskModel.findOne({ _id: id });
    io.emit("taskUpdated", task);
    res.json("Updated SuccessFull");
  });
  return router;
};
