import React from 'react';
import { Link } from 'react-router';
import AccountsUIWrapper from './AccountsUIWrapper';


const Header = () => (
  <header>
    <h1><Link to='/'>Voting App</Link></h1>
    <AccountsUIWrapper />
    <nav>
      <Link to='/about'>About</Link>
    </nav>
  </header>
);

export default Header;