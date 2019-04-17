import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deactivateAuthedUser } from '../actions/authedUser';
import Navbar from './Navbar';

class AuthedUserHeader extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { logoutUser } = this.props;
    e.preventDefault();
    logoutUser();
  }

  render() {
    const { authedUser } = this.props;
    return (
      <div className="authed-user">
        <div>
          <span className="float-right">
            <span>{`Hello, ${authedUser.name}`}</span>
            <img src={authedUser.avatarURL} alt={`${authedUser.name}'s avatar`} className="avatar authed-user-avatar" />
            <button className="logout-btn" onClick={this.handleClick}>Logout</button>
          </span>
        </div>
        <Navbar />
      </div>
    );
  }
}

AuthedUserHeader.propTypes = {
  authedUser: PropTypes.object,
  logoutUser: PropTypes.func.isRequired,
};

AuthedUserHeader.defaultProps = {
  authedUser: null,
};

function mapStateToProps({ authedUser, users }) {
  return { authedUser: users[authedUser.id] };
}

function mapDispatchToProps(dispatch) {
  return { logoutUser: () => dispatch(deactivateAuthedUser()) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthedUserHeader);
