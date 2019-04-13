import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { handleInitialData } from '../actions/shared';
import SignIn from './SignIn';
import Polls from './Polls';
import Poll from './Poll';
import LeaderBoard from './LeaderBoard';
import NewPoll from './NewPoll';
import AuthedUser from './AuthedUser';
import PageNotFound from './PageNotFound'
import '../App.css';

library.add(fas);

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <div className="App">
          <AuthedUser />
          <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/polls/:status" exact component={Polls} />
            <Route path="/add" exact component={NewPoll} />
            <Route path="/leaderboard" exact component={LeaderBoard} />
            <Route path="/poll/:questionId" exact component={Poll} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect()(App)
