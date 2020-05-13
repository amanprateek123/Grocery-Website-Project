import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './Navbar.css';

export default class Navbars extends Component {
    render() {
        return (
          <React.Fragment>
            <nav className="navbar navbar-expand-sm bg navbar-dark px-sm-5">
              <NavLink to="/" className="navbar-brand">Logo</NavLink>
              <ul className="navbar-nav align-items-center">
                  <li className="nav-item ml-5">
                      <NavLink to="/" className="nav-link">
                          Products
                      </NavLink>
                  </li>
              </ul>
              <NavLink to="/cart" className="ml-auto">
                  <button>
                      <span className="mr-2">
                      <i className="fa fa-cart-plus" aria-hidden="true"/>
                      </span>
                       My Cart
                  </button>

              </NavLink>
              
            </nav>
        </React.Fragment>
        )
    }
}
