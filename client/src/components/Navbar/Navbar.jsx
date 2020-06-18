import React,{useState} from 'react';
import clsx from 'clsx';

import { NavLink, Link, withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import Checkout from '../../containers/Checkout/Checkout'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Drawer,
    CssBaseline,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Button
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';

import img from '../../assets/logos/LalaDukaan_nav_logo.png';
import { Avatar } from '@material-ui/core';

import Departments from './Category_Model/Department'
import './Navbar.scss'
import { useRef } from 'react';

import male_avatar from '../../assets/illustrations/male_avatar.svg'
import female_avatar from '../../assets/illustrations/female_avatar.svg'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: "#111"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const Navbar = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const history = useHistory();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    let searchText = useRef();

    const search = (e) => {
        e.preventDefault();
        history.push(`/products?search=${encodeURI(searchText.current.value)}`)
    }
    const [classy, setclassy] = useState("cartRem")
    const cartShow = ()=>{
        setclassy("cartShow")
    }
    const cartRem =()=>{
        setclassy("cartRem")
    }

    return (
        <React.Fragment>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar className="app-bar">

                        <div className="logo">
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, open && classes.hide, "d-md-none")}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Link to="/"><img src={img} height={60} className="" /></Link>
                        </div>

                        <div className="app-search-bar">
                            <form onSubmit={search}>
                                <div className="app_search">
                                    <input type="text" ref={searchText} className="input-search" title="Search for products, brands and more" name="search" autoComplete="off" placeholder="Search for products, brands and more" />
                                    <button className="search_btn">
                                        <i className="fa fa-search " aria-hidden="true" />
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="navigation d-md-flex d-none">
                            <div className="user">
                                {props.userName ?
                                    <Link to="/profile"><div className="username-nav align-items-center MuiButton-root"><PersonIcon /> <span>{props.userName}</span></div></Link>
                                    :
                                    <Button className="btn btn-login" onClick={props.openModal}>Login</Button>}
                            </div>
                            <div className="more">
                                <Button className="btn btn-more">More</Button>
                            </div>
                            <div className="cart" onMouseEnter={cartShow} >
                                <Button className="btn btn-cart">Cart</Button>
                            </div>
                        </div>


                    </Toolbar>
                </AppBar>


                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />

                    <Link to="/profile">
                        <div className="row align-items-center my-3 drawer-user">
                            <div className="col-3 ml-1">
                                <Avatar className="dp" src={male_avatar} />
                            </div>
                            <div className="col">
                                <div><i>Hello,</i></div>
                                {props.userName ? <h5>{props.userName}</h5> : 'User'}
                            </div>
                        </div>
                    </Link>

                    <Divider />

                    <List>

                        <ListItem button key={1}>
                            <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                            <ListItemText primary={"Login"} onClick={props.openModal} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button key={1}>
                            <ListItemIcon>{<MailIcon />}</ListItemIcon>
                            <ListItemText primary={"Logout"} onClick={() => { props.history.push('/'); props.logout() }} />
                        </ListItem>
                    </List>
                </Drawer>
            </div>
            <div className="categories">
                <Departments />
            </div>
            <div className={classy} onMouseLeave={cartRem}>
                   <Checkout/>
            </div>
        </React.Fragment>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))