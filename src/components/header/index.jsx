import React from "react";
import './styles.css';
import Navbar from "./navbar";


const Header = ({ logo, menuItem, onShowCategory }) => {
    return (
        <header className="header">
            <a href="/" className="logo">{logo}</a>
            <input type="checkbox" className="side-menu" id="side-menu" />
            <label className="hamb" htmlFor ="side-menu">
                <span className="hamb-line"></span>
            </label>
          <Navbar onShowCategory={onShowCategory} />
        </header>
    )
}

export default Header;