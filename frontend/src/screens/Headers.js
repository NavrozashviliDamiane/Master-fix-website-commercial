import React, { useState } from "react";
import './header.css'

/* REACT BOOTSTRAP */
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import {Link} from 'react-router-dom'

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { logout } from "../actions/userActions";

/* COMPONENTS */
import SearchBox from "../components/Searchboxes";

import logo from "../assets/masterfixlogo.png"

function Headers() {

  
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  /* Change scrolling color */
  const [color, setColor] = useState(false)
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true)
    } else {
      setColor(false)
    }
  }

  window.addEventListener('scroll', changeColor)
  
  /* HANDLER */
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const myStyle={
    paddingTop: '10px',
    width:'150px',
    height:'150px',  
    };
  
  const myMobileStyle={
   
      width:'120px',
      height:'120px',  
      };

  return (
    <div>
      {/* Header */}
      <header >
        {/* Header desktop */}
        <div className="container-menu-desktop">
          {/* Topbar */}
          
          <div style={{boxShadow: '0 0 0 5px rgba(0,0,0,0.05)', height: "80px"}}  className={color ? 'wrap-menu-desktop header header-bg' : 'wrap-menu-desktop header header-bg'}>
            <nav className="limiter-menu-desktop container" >
              {/* Logo desktop */}
             
              <Link to={'/'}>
                  <img src={logo} style={myStyle}  alt="IMG-LOGO" />
                  </Link>
         

              {/* Menu desktop */}
              <div className="menu-desktop">
                <ul className="main-menu">
                  <li className="active-menu">
                  <Link to={'/'}>
                    <a style={{ textDecoration: "none" }}>
                      Home
                    </a></Link>
                  </li>
                  <li>
                   <Link to={'/shop'}> <a  style={{ textDecoration: "none" }}>
                      Shop
                    </a> </Link>
                  </li>
              
                  <li>
                  <Link to={'/about'}>
                    <a  style={{ textDecoration: "none" }}>
                      About
                    </a>
                    </Link>
                  </li>
                  <li>
                  <Link to={'/contact'}>
                    <a  style={{ textDecoration: "none" }}>
                      Contact
                    </a>
                    </Link>
                  </li>
                  <li>
                  </li>
                </ul>
              </div>
              {/* Icon header */}
              <div className="wrap-icon-header flex-w flex-r-m">
                
             
                  
               
                <div
                  className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 "
                 
                >
                  <LinkContainer to='/cart'><i className="zmdi zmdi-shopping-cart" /></LinkContainer>
                </div>

                {userInfo ? (
                  <div className="menu-desktop">
                    <ul className="main-menu">
                      <li
                        className="active-menu"
                        title={userInfo.name}
                        id="username"
                      >
                        <LinkContainer to="/profile">
                          <a style={{ textDecoration: "none" }}>Profile</a>
                        </LinkContainer>
                      </li>
                      <li className="active-menu">
                        <button
                          onClick={logoutHandler}
                          style={{ textDecoration: "none" }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="menu-desktop">
                    <ul className="main-menu">
                      <li className="active-menu">
                        <LinkContainer to="/login">
                          <a style={{ textDecoration: "none" }}>Login</a>
                        </LinkContainer>
                      </li>
                    </ul>
                  </div>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="adminmenu">
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                
              </div>
            </nav>
          </div>
        </div>



        {/* Header Mobile */}
        <div className="wrap-header-mobile">
          {/* Logo moblie */}
          <div style={{ width: "1000px", maxWidth: "max-width: calc(100% - 5px)"}} >
          <LinkContainer style={myMobileStyle} to="/">
                <a  className="logo">
                  <img src={logo}   alt="IMG-LOGO" />
                </a>
              </LinkContainer>
          </div>
          <div className="wrap-icon-header flex-w flex-r-m m-r-15">
          
          <div
            className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10  "
          >
           <LinkContainer to='/cart'><i className="zmdi zmdi-shopping-cart" /></LinkContainer> 
          </div>
         
        </div>
          <div className="menu-desktop">
                <ul className="main-menu">

               
                {userInfo ? (
                  <div className="menu-desktop">
                    <ul className="main-menu">
                      <li
                        className="active-menu"
                        title={userInfo.name}
                        id="username"
                      >
                        <LinkContainer to="/profile">
                          <a style={{ textDecoration: "none" }}>Profile</a>
                        </LinkContainer>
                      </li>
                      <li className="active-menu">
                        <button
                          onClick={logoutHandler}
                          style={{ textDecoration: "none" }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="menu-desktop">
                    <ul className="main-menu">
                      <li className="active-menu">
                        <LinkContainer to="/login">
                          <a style={{ textDecoration: "none" }}>Login</a>
                        </LinkContainer>
                      </li>
                    </ul>
                  </div>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="adminmenu">
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
               


                  <li className="active-menu">
                  <Link to={'/'}>
                    <a style={{ textDecoration: "none" }}>
                      Home
                    </a></Link>
                  </li>
                  <li>
                   <Link to={'/shop'}> <a  style={{ textDecoration: "none" }}>
                      Shop
                    </a> </Link>
                  </li>
              
                  <li>
                  <Link to={'/shop'}>
                    <a  style={{ textDecoration: "none" }}>
                      About
                    </a>
                    </Link>
                  </li>
                  <li>
                  <Link to={'/shop'}>
                    <a  style={{ textDecoration: "none" }}>
                      Contact
                    </a>
                    </Link>
                  </li>
                  <li>
                  </li>
                </ul>
              </div>
          {/* Icon header */}
         
         
          {/* Button show menu */}

          
        </div>
        {/* Menu Mobile */}
       


        
        {/* Modal Search */}
        <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
          <div className="container-search-header">
            <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
              <img src="images/icons/icon-close2.png" alt="CLOSE" />
            </button>
            <form className="wrap-search-header flex-w p-l-15">
           
              <button className="flex-c-m trans-04">
                <i className="zmdi zmdi-search" />
              </button>
              <input
                className="plh3"
                type="text"
                name="search"
                placeholder="Search..."
              />
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Headers