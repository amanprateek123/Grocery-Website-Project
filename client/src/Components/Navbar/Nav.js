import React, { Component } from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import pic from '../Navbar/LalaDukaan.png';

export default class Nav extends Component {
    state = {
        img: "https://advcoupons.com/wp-content/uploads/2016/10/bigbasket.png"
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ backgroundColor: "white" }} className="all">
                    <header className="hidden-sm hidden-xs">
                        <div className="container top-header">
                            <div className="row">
                                <div className="col-md-12 pad-0" style={{ minHeight: '30px' }}>
                                    <div className="right">
                                        <ul className="unorder">
                                            <li>
                                                <span className="hello">
                                                    <i className="fa fa-phone" aria-hidden="true" />
                                                    <span className="i">
                                                        1800 2345 5678
                                                </span>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="hello">
                                                    <i className="fa fa-map-marker" aria-hidden="true" />
                                                    <span className="i">
                                                        234567, Varanasi
                                                </span>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="hello">
                                                    <i className="fa fa-user " aria-hidden="true" />
                                                    <span className="i">
                                                        <NavLink to="/login" className="link">Login</NavLink> | <NavLink to="/signup" className="link"> SignUp </NavLink>
                                                    </span>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="container">
                        <div className="n">
                            <NavLink to="/" className="logo">
                                <img src={pic} alt="pic" />
                            </NavLink>
                            <div className="input">
                                <div className="input-group">
                                    <input type="search" placeholder="Search for Products.." />
                                </div>
                                <div className="butn">
                                    <button className="bb-search" type="submit">
                                        <i className="fa fa-search " aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                            <div class="cart">
                                <NavLink to="/cart" className="basket" type="button">
                                    <span className="a">
                                        <i className="fa fa-shopping-basket" aria-hidden="true" />
                                    </span>
                                    <span className="b">
                                        <span className="ba">
                                            My basket
                                     <br />
                                     0 items
                                 </span>
                                    </span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="container pad-0">
                        <div className="drop" style={{ height: '35px' }}>
                            <ul>
                                <li className="category">
                                    SHOP BY CATEGORY
                                   <span style={{ marginLeft: '15%' }}>
                                        <i className="fa fa-caret-down" aria-hidden="true" />
                                    </span>
                                    <ul>

                                    </ul>
                                </li>
                                <li className="offer">
                                    <span style={{ marginRight: '10px', marginLeft: '-5px' }}>
                                        <i className="fa fa-bell" aria-hidden="true" />
                                    </span>
                                   LD SPECIALITY
                                </li>
                                <li className="offer">
                                    <span style={{ marginRight: '10px', marginLeft: '-5px' }}>
                                        <i className="fa fa-bell" aria-hidden="true" />
                                    </span>
                                    OFFERS
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
