import React, { Component, Fragment } from "react";
import Header from "../components/Header";

export class PageNotFound extends Component {
  render() {
    return (
      <Fragment>
        <Header hideNav />
        <div className="not-found">
          <object
            aria-label="Login Icon"
            type="image/svg+xml"
            data="/assets/resources/not-found.svg"
            className="not-found__icon"
          ></object>
          <span>The page you're looking for was not found.</span>
          <button onClick={() => this.props.history.push("/")}>
            let's go home
          </button>
        </div>
      </Fragment>
    );
  }
}

export default PageNotFound;
