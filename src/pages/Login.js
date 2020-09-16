import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import ProviderAuth from "../components/ProviderAuth";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="login__aside">
          <span>Are you a new user?</span>
          <Link to="/signup">Create account</Link>
        </div>
        <div className="login__container login__container--1">
          <object
            aria-label="Login Icon"
            type="image/svg+xml"
            data="assets/resources/welcome-icon.svg"
            className="login__logo"
          ></object>
        </div>
        <div className="login__container login__container--2">
          <h1 className="login__heading">
            <span>Hi,</span>
            <span>Welcome Back.</span>
          </h1>

          <LoginForm />

          <div className="authentication__other">
            <span>Or</span>
          </div>

          <ProviderAuth />
        </div>
      </div>
    );
  }
}

export default Login;
