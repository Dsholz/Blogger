import React, { Fragment } from "react";
import { Component } from "react";
import Header from "../components/Header";
import PostsList from "../components/PostsList";

class HomeView extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <PostsList />
      </Fragment>
    );
  }
}

export default HomeView;
