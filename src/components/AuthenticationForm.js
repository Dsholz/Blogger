import React, { Component, Fragment } from 'react'
import { IconContext } from 'react-icons'
import { FcGoogle } from 'react-icons/fc'
import { DiGithubBadge } from 'react-icons/di'
import { firebaseAuthentication, GoogleProvider, GitHubProvider } from '../firebase/firebase'

class AuthenticationForm extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    const { type: name, value } = e.target

    this.setState(() => ({
      [name]: value,
    }))
  }

  signInWithProvider = (provider) => {
    firebaseAuthentication.signInWithPopup(provider)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { email, password } = this.state
    const { errorCode, errorMessage, createNewUser } = this.props

    return (
      <Fragment>
        <form
          className='authentication'
          onSubmit={(e) => { createNewUser(e, email, password) }}>
          <div className='authentication__container'>
            <input
              type='email'
              value={email}
              placeholder='E-mail'
              className='authentication__input'
              onChange={this.handleChange}
            />
            {errorCode === 'auth/invalid-email' && <p className='authentication__error'>{errorMessage}</p>}
            {errorCode === 'auth/email-already-in-use' && <p className='authentication__error'>{errorMessage}</p>}
          </div>
          <div className='authentication__container'>
            <input
              type='password'
              value={password}
              placeholder='Password'
              className='authentication__input'
              onChange={this.handleChange}
            />
            {errorCode === 'auth/weak-password' && <p className='authentication__error'>{errorMessage}</p>}
            {errorCode === 'auth/wrong-password' && <p className='authentication__error'>{errorMessage}</p>}
          </div>
          <button className='btn-auth btn-auth--1'
            disabled={!email || !password}>
            Sign in</button>
        </form>

        <div className='authentication__other'>
          <span>Or</span>
        </div>

        <button className='btn-auth btn-auth--2'
          onClick={() => { this.signInWithProvider(GoogleProvider) }}>
          <IconContext.Provider value={{ className: 'btn-auth__icon' }}>
            <FcGoogle />
          </IconContext.Provider>
            Sign in with Google
        </button>

        <button className='btn-auth btn-auth--3'
          onClick={() => { this.signInWithProvider(GitHubProvider) }}>
          <IconContext.Provider value={{ className: 'btn-auth__icon' }}>
            <DiGithubBadge />
          </IconContext.Provider>
            Sign in with GitHub
        </button>
      </Fragment>
    )
  }
}

export default AuthenticationForm