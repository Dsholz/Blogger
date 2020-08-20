import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PostContent from './pages/PostContent'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import HomeView from './pages/HomeView'
import NewPost from './pages/NewPost'
import './sass/App.scss'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path='/' exact component={HomeView} />
            <Route path='/new-post' component={NewPost} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/posts/:id' component={PostContent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
