import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import Navbar from './Navbar'

class AuthedUser extends Component {

  handleClick = (e) => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(null))
  }

  render() {

    const { authedUser } = this.props

    if (!authedUser) {
      return null;
    }

    return (
      <div className="authed-user">
        <div>
          <span className="float-right">
            <span>{`Hello, ${authedUser.name}`}</span>
            <img src={authedUser.avatarURL} alt={`${authedUser.name}'s avatar`} className="avatar authed-user-avatar"/>
            <button className="logout-btn" onClick={this.handleClick}>Logout</button>
          </span>
        </div>
        <Navbar />
      </div>
    )
  }

}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser: users[authedUser]
  }
}

export default connect(mapStateToProps)(AuthedUser)
