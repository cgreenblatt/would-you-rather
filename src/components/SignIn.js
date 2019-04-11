import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Listbox from './Listbox'
import { setAuthedUser } from '../actions/authedUser'
import reduxLogo from '../icons/reduxLogo.svg'
import reactLogo from '../icons/reactLogo.svg'


class SignIn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeUserId: undefined,
      listboxCollapsed: true,
    }
    this.setActiveUserId = this.setActiveUserId.bind(this)
    this.signIn = this.signIn.bind(this)
    this.toggleListbox = this.toggleListbox.bind(this)
  }

  setActiveUserId(id) {
      this.setState({
        activeUserId: id,
      })
  }

  signIn() {
    if (this.state.activeUserId)
      this.props.dispatch(setAuthedUser(this.state.activeUserId))
  }

  toggleListbox() {
    this.setState((state) => {
      return {listboxCollapsed: !state.listboxCollapsed}
    })
  }

  render() {
    const { authedUser } = this.props

    // already signed in so go to polls
    if (authedUser) {
      return <Redirect to='/polls/unanswered' />
    }

    return (
      <div className="gray-border min-max-width justify-self-center">
        <div className="grid-header">
          <h2 className="align-center">Welcome to the Would You Rather App!</h2>
          <h4 className="font-medium align-center gray">Please sign in to continue</h4>
        </div>
        <div className="icons">
          <img className="icon icon-react" src={reactLogo} alt="react logo"/>
          <span className="plus-sign"> +  </span>
          <img className="icon icon-redux" src={reduxLogo} alt="redux logo"/>
        </div>
        <h2 className="align-center teal">Sign In</h2>
        <Listbox
          activeUserId = {this.state.activeUserId}
          setActiveUserId = {this.setActiveUserId}
          listboxCollapsed = { this.state.listboxCollapsed }
          toggleListbox = { this.toggleListbox }
        />
        <div onClick={this.signIn} className={"sign-in-btn"}>
          Sign In
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
    return { authedUser }
}


export default connect(mapStateToProps)(SignIn)
