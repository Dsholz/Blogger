import React from "react";

function PostNotFound() {
  return (
    <div className="post-not-found">
      <object
        aria-label="Login Icon"
        type="image/svg+xml"
        data="/assets/resources/post-not-found.svg"
        className="post-not-found__icon"
      ></object>
      <span>The post you're looking for does not exist.</span>
    </div>
  );
}

export default PostNotFound;
