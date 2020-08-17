import React, { Component, Fragment } from 'react'
import { storage } from '../firebase/firebase'
import { IconContext } from 'react-icons'
import { RiFileCopy2Line } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid';
import Loader from 'react-loader-spinner'

class NewPost extends Component {
  state = {
    postImage: '',
    uploadFinished: true
  }

  handleChange = (e) => {
    const storageReference = storage.ref().child(`Post Images/${uuidv4()}`)

    storageReference.put(e.target.files[0]).on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

      this.setState(() => ({
        uploadFinished: progress !== 100 ? false : true
      }))
    })

    storageReference.put(e.target.files[0]).then(() => {
      storageReference.getDownloadURL().then((url) => {
        this.setState(() => ({
          postImage: url,
          copied: false
        }))
      }).catch(() => {
        console.log('Url Error')
      })
    }).catch(err => {
      console.log('Upload Error')
    })
  }

  copyUrl = () => {
    const urlElement = document.querySelector('#imageUrl')

    urlElement.select()
    document.execCommand('copy')

    this.setState(() => ({
      copied: true
    }))
  }

  render() {
    const { postImage, uploadFinished, copied } = this.state
    const { handleChange: updateContent, markdown, postTitle, addCover } = this.props

    return (
      <div className='new-post'>
        <input
          type='file'
          accept="image/*"
          onChange={addCover}
          id='postCover'
          name='postCover'
          className='new-post__upload'
        />
        <label
          htmlFor='postCover'
          className='new-post__label'
        >Add Cover</label>
        <input
          type='text'
          name='postTitle'
          id='postTitle'
          className='new-post__input'
          placeholder='New post title here...'
          value={postTitle}
          onChange={updateContent}
        />
        <input
          type='file'
          accept="image/*"
          onChange={this.handleChange}
          id='postImage'
          name='postImage'
          className='new-post__upload'
        />
        <div className='new-post__container'>
          <label
            className='new-post__label'
            htmlFor='postImage'>
            {uploadFinished ? 'Upload Image'
              : <Fragment>
                <IconContext.Provider value={{ className: 'new-post__label--icon' }}>
                  <Loader
                    type="Oval"
                    color="#858585"
                    width={12}
                    height={12}
                  />
                </IconContext.Provider>
                <span>uploading</span>
              </Fragment>}
          </label>
          {(postImage && uploadFinished) && <Fragment>
            <input
              id='imageUrl'
              readOnly={true}
              value={`![Image Text](${postImage})`} />
            <IconContext.Provider value={{ className: 'new-post__icon' }}>
              <RiFileCopy2Line onClick={this.copyUrl} color={copied ? '008232' : 'black'} size={25} />
            </IconContext.Provider>
          </Fragment>}
        </div>
        <textarea
          name='markdown'
          className='new-post__textarea'
          placeholder='Write your post content here...'
          value={markdown}
          onChange={updateContent}
        ></textarea>
      </div>
    )
  }
}

export default NewPost