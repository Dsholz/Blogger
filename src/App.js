import React, { Component } from 'react';
import PostsList from './components/PostsList'
import './sass/App.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PostsList />
      </div>
    );
  }
}

export default App;
