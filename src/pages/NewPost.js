import React, { Component } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { IconContext } from "react-icons";
import PostEditor from "../components/PostEditor";
import PostPreview from "../components/PostPreview";
import {
  firebaseDatabase,
  firebase,
  firebaseStorage,
} from "../firebase/firebase";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

class NewPost extends Component {
  state = {
    postTitle: "",
    postCover: "",
    markdown: "",
    showPreview: false,
    loadingCover: false,
    loading: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(() => ({
      [name]: value,
    }));
  };

  createPost = (e) => {
    e.preventDefault();

    const { postTitle, markdown, postCover } = this.state;
    const { name, photoUrl, id } = this.props.user;
    const postDetails = { postTitle, postCover, postMarkdown: markdown };

    this.setState(() => ({ loading: true }));

    firebaseDatabase
      .collection("posts")
      .add({
        ...postDetails,
        postId: uuidv4(),
        postedCreated: moment().format("MMM D"),
        postSince: moment().format("x"),
        postAuthor: name,
        postAuthorUrl: photoUrl,
        postAuthorId: id,
      })
      .then(async (docRef) => {
        await firebaseDatabase
          .collection("users")
          .doc(id)
          .update({
            posts: firebase.firestore.FieldValue.arrayUnion(docRef.id),
          });

        this.setState(() => ({ loading: false }));

        toast.success("Post Created Successfully");
      });
  };

  togglePreview = () => {
    this.setState((prevState) => ({
      showPreview: !prevState.showPreview,
    }));
  };

  addCover = (e) => {
    const storageReference = firebaseStorage
      .ref()
      .child(`Cover Photos/${uuidv4()}`);

    this.setState(() => ({ loadingCover: true }));

    storageReference.put(e.target.files[0]).then(async () => {
      const coverUrl = await storageReference.getDownloadURL();

      this.setState(() => ({
        loadingCover: false,
        postCover: coverUrl,
      }));
    });
  };

  render() {
    const {
      markdown,
      postTitle,
      showPreview,
      postCover,
      loadingCover,
      loading,
    } = this.state;

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
        <form>
          {!showPreview ? (
            <PostEditor
              markdown={markdown}
              addCover={this.addCover}
              coverExists={postCover}
              loadingCover={loadingCover}
              removeCover={() => this.setState(() => ({ postCover: "" }))}
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
            type="submit"
            disabled={!postTitle || !markdown}
            onClick={this.createPost}
            className="post-container__button post-container__button--left"
          >
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </form>
        <ToastContainer className="toast__font-size" position="bottom-right" />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(NewPost);
