import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Listbox from './Listbox';
import { setAuthedUser } from '../actions/authedUser';
import reduxLogo from '../icons/reduxLogo.svg';
import reactLogo from '../icons/reactLogo.svg';


class SignIn extends Component {

  state = {
    activeUserId: undefined,
    listboxCollapsed: true,
  };

  setActiveUserId = (id) => {
      this.setState({ activeUserId: id,});
  }

  signIn = () => {
    const activeUserId = this.state.activeUserId;
    if (activeUserId)
      this.props.setAuthedUser(activeUserId)
  }

  toggleListbox = () => {
    this.setState((state) => {
      return { listboxCollapsed: !state.listboxCollapsed };
    })
  }

  render() {


    const { authedUser } = this.props;
    if (authedUser && authedUser.sessionActive) {
        if (this.props.location.state && this.props.location.state.referrer) {
          // redirect to referrer
          return <Redirect to={this.props.location.state.referrer} />
        } else {
          // not referred, redirect to home
          return <Redirect to='/polls/unanswered' />
        }
    }

    if (authedUser && !authedUser.sessionActive) {
      this.props.setAuthedUser(null);
    }

    return (
      <div className='gray-border min-max-width justify-self-center'>
        <div className='grid-header'>
          <h2 className='align-center'>Welcome to the Would You Rather App!</h2>
          <h4 className='font-medium align-center gray-dark'>Please sign in to continue</h4>
        </div>
        <div className='icons'>
          <img className='icon icon-react' src={reactLogo} alt='react logo'/>
          <span className='plus-sign gray'> +  </span>
          <img className='icon icon-redux' src={reduxLogo} alt='redux logo'/>
        </div>
        <h2 className='align-center teal'>Sign In</h2>
        <Listbox
          activeUserId = {this.state.activeUserId}
          setActiveUserId = {this.setActiveUserId}
          listboxCollapsed = { this.state.listboxCollapsed }
          toggleListbox = { this.toggleListbox }
        />
        <div onClick={this.signIn} className={'sign-in-btn'}>
          Sign In
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUser : (userId) => {
      userId
      ? dispatch(setAuthedUser({id: userId, sessionActive: true}))
      : dispatch(setAuthedUser(null))
    }
  }
}

function mapStateToProps({ authedUser }) {
    return { authedUser };
}


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
