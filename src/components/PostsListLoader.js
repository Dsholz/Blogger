import React, { Component, Fragment } from "react";
import Skeleton from "react-loading-skeleton";

export class PostsListLoader extends Component {
  render() {
    return (
      <Fragment>
        {Array(4)
          .fill()
          .map((_, index) => (
            <li key={index} className="post">
              <div className="post__container">
                <div className="post__avatar">
                  <Skeleton circle={true} height={50} width={50} />
                </div>
                <div className="post__info">
                  <Skeleton width={90} height={10} />

                  <Skeleton width={110} height={10} />
                </div>
              </div>
              <h2 className="post__title">
                <Skeleton />
              </h2>
            </li>
          ))}
      </Fragment>
    );
  }
}

export default PostsListLoader;
