import React, { Component, Fragment } from "react";
import Header from "../components/Header";
import { firebaseAuthentication } from "../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";

export class PasswordReset extends Component {
  state = {
    email: "",
    loading: false,
  };

  handleChange = (e) => {
    const { value } = e.target;

    this.setState(() => ({ email: value }));
  };

  resetPassword = (e) => {
    e.preventDefault();

    this.setState(() => ({ loading: true }));

    const { email } = this.state;

    firebaseAuthentication
      .sendPasswordResetEmail(email)
      .then(() => {
        toast.success("Password Reset Link Sent ✔️");
        this.setState(() => ({ loading: false }));
        setTimeout(() => {
          this.props.history.replace("/login");
        }, 6000);
      })
      .catch((err) => {
        toast.error(`${err}`);
        this.setState(() => ({ loading: false }));
      });
  };

  render() {
    const { email, loading } = this.state;

    return (
      <Fragment>
        <Header hideNav />

        <div className="reset">
          <div className="reset__container">
            <h2>Reset Password.</h2>
            <p>
              Enter your registered email below to recieve password reset
              instructions.
            </p>
            <form onSubmit={this.resetPassword}>
              <input
                type="email"
                className="reset__input"
                placeholder="Enter E-mail"
                onChange={this.handleChange}
              />

              <button
                disabled={!email || loading}
                className="reset__button"
                type="submit"
              >
                {!loading ? "Send Email" : "Sending..."}
              </button>
            </form>
          </div>
        </div>
        <ToastContainer className="toast__font-size" position="bottom-right" />
      </Fragment>
    );
  }
}

export default PasswordReset;
