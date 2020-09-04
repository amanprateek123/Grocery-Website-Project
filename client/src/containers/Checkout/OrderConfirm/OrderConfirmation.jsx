import React,{useState,useEffect} from 'react'
import { Card, CardMedia,Paper, CardContent, Typography, CardActions, Button, Select, MenuItem, Fab, InputLabel, CardActionArea } from '@material-ui/core';
import img from '../../../assets/logos/LalaDukaan.png';
import './OrderConf.scss'
import { connect } from 'react-redux';
import DoneIcon from '@material-ui/icons/Done';
import {NavLink, useHistory} from 'react-router-dom'
import Modal from '../../../components/Modal/Modal'
import CloseIcon from '@material-ui/icons/Close';
import { useMutation } from 'react-query'

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

    const cancel_list = [
        {reason:'Order Created by mistake'},
        {reason:'Item(s) would not arrive on time'},
        {reason:'Shipping cost is too high'},
        {reason:'Item price is too high'},
        {reason:'Found Cheaper somewhere else'},
        {reason:'Need to change Shipping address'},
        {reason:'Need to change shipping speed'},
        {reason:'Need to change billing address'},
        {reason:'Need to change payment method'},
        {reason:'Others'}
    ]
    const history = useHistory()

    const ship = JSON.parse(props.data.shippingAddress)
    
    return (
        <React.Fragment>
            <Paper className="container mt-5 mb-5" id="confi">
                <div className="order_conf">
                   <img src={img}/>
                </div>
                <div className="mt-4" style={{borderBottom:'1px solid #f3f3f3'}}>
                     <h3 className="pl-5" style={{fontSize:'17px'}}>Hey <span style={{fontWeight:'bold'}}>{user.firstName},</span></h3>
                     <h2 style={{color:'var(--mainColor)',margin:'20px 40px'}}><DoneIcon fontSize='inherit' style={{fontSize:'30px'}}/><span className="ml-3">Your Order is confirmed</span></h2>
                     <p style={{fontSize:'17px',margin:'20px 40px'}}>Thanks for shopping! Your Order hasn't shipped yet, but we'll send you an email while it does.</p>
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
                         <NavLink to={`/order/${props.data.id}`}><button className="order_btn">View your Order</button></NavLink>
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