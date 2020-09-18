import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseAuthentication, firebaseDatabase } from "../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiImageAddLine } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IconContext } from "react-icons";
import { withRouter } from "react-router-dom";
import { removeUser } from "../store/actions/user";
import { getImageUrl } from "../helpers";

export class Profile extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    rPassword: "",
    passwordShown: false,
    rPasswordShown: false,
    photoUrl: "",
    loading: false,
    editable: false,
  };

  componentDidMount() {
    const { name, email, photoUrl } = this.props.user;

    this.setState(() => ({ name, email, photoUrl, currentEmail: email }));
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(() => ({
      [name]: value,
    }));
  };

  uploadAvatar = (e) => {
    const file = e.target.files[0];
    getImageUrl(file).then((photoUrl) => this.setState(() => ({ photoUrl })));
  };

  updateUserProfile = (e) => {
    e.preventDefault();
    const { name, email, password, rPassword, photoUrl } = this.state;
    const { id, posts } = this.props.user;
    const userData = { id, name, email, photoUrl, posts };
    const currentUser = firebaseAuthentication.currentUser;

    this.setState(() => ({ loading: true }));

    currentUser
      .updateEmail(email)
      .then(async () => {
        if (password && rPassword) {
          await currentUser.updatePassword(password);
        }
      })
      .then(async () => {
        await currentUser.updateProfile({
          displayName: name,
          photoURL: photoUrl,
        });
        await firebaseDatabase.collection("users").doc(id).set(userData);

        toast.success("Upadate Successful");
        this.setState(() => ({ loading: false }));
      })
      .catch((err) => {
        setTimeout(() => {
          if (err.code === "auth/requires-recent-login") {
            this.props.dispatch(removeUser());
          }
        }, 5500);
        toast.error(`Error : ${err.message}`);
        this.setState(() => ({ loading: false }));
      });
  };

  togglePasswordVisibility = (id) => {
    const inputElement = document.querySelector(`#${id}`);

    this.setState((prevstate) => ({ [id]: !prevstate[id] }));

    if (inputElement?.type === "password") {
      inputElement.type = "text";
    } else if (inputElement?.type === "text") {
      inputElement.type = "password";
    }
  };

  render() {
    const {
      name,
      email,
      password,
      rPassword,
      passwordShown,
      rPasswordShown,
      photoUrl,
      loading,
      editable,
    } = this.state;

    return (
      <div className="profile">
        <IconContext.Provider
          value={{
            color: editable ? "#b4b4b4" : "#d4d4d4",
            className: "profile__edit",
          }}
        >
          <FaUserEdit
            onClick={() =>
              this.setState((prev) => ({ editable: !prev.editable }))
            }
          />
        </IconContext.Provider>

        <div className="profile__img-container">
          <img className="profile__img" src={photoUrl} alt="User Avatar" />
          <input
            type="file"
            accept="image/*"
            name="uploadImage"
            id="uploadImage"
            disabled={!editable}
            onChange={this.uploadAvatar}
          />
          <label htmlFor="uploadImage">
            <IconContext.Provider value={{ className: "profile__icon" }}>
              <RiImageAddLine />
            </IconContext.Provider>
          </label>
        </div>
        <form onSubmit={this.updateUserProfile}>
          <div className="profile__form-container">
            <input
              name="name"
              value={name}
              className="profile__input"
              placeholder="Name"
              disabled={!editable}
              onChange={this.handleChange}
              type="text"
            />
            <input
              name="email"
              value={email}
              className="profile__input"
              placeholder="E-mail"
              disabled={!editable}
              onChange={this.handleChange}
              type="email"
            />
          </div>
          <div className="profile__form-container">
            <div className="profile__input-container">
              <input
                name="password"
                value={password}
                id="passwordShown"
                className="profile__input"
                placeholder="New Password"
                disabled={!editable}
                onChange={this.handleChange}
                type="password"
              />
              <IconContext.Provider
                value={{
                  color: editable ? "#4e4e4e" : "#e0e0e0",
                  className: "profile__input-icon",
                }}
              >
                {passwordShown ? (
                  <AiFillEyeInvisible
                    onClick={() =>
                      this.togglePasswordVisibility("passwordShown")
                    }
                  />
                ) : (
                  <AiFillEye
                    onClick={() =>
                      this.togglePasswordVisibility("passwordShown")
                    }
                  />
                )}
              </IconContext.Provider>
            </div>
            <div className="profile__input-container">
              <input
                name="rPassword"
                value={rPassword}
                id="rPasswordShown"
                className="profile__input"
                placeholder="Repeat Password"
                disabled={!editable}
                onChange={this.handleChange}
                type="password"
              />
              <IconContext.Provider
                value={{
                  color: editable ? "#4e4e4e" : "#e0e0e0",
                  className: "profile__input-icon",
                }}
              >
                {rPasswordShown ? (
                  <AiFillEyeInvisible
                    onClick={() =>
                      this.togglePasswordVisibility("rPasswordShown")
                    }
                  />
                ) : (
                  <AiFillEye
                    onClick={() =>
                      this.togglePasswordVisibility("rPasswordShown")
                    }
                  />
                )}
              </IconContext.Provider>
            </div>
          </div>
          {editable && (
            <button
              className="profile__btn"
              disabled={
                !name ||
                !email ||
                !photoUrl ||
                password !== rPassword ||
                loading
              }
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          )}
        </form>
        <ToastContainer className="toast__font-size" position="bottom-right" />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default withRouter(connect(mapStateToProps)(Profile));
