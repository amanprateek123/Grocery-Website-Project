import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Select, MenuItem, Fab, InputLabel, CardActionArea } from '@material-ui/core';
import './Price.scss'
import { connect } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';

const deliveryCharges = (distance, price, weight = 0, extraCharges = 0) => {
    return parseInt(distance * 2) + weight * 0.5 + extraCharges;
}

function PriceDetail(props) {

    const [price, setPrice] = useState(0)
    const [shippingCharges, setShippingCharges] = useState(0)
    const [whole,setWhole] = useState(true)
    const [detail,setDetail] = useState(null)

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
  
     const [coupon,setCoupon] = useState(false)
      const [code,setCode] = useState('')
      const [data,setData]=useState(null)

      useEffect(() => {
        fetch('/admin/offers', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }).then(res => res.json()).then(res => {
              setData(res)
        })
    }, [data])
    let coup

   const [valid,setValid] = useState()

  const apply=(codes)=>{
    if (data){
        coup = data.find(itm=>itm.offerCode===codes)
        console.log(coup)
        setDetail(coup)
        if(coup){
            setValid(1)
            setWhole(false)
            setDiscount(coup.discount)
        }
        else{
            setValid(0)
        }
   } 
  }
  const [discount,setDiscount]=useState(0)
  const rem_offer = ()=>{
      setValid(2)
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
                                    <div className="hel_price">
                                        ₹ {price}
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="price_det">
                            <div style={{ width: '100%' }}>
                                Delivery Charges
                            <span>
                                    <div className="hel_price">
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
                          <input type="text" onChange={(e)=>setCode(e.target.value)} /><span><Button color="secondary" variant="contained" onClick={()=>apply(code)} >Apply</Button></span>
                        </div>:null}                        
                     </div>:null}
                     {valid===0?<div>
                         <p style={{color:'red',fontSize:'11px'}}>Invalid Coupon.Try another!</p>
                         </div>:valid===1?
                         <div className="applied">
                           Coupon : {detail.offerCode} Appllied! ({detail.discount}% off) <span className="cross_offer" ><CloseIcon fontSize="inherit" onClick={rem_offer} /></span>
                         </div>:null}
                        
                        <div className="price_total">
                            <div className="price_det">
                                <div style={{ width: '100%' }}>
                                    Total Payable
                            <span>
                            {valid===1?
                                        <div className="hel_price">
                                        <strike style={{fontWeight:'normal',color:'grey'}}>₹ {price + shippingCharges}</strike><span className="ml-2">₹ {price + shippingCharges - (discount/100)*price}</span>
                                    </div>:
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