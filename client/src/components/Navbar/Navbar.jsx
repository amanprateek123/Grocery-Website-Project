import React, { useState } from 'react';
import clsx from 'clsx';

import { NavLink, Link, withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import Cart from '../../containers/Cart/Cart'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import img from '../../assets/logos/LalaDukaan_nav_logo.png';
import { Avatar } from '@material-ui/core';

import Departments from './Category_Model/Department'
import './Navbar.scss'
import { useRef } from 'react';

import male_avatar from '../../assets/illustrations/male_avatar.svg'
import female_avatar from '../../assets/illustrations/female_avatar.svg'
import { useEffect } from 'react';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
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

    const [preSearch, setPreSearch] = useState([]);

    const history = useHistory();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    let searchText = useRef();


    const search = (e, str) => {
        e.preventDefault();
        let query = str || searchText.current.value;
        if (!query) {
            return;
        }
        setPreSearch([])
        history.push(`/products?search=${encodeURI(query)}&sr`)
    }
    const [classy, setclassy] = useState("cartRem")
    const [cart_bg, setcart_bg] = useState("cart")
    const cartShow = () => {
        setclassy("cartShow")
        setcart_bg("cart_bg")
    }
    const cartRem = () => {
        setclassy("cartRem")
        setcart_bg("cart")
    }

    const [more, setMore] = useState('cart1')
    const more_dis = () => {
        setMore("more_option")
    }
    const more_hide = () => {
        setMore('cart1')
    }

    useEffect(() => {

        let handler = (e) => {
            if (e.keyCode == 13) {
                setPreSearch([]);
                return;
            }
            if (e.target.value.length > 2) {
                fetch(`/pre-search?q=${e.target.value}`).then(res => res.json())
                    .then(strings => {
                        setPreSearch(strings)
                    })
            }
            else if (e.target.value.length < 2) {
                setPreSearch([])
            }
        }
        searchText.current.addEventListener('keyup', handler)

        return () => {
            searchText.current.removeEventListener('keyup', handler)
        }
    }, [])
  console.log('pre',preSearch)
  const[show,setShow]=useState(false)
  const[val,setVal]=useState(null)
  const searchs= (e)=>{
       setVal(e.target.value)
       setShow(true)
  }

  const convert = (string)=>{
         if(!string.toLowerCase().includes(val.toLowerCase())){
             return string
         }
         const word = string.toLowerCase().replace(val.toLowerCase(),'*')
         const words = word.split('*')
         return <span>{words[0]}<b>{val}</b>{words[1]}</span>
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
                    style={{ zIndex: '1' }}
                >
                    <Toolbar className="app-bar">

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide, "d-md-none")}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className="logo" >
                            <Link to="/"><img src={img} height={60} className="" /></Link>
                        </div>

                        <div className="app-search-bar">
                            <form onSubmit={search}>
                                <div className="app_search">
                                    <input type="text" ref={searchText} onChange={searchs} className="input-search" title={`Search Products`} name="search" autoComplete="off" placeholder={`Hi ${props.userName ? props.userName.split(' ')[0] : ''}, what are you looking for today?`} />
                                    <button className="search_btn">
                                        <i className="fa fa-search " aria-hidden="true" />
                                    </button>
                                </div>
                                {
                                    preSearch.length ?
                                        <div className="pre-search list-group">
                                          {show?  <ul onMouseLeave={()=>setShow(false)}>
                                                 <div className="head-sch">Showing results for {val}:</div>
                                                {
                                                    preSearch.map(str => (
                                                        <li className="pre-search-li" onClick={(e) => search(e, str.name)}>
                                                            <div className="row">
                                                                 <div className="col-md-2 search-img" style={{backgroundImage:`url(${str.img})`}}>
                                                                     
                                                                 </div>
                                                                 <div className="col-md-7">
                                                                     <span className="br"><u>{str.brand}</u></span><br/>
                                                                     <p style={{fontSize:'12px',textTransform:'capitalize'}}>{convert(str.name)}</p>
                                                                 </div>
                                                                 <div className="col-md-2" style={{marginTop:'20px'}}>
                                                                      Rs.<span>{str.price}</span>
                                                                 </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>:null}
                                        </div>
                                        : null
                                }

                            </form>
                        </div>

                        <div className="d-md-none d-flex navigation">
                            {props.userName ?
                                <Link to="/checkout" style={{ color: 'inherit', margin: '5px 15px' }}>
                                    <ShoppingCartIcon style={{}} />
                                    <div className="badge1">{props.cart.length}</div>
                                </Link>
                                : null
                            }
                        </div>

                        <div className="navigation d-md-flex d-none">
                            <div className="user" style={{ width: '180px', textAlign: 'center' }}>
                                {props.userName ?
                                    <Link to="/profile" style={{ textDecoration: 'none' }} ><div className="username-nav align-items-center MuiButton-root"><PersonIcon /> <span style={{ textAlign: 'left', width: '100%' }}>{props.userName}</span></div></Link>
                                    :
                                    <Button className="btn btn-login" onClick={props.openModal}>Login</Button>}
                            </div>
                            {props.userName ?
                                <div className="more" style={{ width: '80px', height: '64px', paddingTop: '3.3%' }} onMouseEnter={more_dis} onMouseLeave={more_hide}>
                                    <Button className="btn btn-more" style={{ fontSize: '16.5px', paddingLeft: '35%' }}>More
                            <div className={more}>
                                            <div style={{ border: 'solid transparent', position: 'absolute', bottom: '100%', left: '50%', borderWidth: '10px', transform: 'translateX(-10px)', borderBottomColor: '#fff' }}>

                                            </div>
                                            <div className="more_cont">
                                                <div style={{ margin: '-16px' }}>
                                                    <ul>
                                                        <li><NavLink to="/orders"><LocalMallIcon style={{ width: '16px', height: '16px', color: 'var(--mainColor)' }} /><div style={{ marginLeft: '12px' }}>My Orders</div></NavLink></li>
                                                        <li><NavLink to="/"><LocalOfferIcon style={{ width: '16px', height: '16px', color: 'var(--mainColor)' }} /><div style={{ marginLeft: '12px' }}>Offers</div></NavLink></li>
                                                        <li><NavLink to="/"><FavoriteIcon style={{ width: '16px', height: '16px', color: 'var(--mainColor)' }} /><div style={{ marginLeft: '12px' }}>WishList</div></NavLink></li>
                                                        <li><NavLink to="/"><NotificationsIcon style={{ width: '16px', height: '16px', color: 'var(--mainColor)' }} /><div style={{ marginLeft: '12px' }}>Notification</div></NavLink></li>
                                                        <li onClick={props.logout}><NavLink to="/"><PowerSettingsNewIcon style={{ width: '16px', height: '16px', color: 'var(--mainColor)' }} /><div style={{ marginLeft: '12px' }}>Logout</div></NavLink></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <span><ExpandMoreIcon /></span></Button>

                                </div> : null}
                            {props.userName ?
                                <div className={cart_bg} onMouseEnter={cartShow} onMouseLeave={cartRem}>
                                    <ShoppingCartIcon style={{ fontSize: '25px', marginLeft: '8px' }} />
                                    <div className={props.cart.length === 0 ? "cart1" : "cart_value"}>
                                        {props.cart.length}
                                    </div>
                                    <div className={classy}>
                                        <Cart />
                                    </div>
                                </div>
                                : null
                            }
                        </div>


                    </Toolbar>
                    <div className="categories d-none d-md-block">
                        <Departments />
                    </div>
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
                        <IconButton onClick={handleDrawerClose} >
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />

                    <Link to="/profile">
                        {props.userName ?
                            <div className="row align-items-center my-3 drawer-user">
                                <div className="col-3 ml-1">
                                    <Avatar className="dp" src={male_avatar} />
                                </div>

                                <div className="col mt-2 mr-3">
                                    <h5>{props.userName}</h5>
                                </div>
                            </div> : null}
                    </Link>

                    <Divider />

                    {
                        props.userName ?
                            null
                            :
                            <React.Fragment>
                                <List>

                                    <ListItem button key={1}>
                                        <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                                        <ListItemText primary={"Login"} onClick={props.openModal} />
                                    </ListItem>
                                </List>
                                <Divider />
                            </React.Fragment>
                    }
                    <List>
                        <ListItem>
                            {props.userName ?
                                <div className="more_cont" style={{ padding: '0' }}>
                                    <div style={{ margin: '-16px' }}>
                                        <ul>
                                            <li><NavLink to="/orders"><LocalMallIcon style={{ width: '16px', height: '16px', color: 'var(--mainColor)' }} /><div style={{ marginLeft: '12px' }}>My Orders</div></NavLink></li>
                                            <li><NavLink to="/"><LocalOfferIcon style={{ width: '16px', height: '16px', color: 'var(--mainColor)' }} /><div style={{ marginLeft: '12px' }}>Offers</div></NavLink></li>
                                            <li><NavLink to="/"><FavoriteIcon style={{ width: '16px', height: '16px', color: 'var(--mainColor)' }} /><div style={{ marginLeft: '12px' }}>WishList</div></NavLink></li>
                                            <li><NavLink to="/"><NotificationsIcon style={{ width: '16px', height: '16px', color: 'var(--mainColor)' }} /><div style={{ marginLeft: '12px' }}>Notification</div></NavLink></li>
                                            <li onClick={props.logout}><NavLink to="/"><PowerSettingsNewIcon style={{ width: '16px', height: '16px', color: 'var(--mainColor)' }} /><div style={{ marginLeft: '12px' }}>Logout</div></NavLink></li>
                                        </ul>
                                    </div>
                                </div>
                                : null}
                        </ListItem>
                    </List>
                    {props.menu}
                </Drawer>

            </div>

        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        idToken: state.idToken,
        userName: state.userName,
        cart: state.cart,
        menu: state.menu
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openModal: () => dispatch({ type: actions.OPEN_AUTH_MODAL }),
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))