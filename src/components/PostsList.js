import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { addPost } from '../store/actions/posts'
import { firebaseDatabase } from '../firebase/firebase'

class Postslist extends Component {
  state = {
    posts: {}
  }

  componentDidMount() {
    firebaseDatabase.collection("posts")
      .orderBy('postSince', 'desc')
      .onSnapshot(snapshot => {
        snapshot.docs.forEach(doc => {
          this.props.dispatch(addPost(doc.id, doc.data()))
        })
      });
  }

  render() {
    const { posts } = this.props
    console.log(posts)
    return (
      <div className='post-list'>
        <ul>
          {posts.map(postId => (
            <Post
              key={postId}
              postId={postId}
            />))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state ? Object.keys(state) : []
  }
}

export default connect(mapStateToProps)(Postslist)