import React, { Component } from 'react'
import { firebaseDatabase } from '../firebase/firebase'

class PostPreview extends Component {
  render() {
    const marked = require('marked')
    const { markdown, postTitle, postCover } = this.props

    return (
      <div className='post-preview'>
        <img
          className='post-preview__img'
          src={postCover}
          alt={'Post Cover'}
        />
        <div
          className='post-preview__container'
          dangerouslySetInnerHTML={{
            __html: `
            ${postTitle ? `<h1>${postTitle}</h1>` : ''}
            ${marked(markdown)}
          `}}
        ></div>
      </div>
    )
  }
}

export default PostPreview