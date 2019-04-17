import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
/* some code in this class borrowed from
https://stackoverflow.com/questions/42253277/react-router-v4-how-to-get-current-route */
function NavbarItem(props) {

  const {
    to, content, location, partial
  } = props;

  let liClassList = 'navbar-item';
  let nlClassList = 'navlink';
  if ((location.pathname === to) || (partial ? location.pathname.includes(partial) : false)) {
    liClassList += ' border-bottom-color';
    nlClassList += ' active';
  }

  return (
    <li className={liClassList}>
      <NavLink to={to} exact className={nlClassList} activeClassName="active">
        {content}
      </NavLink>
    </li>
  );
}

NavbarItem.propTypes = {
  to: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  partial: PropTypes.string,
};

export default withRouter(NavbarItem);
