import React, { Component, Fragment } from "react";
import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";
import { DiGithubBadge } from "react-icons/di";
import {
  firebaseAuthentication,
  GoogleProvider,
  GitHubProvider,
} from "../firebase/firebase";

export class ProviderAuth extends Component {
  signInWithProvider = (provider) => {
    firebaseAuthentication
      .signInWithPopup(provider)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Fragment>
        <button
          className="btn-auth btn-auth--2"
          onClick={() => {
            this.signInWithProvider(GoogleProvider);
          }}
        >
          <IconContext.Provider value={{ className: "btn-auth__icon" }}>
            <FcGoogle />
          </IconContext.Provider>
          Sign in with Google
        </button>

        <button
          className="btn-auth btn-auth--3"
          onClick={() => {
            this.signInWithProvider(GitHubProvider);
          }}
        >
          <IconContext.Provider value={{ className: "btn-auth__icon" }}>
            <DiGithubBadge />
          </IconContext.Provider>
          Sign in with GitHub
        </button>
      </Fragment>
    );
  }
}

export default ProviderAuth;
