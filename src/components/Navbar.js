import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import NavbarItem from './NavbarItem'

class Navbar extends Component {

  render() {
    const { authedUser } = this.props

    return (
      <nav className="navbar">

        <ul>
          <NavbarItem to="/polls/unanswered" content=" Home " partial="/polls/" />
          <NavbarItem to="/add" content="New Question" partial={false} />
          <NavbarItem to="/leaderboard" content="Leader Board" partial={false} />
        </ul>
      </nav>
  )}
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser: users[authedUser]
  }
}

export default connect(mapStateToProps)(Navbar)
