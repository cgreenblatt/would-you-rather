import React from 'react';
import NavbarItem from './NavbarItem';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <NavbarItem to="/polls/unanswered" content=" Home " partial="/polls/" />
        <NavbarItem to="/add" content="New Question" />
        <NavbarItem to="/leaderboard" content="Leader Board" />
      </ul>
    </nav>
  );
}

export default Navbar;
