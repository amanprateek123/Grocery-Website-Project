import React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useState, useRef } from 'react';

import {
    Grid, Card, CardContent, Paper, Typography, FormControl,
    InputLabel, Snackbar, CircularProgress, LinearProgress, Select, MenuItem, Button, Accordion, AccordionSummary, AccordionDetails
}
    from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import './Orders.scss'

import Order from './Order/Order'


import Swal from 'sweetalert2';


function Orders(props) {

    const [page, setPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [meta, setMeta] = useState(null);
    const [status, setStatus] = useState(' ')



    const fetchOrders = () => {
        try {
            fetch(`/shipping/orders?status=${status != ' ' ? status : ''}&page=${page}`, {
                headers: {
                    'Authorization': 'Bearer ' + props.idToken,
                    'Content-Type': 'application/json'
                },
            })
                .then(async res => {
                    if (res.status == 200) {

                        let _orders = await res.json();
                        console.log(_orders);
                        if (Array.isArray(_orders.orders)) {
                            setOrders(_orders.orders);
                            setMeta(_orders.meta);
                        }
                    }
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [page, status])

    const handleChange = (e) => {
        setStatus(e.target.value)
    }

    let statusColors = ['#2862ff', '#ff9900', '#ff0066', '#00cc77'];

    const changeStatus = async (order, statusId) => {
        let orderId = order.id;
        let body = {
            orderId,
            statusId
        };

        switch (statusId) {
            case 1:
                break;

            case 2:
                let p_result = await Swal.fire({
                    title: 'Item Packed',
                    text: 'Change Status to packed?',
                    icon: 'question',
                    showCancelButton: true,
                })
                if (p_result.isDismissed) {
                    return;
                }
                break;


            case 3:

                let delivery_guys = await fetch(`/admin/get-users?role=D`, {
                    headers: {
                        'Authorization': 'Bearer ' + props.idToken,
                        'Content-Type': 'application/json'
                    },
                });
                delivery_guys = await delivery_guys.json();

                let select_options = delivery_guys.reduce((acc, cur) => {
                    acc[cur.id] = cur.firstName + ' ' + cur.lastName;
                    return acc;
                }, {})

                let s_result = await Swal.fire(
                    {
                        title: 'Ship Product',
                        text: 'Assign a Delivery Guy',
                        icon: 'question',
                        showCancelButton: true,
                        input: 'select',
                        inputOptions: select_options,
                        inputPlaceholder: 'Delivery By',
                    }
                )


                if (s_result.isDismissed || s_result.value == '') {
                    return;
                }
                // console.log(s_result);
                body.userId = s_result.value;

                s_result = await Swal.fire(
                    {
                        text: 'Expected Delivery Date',
                        icon: 'question',
                        showCancelButton: true,
                        input: 'text',
                        inputPlaceholder: 'MM/DD/YYYY',
                        inputValidator: (value) => {
                            let date = new Date(value);
                            if (!date.getDate()) {
                                return 'Invalid Date';
                            }
                        }
                    }
                )

                if (s_result.isDismissed) {
                    return;
                }
                // console.log(s_result);
                body.deliverOn = new Date(s_result.value).toISOString();

                break;
            case 4:
                let d_result;
                if (order.verifyDelivery) {
                    d_result = await Swal.fire({
                        title: 'Delivered',
                        icon: 'question',
                        text: 'Need Verification : Ask the User for OTP to mark this order Delivered.',
                        showCancelButton: true,
                        input: 'text',
                        inputPlaceholder: 'OTP',
                    })

                    body.deliveryOtp = d_result.value;
                }
                else {
                    d_result = await Swal.fire({
                        title: 'Delivered',
                        text: 'Are you sure to mark the Order Delivered?',
                        icon: 'question',
                        showCancelButton: true,
                    })
                }
                if (d_result.isDismissed) {
                    return;
                }
                break;
        }

        fetch(`/shipping/set-status`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(async res => {
            if (res.status == 200) {
                res = await res.json();
                if (res.status == 200) {
                    fetchOrders();
                }
                else {
                    Swal.fire({
                        title: 'Oops! ',
                        text: "OTP don't match!",
                        icon: 'error',
                        toast: true,
                        timerProgressBar: true,
                        timer: 2000
                    })
                }
            }
        });
    }

    return (
        <div className="shipping-orders">

            <div className="container">
                <h1>Shipping Orders</h1>
                <div className="row p-3 px-4">
                    <Select
                        labelId="status-label"
                        id="status"
                        value={status}
                        defaultValue=" "
                        style={{ minWidth: '5em' }}
                        onChange={handleChange}
                    >
                        <MenuItem value=' '>All</MenuItem>
                        {/* <MenuItem value='ordered'>Ordered</MenuItem> */}
                        {/* <MenuItem value='packed'>Packed</MenuItem> */}
                        <MenuItem value='shipped'>Shipped</MenuItem>
                        <MenuItem value='delivered'>Delivered</MenuItem>
                    </Select>
                </div>
                <div className="row" style={{ flexWrap: 'wrap-reverse' }}>
                    <div className="col">
                        <div className="orders">
                            {
                                orders.map((order, i) => (
                                    <Accordion key={order.id}>
                                        <AccordionSummary>
                                            <div className="row w-100 summary">
                                                <div className="col-xs-6 col-md-1"><b>#{order.id}</b></div>
                                                <div className="col-xs-6 col-md-2">{order.user.firstName + ' ' + order.user.lastName}</div>
                                                <div className="col-xs-6 col-md-2">{order.orderItems.length} Items</div>
                                                <div className="col-xs-6 col-md-1">{order.paymentType}</div>
                                                <div className="col-xs-6 col-md-2">${order.price}</div>
                                                <div className="col-xs-6 col-md-2" style={{ color: statusColors[order.statusId - 1] }}>
                                                    <b>{order.status.status}</b>
                                                </div>
                                                <div className="col-2 date"><small>{new Date(order.createdAt).toLocaleString()}</small></div>

                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails className="details">
                                            <Order order={order} statusColors={statusColors} changeStatus={changeStatus} />
                                        </AccordionDetails>
                                    </Accordion>
                                ))
                            }
                        </div>
                    </div>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Orders);