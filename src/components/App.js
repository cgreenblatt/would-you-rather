import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, Redirect, withRouter
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { handleInitialData } from '../actions/shared';
import SignIn from './SignIn';
import Polls from './Polls';
import Poll from './Poll';
import LeaderBoard from './LeaderBoard';
import NewPoll from './NewPoll';
import AuthedUserHeader from './AuthedUserHeader';
import '../App.css';

library.add(fas);

class App extends Component {

  constructor(props) {
    super(props);
    this.renderLeaderBoard = this.renderLeaderBoard.bind(this);
    this.renderNewPoll = this.renderNewPoll.bind(this);
  }

  componentDidMount() {
    this.props.handleInitialData();
  }

  renderLeaderBoard() {
    const { authedUser } = this.props;
    if (authedUser) {
      return authedUser.sessionActive ? <LeaderBoard /> : <Redirect to="/" />;
    }
    return <Redirect to={{ pathname: '/', state: { referrer: '/leaderboard' } }} />;
  }

  renderNewPoll() {
    const { authedUser } = this.props;
    if (authedUser) {
      return authedUser.sessionActive ? <NewPoll /> : <Redirect to="/" />;
    }
    return <Redirect to={{ pathname: '/', state: { referrer: '/add' } }} />;
  }

  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <div className="App">
          {authedUser && authedUser.sessionActive && <Route path="/" component={AuthedUserHeader} />}
          <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/polls/:status" component={Polls} />
            <Route path="/add" render={this.renderNewPoll} />
            <Route path="/leaderboard" render={this.renderLeaderBoard} />
            <Route path="/poll/:questionId" exact component={Poll} />
            <Route component={Polls} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  authedUser: PropTypes.object,
  handleInitialData: PropTypes.func.isRequired,
};

App.defaultProps = {
  authedUser: null,
};

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

function mapDispatchToProps(dispatch) {
  return { handleInitialData: () => dispatch(handleInitialData()) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
