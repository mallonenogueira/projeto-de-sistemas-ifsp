import React from "react";
import { Link } from "react-router-dom";

const NavbarItem = ({ icon, text, route }) => (
  <li className="navbar__item">
    <Link className="navbar__link" to={route}>
      <span className={`fas ${icon} fa-lg fa-fw navbar__icon`}></span>
      <span className="navbar__text">{text}</span>
      <span className="fas fa-chevron-right fa-xs fa-fw navbar__arrow"></span>
    </Link>
  </li>
);

export default NavbarItem;
