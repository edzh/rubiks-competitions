import React from 'react';
import { NavLink } from 'react-router-dom';

import LogOutButton from './LogOut';
import * as routes from '../constants/routes';

const Navbar = ({ authUser }) =>
  <nav className="navbar-expand-lg navbar-dark bg-dark">
    { authUser ? <NavbarAuth /> : <NavbarNonAuth /> }
  </nav>

const NavbarAuth = () =>
  <ul className="navbar-nav">
    <li className="nav-item">
      <NavLink className="nav-link" to={routes.HOME}>Home</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to={routes.CREATE_COMP}>Create Competition</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to={routes.COMPETITIONS}>Find Competition</NavLink>
    </li>
    <li><LogOutButton /></li>
  </ul>

const NavbarNonAuth = () =>
  <ul className="navbar-nav">
    <li className="nav-item">
      <NavLink className="nav-link" to={routes.HOME}>Home</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to={routes.CREATE_COMP}>Create Competition</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to={routes.COMPETITIONS}>Find Competition</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to={routes.LOG_IN}>Login</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to={routes.SIGN_UP}>Sign Up</NavLink>
    </li>
  </ul>

export default Navbar;
