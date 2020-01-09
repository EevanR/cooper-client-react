import React from "react";
import { saveUser } from "../modules/userRegister";

const RegisterForm = ({ submitFormHandler }) => {
  return (
    <form onSubmit={submitFormHandler} id="login-form">
      <label>Email</label>
      <input name="email" type="email" id="email"></input>

      <label>Password</label>
      <input name="password" type="password" id="password"></input>
      <button id="submit" onClick={() => saveUser()}>Register</button>
    </form>
  );
};

export default RegisterForm;