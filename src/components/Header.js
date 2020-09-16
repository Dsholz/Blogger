import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseAuthentication } from "../firebase/firebase";
import { removeUser } from "../store/actions/user";

const Header = (props) => {
  const logout = () => {
    firebaseAuthentication.signOut();

    props.dispatch(removeUser());
  };

  return (
    <header className="header">
      <Link to="/">
        <div className="header__icon">
          <span>blogger</span>
        </div>
      </Link>
      <nav className="header__nav">
        <ul>
          <Link to="/new-post">
            <li className="header__nav--item btn-create">create post</li>
          </Link>
          {props.user && (
            <Fragment>
              <Link to="/profile">
                <li className="header__nav--item">profile</li>
              </Link>
              <li onClick={logout} className="header__nav--item">
                logout
              </li>
            </Fragment>
          )}
          {!props.user && (
            <Link to="/login">
              <li className="header__nav--item">Login</li>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(Header);
