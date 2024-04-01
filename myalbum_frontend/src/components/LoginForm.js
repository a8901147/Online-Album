import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./LoginForm.module.scss";
import usernameIcon from "../assets/akar-icons_person.svg";
import passwordIcon from "../assets/carbon_password.svg";

import { useAuth } from "../AuthContext";

const LoginForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const { login } = useAuth();

  const submitHandler = (event) => {
    console.log("submitHandler");
    event.preventDefault();

    login(emailInputRef.current.value, passwordInputRef.current.value);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div>
        <img
          className={classes.icon}
          src={usernameIcon}
          alt="Username icon"
          htmlFor="email"
        ></img>
        <input
          className={classes.input}
          type="email"
          id="email"
          name="email"
          autoComplete="on"
          placeholder="Email"
          ref={emailInputRef}
          //required={!validUserContext.isLoggedIn}
        ></input>
      </div>

      <div>
        <img
          className={classes.icon}
          src={passwordIcon}
          alt="Password icon"
          htmlFor="user-password"
        ></img>
        <input
          className={classes.input}
          type="password"
          id="user-password"
          name="user-password"
          autoComplete="off"
          placeholder="Password"
          ref={passwordInputRef}
          //required={!validUserContext.isLoggedIn}
        ></input>
      </div>
      <button
        className={classes.loginBtn}
        //disabled={validUserContext.isLoggedIn}
      >
        Login
      </button>
      <button
        type="button"
        className={classes.loginBtn}
        onClick={() => navigate("/protected")}
      >
        Go to Protected page
      </button>
    </form>
  );
};

export default LoginForm;
