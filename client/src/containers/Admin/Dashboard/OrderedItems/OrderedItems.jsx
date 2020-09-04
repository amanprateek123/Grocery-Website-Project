import React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom'

import {
    Grid, Card, CardContent, Paper, Typography, FormControl,
    InputLabel, Snackbar, CircularProgress, LinearProgress, Select, MenuItem, Button
}
    from '@material-ui/core';
import './OrderedItems.scss'

import site from '../../../../site_config';

function Orders(props) {

    const [orderedItems, setOrderedItems] = useState([]);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('')


    const fetchOrderedItems = () => {
        try {
            fetch(`/admin/ordered-items?status=${status != ' ' ? status : ''}&page=${page}`, {
                headers: {
                    'Authorization': 'Bearer ' + props.idToken,
                    'Content-Type': 'application/json'
                },
            })
                .then(async res => {
                    if (res.status == 200) {

                        let _orders = await res.json();
                        // console.log(_orders);
                        setOrderedItems(_orders);
                        // setMeta(_orders.meta);
                    }
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchOrderedItems();
    }, [page])

    return (
        <div className="admin-orders ordered-items">
            <h1>Ordered Items</h1>
            <div className="details">
                <div className="items">
                    <div className="item row header">
                        <div className="col-3 skuCode" >SKU</div>
                        <div className="col-4 Name" >Product Name</div>
                        <div className="col-1 Qty" >Qty</div>
                        <div className="col-2 u-price" >Unit Price</div>
                        <div className="col-2 n-price" >Stocks Available</div>
                    </div>
                    {
                        orderedItems.map(sku => (
                            <div key={sku.id} className="item row">
                                <div className="col-3 skuCode" >
                                    <span className="text-muted">{sku.id} | </span>
                                    {sku.code}
                                </div>
                                <div className="col-4 Name" >
                                    <Link to={`/product/${sku.product.id}`}>
                                        <span className="text-muted">{sku.product.id} | </span>
                                    </Link>
                                    {sku.product.name}
                                </div>
                                <div className="col-1 Qty" >{sku.orderItems.length}</div>
                                <div className="col-2 u-price" >{sku.price}</div>
                                <div className="col-2 n-price" >{sku.stockQuantity + sku.orderItems.length}</div>
                            </div>
                        ))
                    }
                    <div className="item row footer">
                        <div className="col-3 skuCode" ></div>
                        <div className="col-4 Name" ></div>
                        <div className="col-1 Qty" ></div>
                        {/* <div className="col-2 u-price" >Sub Total</div> */}
                        {/* <div className="col-2 n-price" >{order.orderItems.reduce((acc, cur) => acc + cur.sku.price * cur.quantity, 0)}</div> */}
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