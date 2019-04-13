import React, { Component } from 'react';
import NavbarItem from './NavbarItem';

const Navbar = (props) => {

  return (
    <nav className='navbar'>
      <ul>
        <NavbarItem to='/polls/unanswered' content=' Home ' partial='/polls/' />
        <NavbarItem to='/add' content='New Question' partial={false} />
        <NavbarItem to='/leaderboard' content='Leader Board' partial={false} />
      </ul>
    </nav>
  );
}

export default Navbar;
