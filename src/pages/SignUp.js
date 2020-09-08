import React, { Component } from "react";
import ProviderAuth from "../components/ProviderAuth";
import SignUpForm from "../components/SignUpForm";

const SignUp = () => (
  <div className="login">
    <div className="login__container">
      <object
        type="image/svg+xml"
        data="assets/resources/reading-icon.svg"
        className="login__logo"
      ></object>
    </div>
    <div className="login__container">
      <h1 className="login__heading">
        <span>read.</span>
        <span>create.</span>
        <span>be inspired.</span>
      </h1>

      {/* <AuthenticationForm
            loading={loading}
            errorCode={errorCode}
            errorMessage={errorMessage}
            authenticateUser={this.createNewUser}
            signInWithProvider={this.signInWithProvider}
          /> */}

      <SignUpForm />

      <div className="authentication__other">
        <span>Or</span>
      </div>

      <ProviderAuth />
    </div>
  </div>
);

export default SignUp;
