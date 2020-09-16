import React, { Component, Fragment } from "react";
import { firebaseDatabase } from "../firebase/firebase";
import Header from "../components/Header";
import { connect } from "react-redux";

class PostContent extends Component {
  state = {
    post: {},
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(this.props.match.params);
    firebaseDatabase
      .collection("posts")
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc.data());
        this.setState(() => ({
          post: doc.data(),
        }));
      })
      .catch(() => {
        console.log("Error");
      });
  }

  render() {
    const marked = require("marked");
    const { post } = this.props;
    const {
      postCover,
      postAuthor,
      postAuthorUrl,
      postTitle,
      postMarkdown,
      postedCreated,
    } = this.props.post;

    return (
      <Fragment>
        <Header />
        <div className="post-content-container">
          {post && (
            <article className="post-content">
              <img
                className="post-content__img"
                src={postCover}
                alt="Post Cover"
              />
              <div>
                <h1 className="post-content__title">{postTitle}</h1>
                <div className="post-content__container">
                  <span className="post-content__container--avatar">
                    <img src={postAuthorUrl} alt="Author Avatar" />
                  </span>
                  <span>{postAuthor}</span>
                  <span className="post-content__container--dot"></span>
                  <span>{postedCreated}</span>
                </div>
                {postMarkdown && (
                  <div
                    className="post-content__markdown"
                    dangerouslySetInnerHTML={{ __html: marked(postMarkdown) }}
                  ></div>
                )}
              </div>
            </article>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ posts }, props) => {
  const { id } = props.match.params;
  const post = posts ? posts[id] : [];
  return {
    post,
  };
};

export default connect(mapStateToProps)(PostContent);
