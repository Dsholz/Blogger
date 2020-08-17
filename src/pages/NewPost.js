import React, { Component } from 'react'
import PostEditor from '../components/PostEditor'
import PostPreview from '../components/PostPreview'
import { firebaseDatabase, firebase, storage } from '../firebase/firebase'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';

class NewPost extends Component {
  state = {
    postTitle: '',
    postCover: '',
    markdown: '',
    showPreview: false
  }

  handleChange = (e) => {
    const { name, value } = e.target

    this.setState(() => ({
      [name]: value
    }))
  }

  createPost = () => {
    const { postTitle, markdown, postCover } = this.state

    firebaseDatabase.collection('posts').add({
      postTitle,
      postMarkdown: markdown,
      postCover,
      postedCreated: moment().format('MMM D'),
      postSince: moment().format('x'),
      postAuthor: 'Daniel Soladoye'
    }).then((docRef) => {
      firebaseDatabase.collection('users').doc('GTg47A8G5gdCA8pU9PIl').update({
        posts: firebase.firestore.FieldValue.arrayUnion(docRef.id)
      }).then(() => {
        console.log('success')
      }).catch(() => {
        console.log('Error')
      })
    }).catch(error => {
      console.log(error)
    })
  }

  togglePreview = () => {
    this.setState(prevState => ({
      showPreview: !prevState.showPreview
    }))
  }

  addCover = (e) => {
    const storageReference = storage.ref().child(`Cover Photos/${uuidv4()}`)

    storageReference.put(e.target.files[0]).then(() => {
      storageReference.getDownloadURL().then((url) => {
        this.setState(() => ({
          postCover: url,
        }))
      }).catch(() => {
        console.log('Url Error')
      })
    }).catch(err => {
      console.log('Upload Error')
    })
  }

  render() {
    const { markdown, postTitle, showPreview, postCover } = this.state

    return (
      <div className='post-container'>
        <button
          className='post-container__button post-container__button--right'
          onClick={this.togglePreview}
        >{showPreview ? 'Edit Post' : 'Show Preview'}
        </button>
        {!showPreview ? <PostEditor
          markdown={markdown}
          addCover={this.addCover}
          postTitle={postTitle}
          handleChange={this.handleChange}
        />
          : <PostPreview
            markdown={markdown}
            postCover={postCover}
            postTitle={postTitle}
          />}
        <button
          onClick={this.createPost}
          className='post-container__button post-container__button--left'>
          Publish Post
          </button>
      </div>
    )
  }
}

export default NewPost