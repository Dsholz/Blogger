import React, { Component } from 'react'
import { firebaseAuthentication } from '../firebase/firebase'
import AuthenticationForm from './AuthenticationForm'

class LoginFlow extends Component {
  state = {
    errorCode: '',
    errorMessage: ''
  }

  createNewUser = (e) => {
    e.preventDefault()

    const { email, password } = this.state

    firebaseAuthentication.signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
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
            <span>Hi,</span>
            <span>Welcome Back</span>
          </h1>

          <AuthenticationForm
            errorCode={errorCode}
            errorMessage={errorMessage}
            createNewUser={this.createNewUser}
          />
        </div>
      </div>
    )
  }
}

export default LoginFlow