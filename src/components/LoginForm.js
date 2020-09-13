import React, { Component, Fragment } from "react";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { handleUserLogin } from "../store/actions/user";

export class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errorCode: "",
    errorMsg: "",
    loading: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(() => ({
      [name]: value,
    }));
  };

  login = (e, email, password) => {
    e.preventDefault();

    this.setState(() => ({
      errorMsg: "",
      loading: true,
    }));

    const { dispatch } = this.props;

    dispatch(handleUserLogin(email, password)).catch((err) => {
      this.setState(() => ({
        errorCode: err.code,
        errorMsg: err.message,
        loading: false,
      }));
    });
  };

  render() {
    const { email, password, loading, errorCode, errorMsg } = this.state;

    return (
      <Fragment>
        <form
          className="authentication"
          onSubmit={(e) => {
            this.login(e, email, password);
          }}
        >
          <div className="authentication__container">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="E-mail"
              className="authentication__input"
              onChange={this.handleChange}
            />
            {errorCode === "auth/user-not-found" && (
              <p className="authentication__error">{errorMsg}</p>
            )}
          </div>
          <div className="authentication__container">
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              className="authentication__input"
              onChange={this.handleChange}
            />
            {errorCode === "auth/wrong-password" && (
              <p className="authentication__error">{errorMsg}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn-auth btn-auth--1"
            disabled={!email || !password}
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
              "Login"
            )}
          </button>
        </form>
      </Fragment>
    );
  }
}

export default connect()(LoginForm);
