import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
            <Switch>
              <Route path='/' exact component={SignIn} />
              <Route path='/polls/:status' exact component={Questions} />
              <Route path='/add' exact component={NewQuestion} />
              <Route path='/leaderboard' exact component={LeaderBoard} />
              <Route path='/poll/:questionId' exact component={Poll} />
              <Route component={SignIn} />
            </Switch>
          </div>
      </Router>
    );
  }
}

export default connect()(App)
