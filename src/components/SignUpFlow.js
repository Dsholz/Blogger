import React, { Component } from 'react'
import { firebaseAuthentication } from '../firebase/firebase'
import AuthenticationForm from './AuthenticationForm'

class SignUpFlow extends Component {
  state = {
    errorCode: '',
    errorMessage: ''
  }

  createNewUser = (e, email, password) => {
    e.preventDefault()

    this.setState(() => ({
      errorCode: '',
      errorMessage: ''
    }))

    firebaseAuthentication.createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
        if (err?.message && err?.code) {
          this.setState(() => ({
            errorCode: err.code,
            errorMessage: err.message
          }))
        }
      })
  }

  render() {
    const { errorCode, errorMessage } = this.state

    return (
      <div className="login">
        <div className='login__container'>
          <object type="image/svg+xml" data="reading-icon.svg" className="login__logo">
          </object>
        </div>
        <div className='login__container'>
          <h1 className='login__heading'>
            <span>Read.</span>
            <span>Create.</span>
            <span>Get Answers.</span>
          </h1>

          <AuthenticationForm
            errorCode={errorCode}
            errorMessage={errorMessage}
            createNewUser={this.createNewUser}
            signInWithProvider={this.signInWithProvider}
          />
        </div>
      </div>
    )
  }
}

export default SignUpFlow