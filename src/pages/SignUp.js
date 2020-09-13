import React from "react";
import { Link } from "react-router-dom";
import ProviderAuth from "../components/ProviderAuth";
import SignUpForm from "../components/SignUpForm";

const SignUp = () => (
  <div className="login">
    <div className="login__aside">
      <span>Already have an account?</span>
      <Link to="/login">Login</Link>
    </div>
    <div className="login__container">
      <object
        aria-label="SignUp Icon"
        type="image/svg+xml"
        data="assets/resources/reading-icon.svg"
        className="login__logo"
      ></object>
    </div>
    <div className="login__container">
      <h1 className="login__heading">
        <span>read &.</span>
        <span>be inspired.</span>
      </h1>

      <SignUpForm />

      <div className="authentication__other">
        <span>Or</span>
      </div>

      <ProviderAuth />
    </div>
  </div>
);

export default SignUp;
