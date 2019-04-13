import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

/* some code in this class borrowed from
https://stackoverflow.com/questions/42253277/react-router-v4-how-to-get-current-route */
class NavbarItem extends Component {

  render() {

    const { to, content, location, partial } = this.props

    let liClassList = 'navbar-item'
    let nlClassList = 'navlink'
    if ((location.pathname === to) || (partial ? location.pathname.includes(partial) : false)) {
      liClassList += ' border-bottom-color'
      nlClassList += ' active'
    }

    return (
      <li className={liClassList}>
        <NavLink to={to} exact className={nlClassList} activeClassName='active'>
          {content}
        </NavLink>
      </li>
    )
  }
}

export default withRouter(NavbarItem)
