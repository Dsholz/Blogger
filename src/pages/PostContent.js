import React, { Component, Fragment } from 'react'
import { firebaseDatabase } from '../firebase/firebase'
import Header from '../components/Header'

class PostContent extends Component {
  state = {
    post: {}
  }

  componentDidMount() {
    firebaseDatabase.collection('posts').doc('KwFfU6h1rcNJA51q4HKw').get()
      .then((doc) => {
        console.log(doc.data())
        this.setState(() => ({
          post: doc.data()
        }))
      })
      .catch(() => {
        console.log('Error')
      })
  }

  render() {
    const marked = require('marked')
    const { post } = this.state
    const { postCover, postAuthor, postTitle, postMarkdown, postedCreated } = this.state.post
    console.log(postMarkdown)

    return (
      <Fragment>
        <Header />
        <div className='post-content-container'>
          {Object.keys(post).length !== 0 && <article className='post-content'>
            <img className='post-content__img' src={postCover} alt='Post Cover' />
            <div>
              <h1 className='post-content__title'>{postTitle}</h1>
              <div className='post-content__container'>
                <span className='post-content__container--avatar'>
                  <img src={postCover} alt='Author Avatar' />
                </span>
                <span>{postAuthor}</span>
                <span className='post-content__container--dot'></span>
                <span>{postedCreated}</span>
              </div>
              {postMarkdown && <div
                className='post-content__markdown'
                dangerouslySetInnerHTML={{ __html: marked(postMarkdown) }}
              ></div>}
            </div>
          </article>}
        </div>
      </Fragment>
    )
  }
}

export default PostContent