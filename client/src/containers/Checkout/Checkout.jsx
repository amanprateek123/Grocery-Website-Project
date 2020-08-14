import React, { useState } from 'react'
import Check from '../../components/Checkout/Checkout'
import Price from '../../components/Checkout/PriceDetail'
import './Checkout.scss'
import { useEffect } from 'react';
import OrderConf from './OrderConfirm/OrderConfirmation'

export default function Checkout() {
    const [placedOrder, setPlacedOrder] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [address, setAddress] = useState(null)

    useEffect(() => {
        console.log(orderData);
    }, [orderData])

    return (
        !placedOrder ?
            <div className="checkout12 row" style={{ margin: '0 auto', width: '95%' }}>
                <div className="col-md-9">
                    <Check setPlacedOrder={setPlacedOrder} setOrderData={setOrderData} setAddress={setAddress} />
                </div>
                <div className="col-md-3">
                    <Price address={address} />
                </div>
            </div>
            :
            <OrderConf data={orderData} />
    )
}
