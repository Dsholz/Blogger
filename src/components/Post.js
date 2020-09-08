import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";

class Post extends Component {
  render() {
    const { postTitle, postAuthor, postedCreated, postSince } = this.props.post;

    return (
      <li className="post">
        <div className="post__container">
          <div className="post__avatar">
            <img
              className=""
              src="https://api.adorable.io/avatars/152/hhhh.png"
              alt="Author Avatar"
            />
          </div>
          <div className="post__info">
            <span>{postAuthor}</span>
            <span>{`${postedCreated} (${moment(
              Number(postSince)
            ).fromNow()})`}</span>
          </div>
        </div>
        <h2 className="post__title">{postTitle}</h2>
      </li>
    );
  }
}

const mapStateToProps = ({ posts }, { postId }) => {
  const post = posts[postId];

  return {
    post,
  };
};

export default connect(mapStateToProps)(Post);
