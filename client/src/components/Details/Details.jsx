import React from 'react'
import './Details.scss'
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ChatIcon from '@material-ui/icons/Chat';
import LocalShippingSharpIcon from '@material-ui/icons/LocalShippingSharp';
import {
    Card, CardContent, FormControl, Button, Select, MenuItem, InputLabel, Badge, Chip, Checkbox, FormControlLabel
} from '@material-ui/core';
import { useState } from 'react';

import { connect } from 'react-redux'
import * as actions from '../../store/actions'

const Detail = (props) => {

    const quantity = props.quantity
    let json = JSON.parse(props.product.json);
    let content = [];

    for (let i = 0; i < 3; i++) {
        if (json && json[i]) {
            content.push(
                <div className="json">
                    < h5 > {json[i].key}</h5 >
                    <div className="lister">
                        {Array.isArray(json[i].value) ?
                            json[i].value.map(li => {
                                return (<li className="list">
                                    <h6>{li.key}</h6>
                                    <p>{li.value}</p>
                                </li>)
                            }) :
                            <p>{json[i].value}</p>}</div>
                </div >
            )
        }
    }
    return (
        <Card variant="outlined" className="card_det" style={{height:'800px'}}>
            <CardContent>
                <div className="detail_head">
                    <p><u>{props.product.category.name}</u></p>
                    <h3>{`${props.product.name} - ${props.product.skus[props.pack].name}`}</h3>
                </div>
                <div className="detail_price">
                    <h6>MRP:<span><b>Price Rs.{props.product.skus[props.pack].price * (quantity)}</b></span>(inclusive of all taxes)</h6>
                </div>
                <div style={{ marginTop: "4%" }}>
                    <FormControl style={{ minWidth: "120px" }}>
                        <InputLabel id="demo-simple-select-label">{props.product.skus[props.pack].type}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={props.product.skus[props.pack].name}
                            defaultValue={props.product.skus[props.pack].name}
                            onClick={props.handleChange}>
                            {props.product.skus.map((sku, i) =>
                                <MenuItem key={sku.id} value={sku.name} onClick={() => props.handle(i)} id={sku.id}>{sku.name}</MenuItem>
                            )}

                        </Select>
                    </FormControl>
                </div>
                <div className="detail_cart">
                    <input type="text" value={quantity} onChange={props.handler} className="input12" />
                    <Button variant="contained" className="detail_btn" onClick={() => props.addToCart(props.product.skus[props.pack].id)}>
                        ADD TO CART
                      </Button>
                    <Button variant="contained" className="detail_save">
                        <BookmarkIcon /><span>Wishlist</span>
                    </Button>
                </div>
                <div className="detail_ship">
                    <LocalShippingSharpIcon /><span>Standard: Tomorrow 9:30AM - 5:30PM</span>
                </div>
                <div className="product_detail">
                    <h1>PRODUCT DETAILS <span><ChatIcon /></span></h1>
                    <p>{props.product.description}</p>
                </div>
                {content}
            </CardContent>
        </Card>
    )
}


const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {
        setResponse: (response) => dispatch({ type: actions.SET_RESPONSE, response: response }),
        addToCart: (SKUId) => dispatch(actions.addToCart(SKUId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);