import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./routers/PrivateRoute";
import PublicRoute from "./routers/PublicRoute";
import PostContent from "./pages/PostContent";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomeView from "./pages/HomeView";
import NewPost from "./pages/NewPost";
import "./sass/App.scss";
import { connect } from "react-redux";
import { firebaseAuthentication, firebaseDatabase } from "./firebase/firebase";
import { addUser } from "./store/actions/user";
import UserProfile from "./pages/UserProfile";

class App extends Component {
  componentDidMount() {
    const { storedUser, dispatch } = this.props;

    firebaseAuthentication.onAuthStateChanged(async (user) => {
      if (user && !storedUser) {
        const userData = await firebaseDatabase
          .collection("users")
          .doc(user.uid)
          .get();

        dispatch(addUser(userData.data()));
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={HomeView} />
            <PrivateRoute path="/new-post" component={NewPost} />
            <PrivateRoute path="/profile" component={UserProfile} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/signup" component={SignUp} />
            <Route path="/posts/:id" component={PostContent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  storedUser: user,
});

export default connect(mapStateToProps)(App);
