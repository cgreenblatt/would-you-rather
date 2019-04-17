import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Listbox from './Listbox';
import { setAuthedUser } from '../actions/authedUser';
import reduxLogo from '../icons/reduxLogo.svg';
import reactLogo from '../icons/reactLogo.svg';


class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeUserId: undefined,
      listboxCollapsed: true,
    };
    this.setActiveUserId = this.setActiveUserId.bind(this);
    this.toggleListbox = this.toggleListbox.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  setActiveUserId(id) {
    this.setState({ activeUserId: id });
  }

  signIn() {
    const { activeUserId } = this.state;
    const { signin } = this.props;
    if (activeUserId) signin(activeUserId);
  }

  toggleListbox() {
    this.setState(state => ({ listboxCollapsed: !state.listboxCollapsed }));
  }

  render() {
    const { authedUser, location } = this.props;
    const { activeUserId, listboxCollapsed } = this.state;
    if (authedUser && authedUser.sessionActive) {
      const { state } = location;
      const referrer = state ? state.referrer : null;
      if (referrer) {
        return <Redirect to={referrer} />;
      }
      return <Redirect to="/polls/unanswered" />;
    }

    return (
      <div className="gray-border min-max-width justify-self-center">
        <div className="grid-header">
          <h2 className="align-center">Welcome to the Would You Rather App!</h2>
          <h4 className="font-medium align-center gray-dark">Please sign in to continue</h4>
        </div>
        <div className="icons">
          <img className="icon icon-react" src={reactLogo} alt="react logo" />
          <span className="plus-sign gray"> +  </span>
          <img className="icon icon-redux" src={reduxLogo} alt="redux logo" />
        </div>
        <h2 className="align-center teal">Sign In</h2>
        <Listbox
          activeUserId={activeUserId}
          setActiveUserId = {this.setActiveUserId}
          listboxCollapsed={listboxCollapsed}
          toggleListbox={this.toggleListbox}
        />
        <div onClick={this.signIn} className={"sign-in-btn"}>
          Sign In
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  authedUser: PropTypes.object,
  location: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    signin: userId => dispatch(setAuthedUser(userId, true)),
  };
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
