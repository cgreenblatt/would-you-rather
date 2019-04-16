import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { setAuthedUser, deactivateAuthedUser } from '../actions/authedUser';
import Navbar from './Navbar';

class AuthedUser extends Component {


  handleClick = (e) => {
    const { logoutUser, authedUser } = this.props;
    e.preventDefault();
    logoutUser(authedUser);
  };

  render() {

    const { authedUser } = this.props;

    return (
      <div className='authed-user'>
        <div>
          <span className='float-right'>
            <span>{`Hello, ${authedUser.name}`}</span>
            <img src={authedUser.avatarURL} alt={`${authedUser.name}'s avatar`} className='avatar authed-user-avatar'/>
            <button className='logout-btn' onClick={this.handleClick}>Logout</button>
          </span>
        </div>
        <Navbar />
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }, props) {
  return { authedUser: users[authedUser.id] };
}

function mapDispatchToProps(dispatch) {
  return { logoutUser: (authedUser) => {dispatch(deactivateAuthedUser(authedUser));} }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthedUser));
