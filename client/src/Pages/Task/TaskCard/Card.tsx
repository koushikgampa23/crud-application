import axios from "axios";
import { tasks } from "../../../types";
import { task } from "../../../types";
import classes from "./Card.module.css";
import * as React from "react";

interface Props {
  tasks: tasks;
  role: String;
}

export const Card = ({ tasks, role }: Props) => {
  const [edit, setEdit] = React.useState(false);
  const [editElement, setEditElement] = React.useState(0);
  const [newTask, setNewTask] = React.useState("");

  const deleteTask = (id: Number) => {
    axios
      .delete(`http://localhost:3001/task/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const updateTask = (id: Number) => {
    axios
      .put("http://localhost:3001/task", {
        id: id,
        newTask: newTask,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className={classes.mainContainer}>
      <table className={classes.tableStyle}>
        <thead>
          <tr>
            <th>Task</th>
            <th>Task Description</th>
            <th>Task Status</th>
            <th>LastModified</th>
            {role === "admin" && <th>Features</th>}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: task, key) => {
            return (
              <tr key={key} className={classes.container}>
                <td>
                  {edit && editElement === key && task ? (
                    <input
                      type="text"
                      defaultValue={task.task}
                      onChange={(e) => {
                        setNewTask(e.target.value);
                      }}
                    />
                  ) : (
                    task.task
                  )}
                </td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.lastModified}</td>
                {role === "admin" && (
                  <td>
                    <button
                      onClick={() => {
                        setEdit(!edit);
                        setEditElement(key);
                      }}
                    >
                      edit
                    </button>
                    <button
                      onClick={() => {
                        setEdit(!edit);
                        updateTask(task._id);
                      }}
                    >
                      Update Task
                    </button>
                    <button
                      onClick={() => {
                        deleteTask(task._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
