import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({
  userAuthenticated,
  component: Component,
  ...componentProps
}) => {
  return userAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Route {...componentProps} component={Component} />
  );
};

const mapStateToProps = ({ user }) => ({
  userAuthenticated: user ? true : false,
});

export default connect(mapStateToProps)(PublicRoute);
