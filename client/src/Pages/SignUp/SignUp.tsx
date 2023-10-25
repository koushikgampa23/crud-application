import * as React from "react";
import axios from "axios";
import { ErrorMessage, SuccessMessage } from "../../Components";
import classes from './SignUp.module.css';

export const SignUp = () => {
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [reenterPassword, setReenterPassword] = React.useState("");
  const [securityQuestion, setSequrityQuestion] = React.useState("");
  const [error, setError] = React.useState("");
  const [resMsg, setResMsg] = React.useState("");

  const register = () => {
    if (password === reenterPassword) {
      setError("");
      axios
        .post("http://localhost:3001/users", {
          userName: name,
          userRole: role,
          password: password,
          securityQuestion: securityQuestion,
        })
        .then((res) => {
          setResMsg(res.data);
          console.log(res.data);
        })
        .catch((e) => {
          setError(e.response.data.message);
        });
    } else {
      setError("Mismatch in password and reentered password");
    }
  };
  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <h1>Sign Up</h1>
        <input
          type="text"
          placeholder="Name.."
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Role..."
          onChange={(e) => {
            setRole(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Reenter Password"
          onChange={(e) => {
            setReenterPassword(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Security Question..."
          onChange={(e) => {
            setSequrityQuestion(e.target.value);
          }}
        />
        <div>
          <button onClick={register}>Register</button>
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
