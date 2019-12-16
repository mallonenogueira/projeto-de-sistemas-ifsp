import React from "react";
import "./Navbar.scss";
import NavbarItem from "./NavbarItem";
import NavbarCategory from "./NavbarCategory";

const Navbar = ({ expanded }) => (
  <nav className={`navbar ${expanded && "navbar--expanded"} `}>
    <ul className="navbar__list">
      <NavbarItem text="Página inicial" icon="fa-home" route="/" />
      <NavbarItem text="Componentes" icon="fa-book-open" route="/components" />
      <NavbarCategory text="Cadastros" />
      <NavbarItem text="Equipes" icon="fa-users" route="/teams" />
      <NavbarItem text="Atletas" icon="fa-running" route="/athletes" />
      <NavbarCategory text="Testes" />
      <NavbarItem text="Agilidade" icon="fa-clock" route="/agility" />
      <NavbarItem text="RAST" icon="fa-clock" route="/rast" />
    </ul>
  </nav>
);

export default Navbar;
