import React, { Component } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import { connect } from "react-redux";
import { addPost } from "../store/actions/posts";
import { firebaseDatabase } from "../firebase/firebase";

class Postslist extends Component {
  state = {
    posts: {},
  };

  componentDidMount() {
    firebaseDatabase
      .collection("posts")
      .orderBy("postSince", "desc")
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.props.dispatch(addPost(doc.id, doc.data()));
        });
      });
  }

  render() {
    const { posts } = this.props;

    return (
      <div className="post-list">
        <ul>
          {posts.map((postId) => (
            <Link key={postId} to={`/posts/${postId}`}>
              <Post postId={postId} />
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts: posts ? Object.keys(posts) : [],
  };
};

export default connect(mapStateToProps)(Postslist);
