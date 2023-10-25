import * as React from "react";
import axios from "axios";
import { ErrorMessage, SuccessMessage } from "../../Components";
import { task, tasks } from "../../types";
import { Card } from "./TaskCard/Card";
import classes from "./Task.module.css";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:3001");

export const Task = () => {
  const [task, setTask] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [resMsg, setResMsg] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [tasks, setTasks] = React.useState<task[]>([]);
  const [error, setError] = React.useState("");
  const [description, setDescripton] = React.useState("");
  const [role, setRole] = React.useState("");

  const addTask = () => {
    const date = new Date();
    const lastModified = date.toLocaleString();
    axios
      .post(
        "http://localhost:3001/task",
        {
          task: task,
          description: description,
          status: status,
          lastModified: lastModified,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        setResMsg(res.data);
        setErrorMsg("");
      })
      .catch((e) => {
        setErrorMsg(e.response.data);
        setResMsg("");
      });
  };
  React.useEffect(() => {
    axios
      .get("http://localhost:3001/task", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setTasks(res.data);
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  }, []);

  React.useEffect(() => {
    socket.on("taskAdded", (task) => {
      setTasks((prevTasks) => [...prevTasks, task]);
      toast.success("Task Added: " + task.task);
    });

    socket.on("taskDeleted", (deletedTask) => {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== deletedTask._id)
      );
      toast.success("Task Deleted SuccessFull: " + deletedTask.task);
    });

    socket.on("taskUpdated", (task) => {
      setTasks((prevState: tasks) => {
        const updatedTask = [...prevState];
        updatedTask[task._id] = {
          ...updatedTask[task._id],
          task: task.task,
        };
        return updatedTask;
      });
      toast.success("Task Updated SuccessFull: " + task.task);
    });

    socket.on("userRole", (role) => {
      setRole(role);
    });
  }, []);

  return (
    <div>
      <div className={classes.mainContainer}>
        <div className={classes.container}>
          <h1>Task Page</h1>
          <input
            type="text"
            placeholder="enter task"
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
          <textarea
            cols={40}
            rows={3}
            onChange={(e) => {
              setDescripton(e.target.value);
            }}
          ></textarea>
          <input
            type="text"
            placeholder="task status"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
          <div>
            <button onClick={addTask}>Add Task</button>
          </div>
          <SuccessMessage>{resMsg}</SuccessMessage>
          <ErrorMessage>{errorMsg}</ErrorMessage>
        </div>
      </div>
      <div>
        {tasks && <Card tasks={tasks} role={role}/>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
      <ToastContainer />
    </div>
  );
};
