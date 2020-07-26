import React,{useState,useEffect} from 'react'
import { Card, CardMedia,Paper, CardContent, Typography, CardActions, Button, Select, MenuItem, Fab, InputLabel, CardActionArea } from '@material-ui/core';
import img from '../../../assets/logos/LalaDukaan.png';
import './OrderConf.scss'
import { connect } from 'react-redux';
import DoneIcon from '@material-ui/icons/Done';

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
    return (
        <React.Fragment>
            <Paper className="container mt-5">
                <div className="order_conf">
                   <img src={img}/><span style={{float:'right',fontWeight:'bold',fontSize:'20px',margin:'40px'}}>{props.data.orderItems.length} items</span>
                </div>
                <div className="mt-4" style={{borderBottom:'1px solid #f3f3f3'}}>
                     <h3 className="pl-5" style={{fontSize:'20px'}}>Hey <span style={{fontWeight:'bold'}}>{user.firstName},</span></h3>
                     <h2 style={{color:'var(--mainColor',fontSize:'26px',margin:'20px 40px'}}><DoneIcon fontSize='inherit' style={{fontSize:'30px'}}/><span className="ml-3">Your Order is confirmed</span></h2>
                     <p style={{fontSize:'20px',margin:'20px 40px'}}>Thanks for shopping! Your Order<span style={{color:'blue'}}> {props.data.orderItems[0].sku.product.name}</span> and
                     <span style={{color:'blue'}}> {props.data.orderItems.length-1} more items</span> hasn't shipped yet, but we'll send you an email while it does.</p>
                </div>
                <div className="row" style={{borderBottom:'1px solid #f3f3f3'}}>
                    <div className="col-md-6 pt-3" style={{margin:'20px 40px'}}>
                         <h6 style={{fontSize:'20px'}}>Order: <span style={{color:'blue'}}>#{props.data.id+100000}</span></h6>
                         <button className="order_btn">View or Manage Order</button>
                    </div>
                    <div className="col-md-4">
                          <div className="price_conf mt-5">
                              <p>Sub Total - <span>₹ {props.data.price}</span></p>
                              <p>+Tax - <span>₹ 0</span></p>
                              <p>Total - <span>₹ {props.data.price}</span></p>
                          </div>
                    </div>
                </div>
                <div style={{fontSize:'20px',margin:'20px 40px'}}>                    
                      {props.data.orderItems.map(itm =>{
                          return(
                            <div className = "row" style={{margin:'20px  0'}}>
                            <div className="col-md-2">
                                <img src={itm.sku.images[0].src} style={{width:'70%',margin:'auto',padding:'10px'}} />
                            </div>
                            <div className="col-md-8" style={{padding:'10px 0'}}>
                               <h4 style={{color:'blue',fontSize:'20px'}}>{itm.sku.product.name}</h4>
                               <p style={{color:'grey',fontSize:'15px'}}>Seller:<span style={{color:'blue'}}> Laladukaan</span></p>
                            </div>
                            <div className="col-md-2" style={{float:'right',color:'grey',textAlign:'center',padding:'10px 0'}}>
                                 ₹{itm.sku.price}
                            </div>
                       </div>
                          )
                      })}
                   
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