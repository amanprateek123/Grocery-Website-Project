import React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useState, useRef } from 'react';

import {
    Grid, Card, CardContent, Paper, Typography, FormControl,
    InputLabel, Snackbar, CircularProgress, LinearProgress, Select, MenuItem, Button, Accordion, AccordionSummary, AccordionDetails
}
    from '@material-ui/core';
import './Orders.scss'


function Orders(props) {

    const [page, setPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [meta, setMeta] = useState(null);
    const [status, setStatus] = useState(' ')

    useEffect(() => {
        try {
            fetch(`/admin/orders?status=${status != ' ' ? status : ''}&page=${page}`).then(async res => {
                let _orders = await res.json();
                setOrders(_orders.orders);
                setMeta(_orders.meta);
            })
        }
        catch (err) {
            console.log(err);
        }
    }, [page, status])

    const handleChange = (e) => {
        setStatus(e.target.value)
    }

    return (
        <div className="admin-orders">
            <div className="container">
                <h1>Orders</h1>
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
                        <MenuItem value='ordered'>Ordered</MenuItem>
                        <MenuItem value='packed'>Packed</MenuItem>
                        <MenuItem value='shipped'>Shipped</MenuItem>
                        <MenuItem value='delivered'>Delivered</MenuItem>
                    </Select>
                </div>
                <div className="row">
                    <div className="col-9">
                        <div className="orders">
                            {
                                orders.map((order, i) => (
                                    <Accordion key={order.id}>
                                        <AccordionSummary>
                                            <div className="row w-100 summary">
                                                <div className="col-1"><b>#{order.id}</b></div>
                                                <div className="col-2">{order.user.firstName + ' ' + order.user.lastName}</div>
                                                <div className="col-2">{order.orderItems.length} Items</div>
                                                <div className="col-1">{order.paymentType}</div>
                                                <div className="col-2">${order.price}</div>
                                                <div className="col-2" style={{ color: ['#2862ff', '#ff9900', '#ff0066', '#00cc77'][order.statusId - 1] }}>
                                                    <b>{order.status.status}</b>
                                                </div>
                                                <div className="col-2"><small>{new Date(order.createdAt).toLocaleString()}</small></div>

                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails className="details">
                                            <div>
                                                {
                                                    order.orderItems.map(oi => (
                                                        <div className="row" key={oi.id}>
                                                            {oi.sku.product.name}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-3">
                        {meta ?
                            <div className="row stats">
                                <div className="col-6" style={{ color: '#2862ff' }}>
                                    <h1>{meta.count.ordered}</h1>
                                    <div>Orders</div>
                                </div>
                                <div className="col-6" style={{ color: '#ff0066' }}>
                                    <h1>{meta.count.shipped}</h1>
                                    <div>Shipped</div>
                                </div>
                                <div className="col-6" style={{ color: '#ff9900' }}>
                                    <h1>{meta.count.packed}</h1>
                                    <div>Packed</div>
                                </div>
                                <div className="col-6" style={{ color: '#00cc77' }}>
                                    <h1>{meta.count.delivered}</h1>
                                    <div>Delivered</div>
                                </div>
                            </div>
                            : null
                        }
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