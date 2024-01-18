import React from 'react'
import {Link} from "react-router-dom";
import Logo from "../images/logo.png";
import {FaBars} from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai";



const Header = () => {
  return (
    <nav>
        <div className="contaier nav__container">
            <Link to="/" className="nav__logo">
               <img src={Logo} alt="" />
            </Link>
            <ul className="nav__menu">
                <li>
                    <Link to ="/profile/shsd">Sachin Sharma</Link>
                </li>
                <li>
                    <Link to ="/create">Create Post</Link>
                </li>
                <li>
                    <Link to ="/authors">Authors</Link>
                </li>
                <li>
                    <Link to ="/logout">Logout</Link>
                </li>
            </ul>
            <button className="nav__togglebtn">
               <AiOutlineClose/>
            </button>
        </div>
    </nav>
  )
}

export default Header