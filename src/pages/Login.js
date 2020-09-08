import React, { Component } from "react";
import { firebaseAuthentication } from "../firebase/firebase";
import AuthenticationForm from "../components/AuthenticationForm";

class Login extends Component {
  state = {
    errorCode: "",
    errorMessage: "",
    loading: false,
  };

  loginUser = (e, email, password) => {
    e.preventDefault();

    this.setState(() => ({
      errorCode: "",
      errorMessage: "",
      loading: true,
    }));

    firebaseAuthentication
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        this.setState(() => ({
          loading: false,
        }));
      })
      .catch((err) => {
        console.log(err);
        if (err?.message && err?.code) {
          this.setState(() => ({
            errorCode: err.code,
            errorMessage: err.message,
            loading: false,
          }));
        }
      });
  };

  render() {
    const { errorCode, errorMessage, loading } = this.state;

    return (
      <div className="login">
        <div className="login__container">
          <object
            type="image/svg+xml"
            data="assets/resources/welcome-icon.svg"
            className="login__logo"
          ></object>
        </div>
        <div className="login__container">
          <h1 className="login__heading">
            <span>Hi,</span>
            <span>Welcome Back.</span>
          </h1>

          <AuthenticationForm
            errorCode={errorCode}
            errorMessage={errorMessage}
            authenticateUser={this.loginUser}
            loading={loading}
          />
        </div>
      </div>
    );
  }
}

export default Login;
