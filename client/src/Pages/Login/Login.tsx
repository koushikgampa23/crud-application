import * as React from "react";
import axios from "axios";
import { ErrorMessage, SuccessMessage } from "../../Components";
import classes from "./Login.module.css";

export const Login = () => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [resMsg, setResMsg] = React.useState("");

  const handleLogin = () => {
    axios
      .post("http://localhost:3001/login", {
        username: userName,
        password: password,
      })
      .then((res) => {
        setResMsg("Logged in Success");
        localStorage.setItem("accessToken", res.data);
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <h1>Login Page</h1>
        <input
          type="text"
          placeholder="UserName ..."
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password ..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <SuccessMessage>{resMsg}</SuccessMessage>
        )}
      </div>
    </div>
  );
};
