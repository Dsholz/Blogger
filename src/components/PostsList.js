import React, { Component } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import { connect } from "react-redux";

class Postslist extends Component {
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
