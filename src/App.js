import React, { Component } from 'react';
import SignUpFlow from './components/SignUpFlow'
import './sass/App.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignUpFlow />
      </div>
    );
  }
}

export default App;
