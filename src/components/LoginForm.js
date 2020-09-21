import React, { Component, Fragment } from "react";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { handleUserLogin } from "../store/actions/user";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

export class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errorCode: "",
    errorMsg: "",
    loading: false,
    passwordShown: false,
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

  togglePasswordVisibility = () => {
    const inputElement = document.querySelector(`#password`);

    this.setState((prevstate) => ({ passwordShown: !prevstate.passwordShown }));

    if (inputElement?.type === "password") {
      inputElement.type = "text";
    } else if (inputElement?.type === "text") {
      inputElement.type = "password";
    }
  };

  render() {
    const {
      email,
      password,
      loading,
      errorCode,
      errorMsg,
      passwordShown,
    } = this.state;

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
            <div>
              <input
                type="password"
                name="password"
                value={password}
                id="password"
                placeholder="Password"
                className="authentication__input"
                onChange={this.handleChange}
              />
              <IconContext.Provider
                value={{
                  className: "authentication__input-icon",
                }}
              >
                {passwordShown ? (
                  <AiFillEyeInvisible
                    onClick={() => this.togglePasswordVisibility()}
                  />
                ) : (
                  <AiFillEye onClick={() => this.togglePasswordVisibility()} />
                )}
              </IconContext.Provider>
            </div>
            {errorCode === "auth/wrong-password" && (
              <p className="authentication__error">{errorMsg}</p>
            )}
          </div>

          <Link to="/reset" className="authentication__reset">
            <p>Forgot Password?</p>
          </Link>

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
