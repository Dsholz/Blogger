import React, { Component, Fragment } from "react";
import Loader from "react-loader-spinner";
import { handleUserSignUp } from "../store/actions/user";
import { connect } from "react-redux";
import { generateRandomAvatar } from "../helpers";

export class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    loading: false,
    errorCode: "",
    errorMsg: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(() => ({
      [name]: value,
    }));
  };

  createNewUser = (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;
    const { dispatch } = this.props;
    const userData = {
      name,
      email,
      photoUrl: generateRandomAvatar(),
      posts: [],
    };

    this.setState(() => ({
      errorMsg: "",
      loading: true,
    }));

    dispatch(handleUserSignUp(userData, password)).catch((err) => {
      this.setState(() => ({
        errorCode: err.code,
        errorMsg: err.message,
        loading: false,
      }));
    });
  };

  render() {
    const { name, email, password, loading, errorCode, errorMsg } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.createNewUser} className="authentication">
          <div className="authentication__container">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="authentication__input"
              onChange={this.handleChange}
            />
          </div>
          <div className="authentication__container">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="authentication__input"
              onChange={this.handleChange}
            />
            {(errorCode === "auth/invalid-email" ||
              errorCode === "auth/email-already-in-use") && (
              <p className="authentication__error">{errorMsg}</p>
            )}
          </div>
          <div className="authentication__container">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="authentication__input"
              onChange={this.handleChange}
            />
            {errorCode === "auth/weak-password" && (
              <p className="authentication__error">{errorMsg}</p>
            )}
          </div>
          <button
            className="btn-auth btn-auth--1"
            disabled={!name || !email || !password}
          >
            {loading ? (
              <Loader
                type="ThreeDots"
                color="#485AF0"
                visible={loading}
                height={30}
                width={30}
              />
            ) : (
              "sign up"
            )}
          </button>
        </form>
      </Fragment>
    );
  }
}

export default connect()(SignUpForm);
