import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import SignIn from './SignIn'
import Questions from './Questions'
import Poll from './Poll'
import LeaderBoard from './LeaderBoard'
import NewQuestion from './NewQuestion'
import AuthedUser from './AuthedUser'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '../App.css';

library.add(fas)

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { authedUser } = this.props
    return (
      <Router>
          <div className="App">
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

    )


  /*

{authedUser && <Poll questionId="loxhs1bqm25b708cmbf3g"/>}


  if (!authedUser) {
      return (
        <div className="App">
          <SignIn />
        </div>
      )
    } else {
      return (
        <div className="App">
          <Router>
            <Route path='/' exact component={QuestionListContainer} />
            <Route path='/new' component={NewQuestion} />
            <Route path='/leaderBoard' component={LeaderBoard} />
            <Route path='/poll/:questionId' component={QuestionDetails} />
          </Router>
        </div>
      )
    } */
  }
}


function mapStateToProps({ authedUser }) {
  return { authedUser }
}

export default connect(mapStateToProps)(App)
