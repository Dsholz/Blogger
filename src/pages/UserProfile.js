import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Post from "../components/Post";
import Profile from "../components/Profile";

export class UserProfile extends Component {
  render() {
    const { user, posts } = this.props;
    const userPosts = posts.filter((post) => user.posts.includes(post));

    return (
      <Fragment>
        <Header />
        <div className="user-profile">
          <Profile />
          <h1 className="user-profile__heading">Posts</h1>
          <ul>
            {userPosts.length !== 0 ? (
              userPosts.map((postId) => (
                <Link key={postId} to={`/posts/${postId}`}>
                  <Post postId={postId} />
                </Link>
              ))
            ) : (
              <div>No Posts Available</div>
            )}
          </ul>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user, posts }) => ({
  posts: Object.keys(posts),
  user,
});

export default connect(mapStateToProps)(UserProfile);
