import { Login } from "./Pages/Login/Login";
import { SignUp } from "./Pages/SignUp/SignUp";
import { Task } from "./Pages/Task/Task";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import classes from "./App.module.css";

function App() {
  const [tab, setTab] = React.useState(
    "/" + window.location.href.split("/").splice(-1)[0]
  );
  return (
    <div>
      <Router>
        <div className={classes.header}>
          <Link
            to="/"
            onClick={() => {
              setTab("/");
            }}
            className={tab === "/" ? classes.tabActive : classes.tab}
          >
            Home
          </Link>
          <Link
            to="/signup"
            onClick={() => {
              setTab("/signup");
            }}
            className={tab === "/signup" ? classes.tabActive : classes.tab}
          >
            SignUp
          </Link>
          <Link
            to="/login"
            onClick={() => {
              setTab("/login");
            }}
            className={tab === "/login" ? classes.tabActive : classes.tab}
          >
            Login
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Task />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
