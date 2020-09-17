import React, { Component, Fragment } from "react";
import { firebaseDatabase } from "../firebase/firebase";
import Header from "../components/Header";
import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";

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
              <div className="post-content__img-container">
                {postCover ? (
                  <img
                    className="post-content__img"
                    src={postCover}
                    alt="Post Cover"
                  />
                ) : (
                  <Skeleton height={330} width={`100%`} />
                )}
              </div>
              <div>
                <h1 className="post-content__title">
                  {postTitle ? (
                    postTitle
                  ) : (
                    <Skeleton height={70} width={`90%`} />
                  )}
                </h1>
                <div className="post-content__container">
                  <span className="post-content__container--avatar">
                    {postAuthorUrl ? (
                      <img src={postAuthorUrl} alt="Author Avatar" />
                    ) : (
                      <Skeleton height={70} width={70} />
                    )}
                  </span>
                  {postAuthor ? (
                    <Fragment>
                      <span>{postAuthor}</span>
                      <span className="post-content__container--dot"></span>
                      <span>{postedCreated}</span>
                    </Fragment>
                  ) : (
                    <Skeleton width={200} height={15} />
                  )}
                </div>
                {postMarkdown ? (
                  <div
                    className="post-content__markdown"
                    dangerouslySetInnerHTML={{ __html: marked(postMarkdown) }}
                  ></div>
                ) : (
                  <Skeleton width={`100%`} height={500} />
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
