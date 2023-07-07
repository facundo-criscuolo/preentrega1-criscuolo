import React from "react";
import './styles.css';
import Cart from "../cart/cartWidget";


const Navbar = ({ logo, menuItem }) => {
    return (
            <nav className="nav">
                <ul className="menu">
                    <li><a href="#">About</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Categories</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><Cart /></li>
                </ul>
            </nav>
    )
}

export default Navbar;