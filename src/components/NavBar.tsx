import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.svg';

const NavBar: React.FC = () => (
  <nav className="nav-bar">
    <img className="logo" src={logo} alt="logo" />
    <ul className="nav-bar__links">
      <li className="nav-bar__link">
        <NavLink className="nav-bar__link" to="/" exact activeClassName="nav-bar__link_active">Главная страница</NavLink>
      </li>
      <li className="nav-bar__link">
        <NavLink className="nav-bar__link" to="/login" exact activeClassName="nav-bar__link_active">Авторизация</NavLink>
      </li>
    </ul>
  </nav>
);

export default NavBar;
