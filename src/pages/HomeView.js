import React, { Fragment } from 'react'
import Header from '../components/Header'
import PostsList from '../components/PostsList'

const HomeView = () => {
  return (
    <Fragment>
      <Header />
      <PostsList />
    </Fragment>
  )
}

export default HomeView