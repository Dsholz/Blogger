import React, { Component } from 'react'
import { firebaseAuthentication, firebaseDatabase } from '../firebase/firebase'
import AuthenticationForm from './AuthenticationForm'

class SignUpFlow extends Component {
  state = {
    errorCode: '',
    errorMessage: '',
    loading: false
  }

  createNewUser = (e, email, password, name) => {
    e.preventDefault()

    this.setState(() => ({
      errorCode: '',
      errorMessage: '',
      loading: true
    }))

    firebaseAuthentication.createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data)
        this.setState(() => ({
          loading: false
        }))

        firebaseDatabase.collection('users').add({
          name,
          email,
          photoUrl: '',
          posts: []
        }).then(data => {
          console.log(data)
        }).catch(error => {
          console.log(error)
        })
      })
      .catch(err => {
        console.log(err)
        if (err?.message && err?.code) {
          this.setState(() => ({
            errorCode: err.code,
            errorMessage: err.message,
            loading: false
          }))
        }
      })
  }

  render() {
    const { errorCode, errorMessage, loading } = this.state

    return (
      <div className="login">
        <div className='login__container'>
          <object type="image/svg+xml" data="reading-icon.svg" className="login__logo">
          </object>
        </div>
        <div className='login__container'>
          <h1 className='login__heading'>
            <span>read.</span>
            <span>create.</span>
            <span>be inspired.</span>
          </h1>

          <AuthenticationForm
            loading={loading}
            errorCode={errorCode}
            errorMessage={errorMessage}
            authenticateUser={this.createNewUser}
            signInWithProvider={this.signInWithProvider}
          />
        </div>
      </div>
    )
  }
}

export default SignUpFlow