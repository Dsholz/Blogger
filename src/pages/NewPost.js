import React, { Component } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { IconContext } from "react-icons";
import PostEditor from "../components/PostEditor";
import PostPreview from "../components/PostPreview";
import { firebaseDatabase, firebase, storage } from "../firebase/firebase";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";

class NewPost extends Component {
  state = {
    postTitle: "",
    postCover: "",
    markdown: "",
    showPreview: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(() => ({
      [name]: value,
    }));
  };

  createPost = () => {
    const { postTitle, markdown, postCover } = this.state;
    const { name, photoUrl, id } = this.props.user;
    const postDetails = { postTitle, postCover, postMarkdown: markdown };

    firebaseDatabase
      .collection("posts")
      .add({
        ...postDetails,
        postId: uuidv4(),
        postedCreated: moment().format("MMM D"),
        postSince: moment().format("x"),
        postAuthor: name,
        postAuthorUrl: photoUrl,
      })
      .then(async (docRef) => {
        await firebaseDatabase
          .collection("users")
          .doc(id)
          .update({
            posts: firebase.firestore.FieldValue.arrayUnion(docRef.id),
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  togglePreview = () => {
    this.setState((prevState) => ({
      showPreview: !prevState.showPreview,
    }));
  };

  addCover = (e) => {
    const storageReference = storage.ref().child(`Cover Photos/${uuidv4()}`);

    storageReference
      .put(e.target.files[0])
      .then(async () => {
        const coverUrl = await storageReference.getDownloadURL();

        this.setState(() => ({
          postCover: coverUrl,
        }));
      })
      .catch((err) => {
        console.log("Upload Error");
      });
  };

  render() {
    const { markdown, postTitle, showPreview, postCover } = this.state;

    return (
      <div className="post-container">
        <button
          className="post-container__close-btn"
          onClick={() => this.props.history.goBack()}
        >
          <IconContext.Provider
            value={{ className: "post-container__close-icon" }}
          >
            <MdKeyboardBackspace />
          </IconContext.Provider>
        </button>

        <button
          className="post-container__button post-container__button--right"
          onClick={this.togglePreview}
        >
          {showPreview ? "Edit Post" : "Show Preview"}
        </button>
        {!showPreview ? (
          <PostEditor
            markdown={markdown}
            addCover={this.addCover}
            postTitle={postTitle}
            handleChange={this.handleChange}
          />
        ) : (
          <PostPreview
            markdown={markdown}
            postCover={postCover}
            postTitle={postTitle}
          />
        )}
        <button
          onClick={this.createPost}
          className="post-container__button post-container__button--left"
        >
          Publish Post
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(NewPost);
