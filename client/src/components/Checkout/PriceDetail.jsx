import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Select, MenuItem, Fab, InputLabel, CardActionArea } from '@material-ui/core';
import './Price.scss'
import { connect } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

const deliveryCharges = (distance, price, weight = 0, extraCharges = 0) => {
    return parseInt(distance * 2) + weight * 0.5 + extraCharges;
}

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

function PriceDetail(props) {

    const [price, setPrice] = useState(0)
    const [shippingCharges, setShippingCharges] = useState(0)
    const [whole, setWhole] = useState(true)
    const [detail, setDetail] = useState(null)

    useEffect(() => {
        let _price = 0;
        props.cart.forEach(itm => {
            if (itm.sku) {
                _price += itm.quantity * (itm.sku.price)
            }
        })
        let totalWeight = props.cart.reduce((acc, cur) => acc + cur.sku.weight * Math.min(cur.quantity, cur.sku.stockQuantity), 0);
        let totalExtraCharges = props.cart.reduce((acc, cur) => acc + cur.sku.extraCharges * Math.min(cur.quantity, cur.sku.stockQuantity), 0);
        setPrice(_price);
        setShippingCharges(deliveryCharges(props.address?.distance, price, totalWeight, totalExtraCharges))

    }, [props.address])

    const [coupon, setCoupon] = useState(false)
    const [code, setCode] = useState('')
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('/admin/offers', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }).then(res => res.json()).then(res => {
            setData(res)
        })
    }, [code])
    let coup

   const [valid,setValid] = useState()

  const apply=(codes)=>{
    if (data){
        coup = data.find(itm=>itm.offerCode===codes)
        console.log('coup',coup)
        setDetail(coup)
        
        if(coup){
          let d = new Date()
          let e = new Date(coup.endDate)
          let f = new Date(coup.startDate)
          if(d.getTime()<=e.getTime() && d.getTime()>=f.getTime()){
            if(price<coup.minAmt){
                setValid(4)
            }
            else{
            setValid(1)
            setWhole(false)
            setDiscount(coup.discount)
            }
          }
          else if(d.getTime()<f.getTime()){
              setValid(3)
          }
          else{
              setValid(2)
          }   
        }
        else{
            setValid(0)
        }
   } 
  }
  const [discount,setDiscount]=useState(0)
  const rem_offer = ()=>{
      setValid(5)
      setWhole(true)
      setDiscount(0)
      setCoupon(false)
  }


    return (
        <React.Fragment>
            <Card style={{ backgroundColor: 'white', marginLeft: '10px', marginTop: '15px', borderRadius: '4px', minHeight: '50px' }}>
                <CardContent style={{ paddingBottom: '0' }}>
                    <Typography style={{ color: '#878787', borderBottom: '1px solid #f0f0f0', padding: '10px 0' }}>
                        PRICE DETAILS
                </Typography>
                    <div className="price_list">
                        <div className="price_det">
                            <div style={{ width: '100%' }}>
                                Price({props.cart.length} item)
                            <span>
                                    <div className="hel_price" style={{fontSize:'16px'}}>
                                        ₹ {price}
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="price_det">
                            <div style={{ width: '100%' }}>
                                Delivery Charges
                            <span>
                                    <div className="hel_price" style={{fontSize:'16px'}}>
                                        ₹ {shippingCharges}
                                    </div>
                                </span>
                            </div>
                        </div>
                       {whole?
                        <div className="coupons">
                        <h6 onClick={()=>setCoupon(true)} >Apply coupon code?</h6>
                         {coupon?
                        <div className="code">
                          <input type="text" onChange={(e)=>setCode(e.target.value)} /><span><DoneIcon onClick={()=>apply(code)} style={{margin:'0 10px'}} /><CloseIcon onClick={()=>setCoupon(false)}/></span>
                        </div>:null}                        
                     </div>:null}
                     {valid===0?<div>
                         <p style={{color:'red',fontSize:'11px'}}>Invalid Coupon.Try another!</p>
                         </div>:valid===1?
                         <div className="applied">
                           Coupon : {detail.offerCode} Appllied! ({detail.discount}% off) <span className="cross_offer" ><CloseIcon fontSize="inherit" onClick={rem_offer} /></span>
                         </div>:
                         valid===2?<p style={{color:'red',fontSize:'11px'}}>Sorry,this coupon is expired!</p>
                     :valid===3?<p style={{color:'red',fontSize:'11px'}}>This coupon is valid after {new Date(detail.startDate).getDate()} {month[new Date(detail.startDate).getMonth()]} {new Date(detail.startDate).getFullYear()} </p>
                         :valid===4?<p style={{color:'red',fontSize:'11px'}}>Your Order price should be above ₹{detail.minAmt} </p>
                         :null}
                        
                        <div className="price_total">
                            <div className="price_det">
                                <div style={{ width: '100%',fontSize:'16px' }}>
                                    Total Payable
                            <span>
                                        {valid === 1 ?
                                            <div className="hel_price">
                                                <strike style={{ fontWeight: 'normal', color: 'grey' }}>₹ {price + shippingCharges}</strike><span className="ml-2">₹ {price + shippingCharges - (discount / 100) * price}</span>
                                            </div> :
                                            <div className="hel_price">
                                                ₹ {price + shippingCharges}
                                            </div>}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="price_det">
                        <div style={{ width: '100%', color: 'darkgreen', fontWeight: 'bold', padding: '5px 20px' }}>
                            Your Total Savings on this order ₹ {((discount/100)*price).toFixed(2)}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="price_foot">
                <img src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/shield_a7ea6b.png" />
                <span>
                    Safe and Secure Payments. Easy returns. 100% Authentic Products.
            </span>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceDetail)