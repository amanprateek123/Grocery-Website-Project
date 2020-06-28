import React from 'react'
import Check from '../../components/Checkout/Checkout'
import Price from '../../components/Checkout/PriceDetail'
import './Checkout.scss'

export default function Checkout() {
    return (
        <div className="checkout12 row" style={{margin:'0 auto',width:'95%'}}>
           <div className="col-md-9">
               <Check/>
           </div>
           <div className="col-md-3">
               <Price/>
           </div>
        </div>
    )
}
