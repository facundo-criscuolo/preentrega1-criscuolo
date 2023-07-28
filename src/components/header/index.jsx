import React from "react";
import './styles.css';
import Navbar from "./navbar";
import { NavLink } from "react-router-dom";


const Header = ({ logo, menuItem, onShowCategory }) => {
    return (
        <header className="header">
            <NavLink to='/' className="logo">{logo}</NavLink>
            <input type="checkbox" className="side-menu" id="side-menu" />
            <label className="hamb" htmlFor ="side-menu">
                <span className="hamb-line"></span>
            </label>
          <Navbar onShowCategory={onShowCategory} />
        </header>
    )
}

export default Header;