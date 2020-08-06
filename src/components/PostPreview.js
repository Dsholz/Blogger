import React, { Component } from 'react'

class PostPreview extends Component {
  render() {
    const marked = require('marked')
    const { markdown, postTitle } = this.props

    return (
      <div className='post-preview'>
        <div
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