import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthUserContext from './Auth/AuthUserContext';
import LogOutButton from './Auth/LogOut';
import * as routes from '../constants/routes';

const Navbar = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser ? <NavbarAuth authUser={authUser} /> : <NavbarNonAuth /> }
  </AuthUserContext.Consumer>

const NavbarAuth = (props) =>
  <nav className="navbar-expand-lg navbar-dark bg-dark">
    <h4 className="navbar-brand">Cubby</h4>
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink className="nav-link" to={routes.HOME}>Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={routes.COMPETITIONS}>Find Competition</NavLink>
      </li>
      <li><LogOutButton /></li>
      <li className="nav-item">
        <NavLink className="nav-link" to={`${routes.PROFILE}/${props.authUser.uid}`}>My Profile</NavLink>
      </li>
    </ul>
  </nav>

const NavbarNonAuth = () =>
  <nav className="navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink className="nav-link" to={routes.HOME}>Home</NavLink>
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
  </nav>

export default Navbar;
