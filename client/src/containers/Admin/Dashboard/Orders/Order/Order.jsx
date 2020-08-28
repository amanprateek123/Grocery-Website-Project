import React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useState, useRef } from 'react';

import {
    Grid, Card, CardContent, Paper, Typography, FormControl,
    InputLabel, Snackbar, CircularProgress, LinearProgress, Select, MenuItem, Button, Accordion, AccordionSummary, AccordionDetails
}
    from '@material-ui/core';
import './Order.scss'
import site from '../../../../../site_config.js';
import { Link } from 'react-router-dom';


function Order(props) {

    let order = props.order;
    let statusColors = props.statusColors;

    return (
        <div className="admin-order">
            <div className="user">
                <div className="row" style={{ padding: '10px 15px' }}>
                    <div className="col-md-4">
                        <h5 style={{ fontSize: '16px', fontWeight: 'bold' }}>Shipping Address</h5>
                        <div style={{ fontSize: '13px' }}>
                            {JSON.parse(order.shippingAddress).address}<br />
                      State: <span style={{ fontWeight: 'bold' }}> {JSON.parse(order.shippingAddress).state} </span><br />
                      Country: <span style={{ fontWeight: 'bold' }} > {JSON.parse(order.shippingAddress).country} </span><br />
                      Pin Code: <span style={{ fontWeight: 'bold' }} > {JSON.parse(order.shippingAddress).zip} </span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h5 style={{ fontSize: '16px', fontWeight: 'bold' }}>Payment Method</h5>
                        <p style={{ fontSize: '13px' }}> {order.paymentType} </p>
                        <div className="mt-4" style={{ fontSize: '16px' }}>
                            {/* Download <span style={{ color: 'var(--mainColor)', cursor: 'pointer' }} onClick={() => getInvoice(orderId)}>Invoice</span> */}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h5 style={{ fontSize: '16px', fontWeight: 'bold' }}>Order Summary</h5>
                        <div style={{ fontSize: '13px' }}>
                            Item(s) Subtotal: <span style={{ float: 'right' }}> ₹{order.price - order.shippingCharges} </span><br />
                      Shipping: <span style={{ float: 'right' }}> ₹{order.shippingCharges} </span><br />
                      Total: <span style={{ float: 'right' }}> ₹{order.price} </span><br />
                            <div className="mt-3" style={{ fontWeight: 'bold' }}>
                                <span >Grand Total:</span> <span style={{ float: 'right' }}> ₹{order.price} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="items">
                <div className="item row header">
                    <div className="col-3 skuCode" >SKU</div>
                    <div className="col-4 Name" >Product Name</div>
                    <div className="col-1 Qty" >Qty</div>
                    <div className="col-2 u-price" >Unit Price</div>
                    <div className="col-2 n-price" >Net Price</div>
                </div>
                {
                    order.orderItems.map(oi => (
                        <div key={oi.id} className="item row">
                            <div className="col-3 skuCode" >
                                <span className="text-muted">{oi.sku.id} | </span>
                                {oi.sku.code}
                            </div>
                            <div className="col-4 Name" >
                                <Link to={`/product/${oi.sku.product.id}`}>
                                    <span className="text-muted">{oi.sku.product.id} | </span>
                                </Link>
                                {oi.sku.product.name}
                            </div>
                            <div className="col-1 Qty" >{oi.quantity}</div>
                            <div className="col-2 u-price" >{oi.sku.price}</div>
                            <div className="col-2 n-price" >{oi.sku.price * oi.quantity}</div>
                        </div>
                    ))
                }
                <div className="item row footer">
                    <div className="col-3 skuCode" ></div>
                    <div className="col-4 Name" ></div>
                    <div className="col-1 Qty" ></div>
                    <div className="col-2 u-price" >Sub Total</div>
                    <div className="col-2 n-price" >{order.orderItems.reduce((acc, cur) => acc + cur.sku.price * cur.quantity, 0)}</div>
                </div>
            </div>

            <div className="row status">
                <div className={`col stat ${order.statusId == 1 ? 'active' : ''}`} style={{
                    color: statusColors[0],
                    background: statusColors[0] + '55',
                }}
                    onClick={props.changeStatus.bind(this, order.id, 1)}
                >Ordered</div>
                <div className={`col stat ${order.statusId == 2 ? 'active' : ''}`} style={{
                    color: statusColors[1],
                    background: statusColors[1] + '55',
                }}
                    onClick={props.changeStatus.bind(this, order.id, 2)}
                >Packed</div>
                <div className={`col stat ${order.statusId == 3 ? 'active' : ''}`} style={{
                    color: statusColors[2],
                    background: statusColors[2] + '55',
                }}
                    onClick={props.changeStatus.bind(this, order.id, 3)}
                >Shipped</div>
                <div className={`col stat ${order.statusId == 4 ? 'active' : ''}`} style={{
                    color: statusColors[3],
                    background: statusColors[3] + '55',
                }}
                    onClick={props.changeStatus.bind(this, order.id, 4)}
                >Delivered</div>
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Order);