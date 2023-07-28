import React from "react";
import './styles.css';
import CartHeader from "../cart/cartWidget";

const Navbar = ({ logo, menuItem, onShowCategory }) => {
    return (
            <nav className="nav">
                <ul className="menu">
                    <li><a href="/categories/1" className="navCategory">Sports</a></li>
                    <li><a href="/categories/4" className="navCategory">Shoes</a></li>
                    <li><a href="/categories/2" className="navCategory">Electronics</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><CartHeader /></li>
                </ul>
            </nav>
    )
}

export default Navbar;

