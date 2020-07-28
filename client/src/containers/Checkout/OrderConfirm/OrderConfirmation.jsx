import React,{useState,useEffect} from 'react'
import { Card, CardMedia,Paper, CardContent, Typography, CardActions, Button, Select, MenuItem, Fab, InputLabel, CardActionArea } from '@material-ui/core';
import img from '../../../assets/logos/LalaDukaan.png';
import './OrderConf.scss'
import { connect } from 'react-redux';
import DoneIcon from '@material-ui/icons/Done';
import {NavLink} from 'react-router-dom'

function OrderConfirmation(props) {
    const [user, setUser] = useState({});
    useEffect(() => {
        fetch('/profile', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken
            }
        }).then(res => {
            res.json().then(res => {
                setUser(res.user)
                console.log(res)

            })
        })
    }, []
    )
    const ship = JSON.parse(props.data.shippingAddress)
    return (
        <React.Fragment>
            <Paper className="container mt-5 mb-5">
                <div className="order_conf">
                   <img src={img}/><span style={{float:'right',fontWeight:'bold',fontSize:'17px',margin:'40px'}}>{props.data.orderItems.length} items</span>
                </div>
                <div className="mt-4" style={{borderBottom:'1px solid #f3f3f3'}}>
                     <h3 className="pl-5" style={{fontSize:'17px'}}>Hey <span style={{fontWeight:'bold'}}>{user.firstName},</span></h3>
                     <h2 style={{color:'var(--mainColor)',fontSize:'22px',margin:'20px 40px'}}><DoneIcon fontSize='inherit' style={{fontSize:'30px'}}/><span className="ml-3">Your Order is confirmed</span></h2>
                     <p style={{fontSize:'17px',margin:'20px 40px'}}>Thanks for shopping! Your Order<span style={{color:'var(--mainColor'}}> {props.data.orderItems[0].sku.product.name}</span> and
                     <span style={{color:'var(--mainColor'}}> {props.data.orderItems.length-1} more items</span> hasn't shipped yet, but we'll send you an email while it does.</p>
                </div>
                <div className="row" style={{borderBottom:'1px solid #f3f3f3'}}>
                    <div className="col-md-6 pt-3" style={{margin:'20px 40px'}}>
                         <h6 style={{fontSize:'17px',marginBottom:'25px'}}>Order: <span style={{color:'var(--mainColor)'}}>#{props.data.id+100000}</span></h6>
                         <p style={{fontWeight:'bold',fontSize:'17px'}}>Your order will have been delivered on the below address:</p>
                         <p style={{fontSize:'16px'}}>{ship.address}<br/>{ship.state}, {ship.country} - {ship.zip} <br/> {ship.email} </p>
                    </div>
                    <div className="col-md-4" style={{margin:'20px 40px'}}>
                          <div className="price_conf pt-3">
                             Payment Type: <span style={{color:'var(--mainColor)'}}>{props.data.paymentType}</span>
                          </div>
                         <NavLink to="/orders"><button className="order_btn">View your Orders</button></NavLink>
                    </div>
                </div>
                <div style={{borderBottom:'1px solid #f3f3f3'}}>
                <div style={{fontSize:'17px',margin:'20px 40px'}}>                    
                      {props.data.orderItems.map(itm =>{
                          return(
                            <div className = "row" style={{margin:'20px  0'}}>
                            <div className="col-md-2">
                                <img src={itm.sku.images[0].src} style={{width:'70%',margin:'auto',padding:'10px'}} />
                            </div>
                            <div className="col-md-8" style={{padding:'10px 0'}}>
                               <h4 style={{color:'black',fontSize:'17px'}}>{itm.sku.product.name}</h4>
                               <p style={{color:'grey',fontSize:'15px'}}>Seller:<span style={{color:'var(--mainColor'}}> Laladukaan</span></p>
                            </div>
                            <div className="col-md-2" style={{float:'right',color:'grey',textAlign:'center',padding:'10px 0'}}>
                                 ₹{itm.sku.price}
                            </div>
                       </div>
                          )
                      })}                   
                </div>
                </div>
                <div style={{fontSize:'17px',margin:'20px 40px'}}>
                   <div className="ord_tot">
                    <p style={{fontWeight:'bold'}}>Sub Total <span style={{color:'grey',fontWeight:'normal'}}>₹ {props.data.price}</span></p>
                    <p style={{fontWeight:'bold'}}>+Tax<span style={{color:'grey',fontWeight:'normal'}}>₹ 0</span></p>
                    <p style={{fontWeight:'bold'}}>Total <span style={{color:'grey',fontWeight:'normal'}}>₹ {props.data.price}</span></p>
                   </div>
                </div>
            </Paper>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        ...state
    }
}
const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation)