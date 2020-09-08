import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  userAuthenticated,
  component: Component,
  ...componentProps
}) => {
  return userAuthenticated ? (
    <Route {...componentProps} component={Component} />
  ) : (
    <Redirect to="/signup" />
  );
};

const mapStateToProps = ({ user }) => ({
  userAuthenticated: user ? true : false,
});

export default connect(mapStateToProps)(PrivateRoute);
