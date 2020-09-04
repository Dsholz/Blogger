import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
      <Link to='/'>
        <div className='header__icon'>
          <span>blogger</span>
        </div>
      </Link>
      <nav className='header__nav'>
        <ul>
          <Link to='/new-post'>
            <li className='header__nav--item btn-create'>create post</li>
          </Link>
          <Link to=''>
            <li className='header__nav--item'>profile</li>
          </Link>
          <Link to=''>
            <li className='header__nav--item'>logout</li>
          </Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header