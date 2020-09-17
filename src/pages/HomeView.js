import React, { Fragment } from "react";
import { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import PostsList from "../components/PostsList";
import { setInitialPosts } from "../store/actions/posts";

class HomeView extends Component {
  componentDidMount() {
    this.props.dispatch(setInitialPosts());
  }

  render() {
    return (
      <Fragment>
        <Header />
        <PostsList />
      </Fragment>
    );
  }
}

export default connect()(HomeView);
