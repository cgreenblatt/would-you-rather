import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import SignIn from './SignIn';
import Questions from './Questions';
import Poll from './Poll';
import LeaderBoard from './LeaderBoard';
import NewQuestion from './NewQuestion';
import AuthedUser from './AuthedUser';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

library.add(fas);

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
          <div className='App'>
            <AuthedUser />
            <Route path='/' exact component={SignIn} />
            <Route path='/polls' exact component={Questions} />
            <Route path='/polls/:status' component={Questions} />
            <Route path='/add' component={NewQuestion} />
            <Route path='/leaderboard' component={LeaderBoard} />
            <Route path='/poll/:questionId' exact component={Poll} />
            <Route path='/poll' exact component={Questions} />
          </div>
      </Router>
    );
  }
}

export default connect()(App)
