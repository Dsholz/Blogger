import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

class Post extends Component {
  render() {
    const {
      postTitle,
      postAuthor,
      postedCreated,
      postSince,
      postAuthorUrl,
      postAuthorEmail,
    } = this.props.post;
    const { user } = this.props;

    return (
      <li className="post">
        <div className="post__container">
          <div className="post__avatar">
            <img className="" src={postAuthorUrl} alt="Author Avatar" />
          </div>
          <div className="post__info">
            <span>{user?.email === postAuthorEmail ? "You" : postAuthor}</span>
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

const mapStateToProps = ({ posts, user }, { postId }) => {
  const post = posts[postId];

  return {
    user,
    post,
  };
};

export default connect(mapStateToProps)(Post);
