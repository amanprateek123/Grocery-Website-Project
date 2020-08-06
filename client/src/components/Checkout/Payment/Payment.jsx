import React from 'react'
import '../Checkout.scss'
import './Payment.scss'
import DoneIcon from '@material-ui/icons/Done';
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

import { useMutation } from 'react-query'
import { useEffect } from 'react';

const Payment = (props) => {


    const placeOrderPOST = () => {
        let shippingAddress = props.address[props.addrIndex];
        delete shippingAddress.id
        delete shippingAddress.userId
        delete shippingAddress.createdAt
        delete shippingAddress.updatedAt
        let paymentType = document.querySelector('input[name=paymentType]:checked');
        if (!paymentType) {
            throw new Error('No payment method selected.')
            return;
        }
        paymentType = paymentType.value;

        return fetch('/post-order', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                shippingAddress,
                paymentType
            })
        }).then(async res => {
            res = await res.json();
            console.log(res)
            props.setOrderData(res);
            if (res.status == 400) {
                return 'Cart is Emply';
            }
            props.emptyCart();

            return 'Order Placed Successfully.';
        }).catch(err => {
            console.log(err);
        })

    }

    const [placeOrder, payMeta] = useMutation(placeOrderPOST)

    useEffect(() => {
        props.setPlacedOrder(payMeta.isSuccess)
    }, [payMeta])

    const pay = (
        <div className="order_det">
            <h3>
                <span className="span1">
                    3
            </span>
                <span className="span2">
                    Payment Option
            </span>
            </h3>
            <div style={{ marginBottom: '8px' }}>
                <label className="pay_label">
                    <input type="radio" id="radio" name='paymentType' value="COD" />
                    <div className="mode">
                        COD
                   </div>
                </label>
                <label className="pay_label">
                    <input type="radio" id="radio" name='paymentType' value="CARD" />
                    <div className="mode">
                        Credit Card / Debit Card / ATM Card
                   </div>
                </label>
                <label className="pay_label">
                    <input type="radio" id="radio" name='paymentType' value="UPI" />
                    <div className="mode">
                        UPI(PhonePe / Google Pay / BHIM)
                   </div>
                </label>
                <label className="pay_label">
                    <input type="radio" id="radio" name='paymentType' value="NET BANKING" />
                    <div className="mode">
                        Net Banking
                   </div>
                </label>
                <label className="pay_label">
                    <input type="radio" id="radio" name='paymentType' value="EMI" />
                    <div className="mode">
                        EMI (Easy Installments)
                   </div>
                </label>
            </div>
            <div className="confirm">
                <span className="error">
                    {payMeta.isError ? payMeta.error.message : null}
                    {payMeta.isSuccess ? JSON.stringify(payMeta.data) : null}
                </span>
                <span>
                    {
                        props.cart.filter(ci => ci.sku.stockQuantity === 0).length ?
                            <div className="error">Please remove the products in your cart which are Out of Stock.</div>
                            : <button className="cont_order" onClick={placeOrder}>Continue</button>
                    }
                </span>
            </div>
        </div>
    )

    return (
        <React.Fragment>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div className="deli_sum">
                    <div className="child_del">
                        <div>
                            <div className="del_tit">
                                Delivery address
                       <DoneIcon className="done_del" />
                            </div>
                        </div>
                        <div className="add_list">
                            <input type="radio" checked className="del_rad" />
                            <span className="del_name">
                                {props.address[props.idx].name}
                            </span>
                            <span className="span_plac">Home</span><span className="span_num">{props.address[props.idx].mobile}</span>
                            <br />
                            <span style={{ marginLeft: '3%' }}> {props.address[props.idx].address}</span>
                            <br />
                            <span style={{ marginLeft: '3%' }}> {props.address[props.idx].state}, <span> {props.address[props.idx].country} - <span>{props.address[props.idx].zip}</span></span></span>
                        </div>
                        <button className="del_chng" onClick={props.change}>Change</button>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '-1%' }}>
                <div className="deli_sum">
                    <div className="child_del">
                        <div>
                            <div className="del_tit">
                                Order Summary
                       <DoneIcon className="done_del" />
                            </div>
                        </div>
                        <input type="radio" checked className="del_rad" />
                        <span className="add_list_1">
                            <div className="col-md-6">
                                <p style={{ fontSize: "16px" }}>Laladukaan Basket <span style={{ fontWeight: 'bold' }}>({props.cart.length} items)</span></p>
                            </div>
                            <div className="order_list_sum">
                                <div className="row" style={{ minHeight: '56px', width: '60%' }}>
                                    {props.cart.map(itm => {
                                        return (
                                            <div className="list_img col-md-2" style={{backgroundImage:`url(${itm.sku.images[0].src})`}}>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <button className="del_chng1" onClick={props.change1}>Change</button>
                        </span>
                    </div>
                </div>
            </div>
            {pay}
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
        setResponse: (response) => dispatch({ type: actions.SET_RESPONSE, response: response }),
        logout: () => dispatch(actions.logout()),
        emptyCart: () => dispatch({ type: actions.SET_CART, cart: [] })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);