import React, { Component } from 'react';
import './Navbar.css';
import { NavLink, Link } from 'react-router-dom';
import img from '../../assets/LalaDukaan_nav_logo.png';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import { logout } from '../../store/actions';

class Navbar extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="appbar">
                    <div className="app1">
                        <div style={{ height: '100%', minWidth: '124px' }}></div>
                        <div className="app2">
                            <div className="logo_app">
                                <NavLink to="/" className="app_link">
                                    <img src={img} />
                                </NavLink>
                            </div>
                            <div className="app3">
                                <form action="/search" method="GET">
                                    <div className="app_search">
                                        <div style={{ position: 'relative', display: 'inlineBlock', width: '100%' }}>
                                            <input type="text" className="imputer" title="Search for products, brands and more" name="q" autoComplete="off" placeholder="Search for products, brands and more" />
                                        </div>
                                        <button className="app_btn">
                                            <i className="fa fa-search " aria-hidden="true" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {this.props.userName
                                ? <div className="dHG">
                                    <Link to="/profile"><div className="badge text-white">{this.props.userName}</div></Link>
                                </div>
                                : null
                            }
                            <div className="login_app">
                                <div className="dHG">
                                    <div className="yop">
                                        <div>
                                            {this.props.idToken ?
                                                <div onClick={this.props.logout} className="badge badge-secondary p-2 " to="/account/login?ret=/plus">Logout</div>
                                                :
                                                <div onClick={this.props.openModal} className="badge bg-white text-dark p-2 px-3" to="/account/login?ret=/plus">Login</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="App_more">
                                <div className="dAB">
                                    <div className="_1jc">
                                        <div>
                                            <div className="_2aU">More </div>
                                        </div>
                                    </div>
                                    <i className="fa fa-caret-down _34Y" aria-hidden="true" />
                                </div>
                            </div>
                            <div className="_cart">
                                <div style={{ display: 'inlineBlock', position: 'relative', margin: '0', padding: '0' }}>
                                    <div className="_3K4">
                                        <NavLink className="_3L2" to="/cart">
                                            <i className="fa fa-cart-plus ic" aria-hidden="true" />
                                            <span>Cart</span>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="zi6 container">
                    <div className="_3zd">
                        <ul className="_12r">
                            <li className="Wbt">
                                <span className="_1QZ">Staples <i className="fa fa-caret-down _34Y" aria-hidden="true" />
                                </span></li>
                            <li className="Wbt">
                                <span className="_1QZ">Snack & Beverages <i className="fa fa-caret-down _34Y" aria-hidden="true" />
                                </span></li>
                            <li className="Wbt">
                                <span className="_1QZ">Packed Food <i className="fa fa-caret-down _34Y" aria-hidden="true" />
                                </span></li>
                            <li className="Wbt">
                                <span className="_1QZ">Personal & Baby Care <i className="fa fa-caret-down _34Y" aria-hidden="true" />
                                </span></li>
                            <li className="Wbt">
                                <span className="_1QZ">Household Care <i className="fa fa-caret-down _34Y" aria-hidden="true" />
                                </span></li>
                            <li className="Wbt">
                                <span className="_1QZ">Dairy & Eggs <i className="fa fa-caret-down _34Y" aria-hidden="true" />
                                </span></li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        idToken: state.idToken,
        userName: state.userName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openModal: () => dispatch({ type: actions.OPEN_AUTH_MODAL }),
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)