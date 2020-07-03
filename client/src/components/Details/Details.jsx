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
import { useEffect } from 'react';
import { isEqual } from 'lodash'

const Detail = (props) => {

    let json = props.product.skus[props.pack].json;

    let [attrs, setAttrs] = useState(props.product.skus[props.pack].attributes.reduce((acc, cur) => { (acc[cur.name] = cur.value); return acc }, {}));

    const quantity = props.quantity
    let content = [];
    const [added, setAdded] = useState(false);

    if (json) {
        json = JSON.parse(json);
        for (let i = 0; i < 3; i++) {
            if (json && json[i]) {
                content.push(
                    <div key={json[i].key + i} className="json">
                        < h5 > {json[i].key}</h5 >
                        <div className="lister attr">
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
    }
    let product = props.product;

    const attrChangeHandler = (e) => {
        let index;
        let _attrs = { ...attrs };
        _attrs[e.target.name] = e.target.value;
        setAttrs(_attrs)
        let _sku = product.skus.find((s, i) => Boolean(JSON.stringify(_attrs).trim() == JSON.stringify(s.attributes.reduce((acc, cur) => { (acc[cur.name] = cur.value); return acc }, {})).trim()) && (index = i));
        // let _sku = product.skus.find((s, i) => isEqual(_attrs, s.attributes.reduce((acc, cur) => { (acc[cur.name] = cur.value); return acc }, {})) ? (index = i) : console.log(isEqual(_attrs, s.attributes.reduce((acc, cur) => { (acc[cur.name] = cur.value); return acc }, {}))));
        if (index != undefined) { props.handle(index) }

    }

    let attributes = (
        <div className="attrs">
            {product.skus[0].attributes.map((attr, i) => (
                <div key={attr + i} className="d-inline-block attr-sel">
                    <InputLabel className="label-sm" id={'label-' + attr.name}>{attr.name}</InputLabel>
                    <Select
                        element='select'
                        key={attr.name}
                        id={attr.name}
                        name={attr.name}
                        labelId={'label-' + attr.name}
                        className='attr-select'
                        value={props.product.skus[props.pack].attributes[i].value}
                        onChange={attrChangeHandler}
                    >
                        {
                            Array.from(new Set(product.skus.map(sku => sku.attributes.find(a => a.name == attr.name).value))).map(val => (
                                <MenuItem key={val} value={val}>{val}</MenuItem>
                            ))
                        }
                    </Select>

                </div>

            ))}
        </div>
    )

    return (
        <Card variant="outlined" className="card_det" >
            <CardContent>
                <div className="detail_head">
                    <p><u>{props.product.category.name}</u></p>
                    <h3>{`${props.product.name} - ${props.product.skus[props.pack].name}`}</h3>
                </div>
                <div className="detail_price">
                    <h6>MRP:<span><b>Price Rs.{props.product.skus[props.pack].price * (quantity)}</b></span>(inclusive of all taxes)</h6>
                </div>
                <div style={{ marginTop: "4%" }}>
                    {
                        props.product.skus[1] ?
                            <div>
                                <Select
                                    id="sku-selected"
                                    value={props.product.skus[props.pack].name}
                                    defaultValue={props.product.skus[props.pack].name}
                                    onClick={props.handleChange}>
                                    {props.product.skus.map((sku, i) =>
                                        <MenuItem key={sku.id} value={sku.name} onClick={() => props.handle(i)} id={sku.id}>{sku.name}</MenuItem>
                                    )}

                                </Select>
                                <div className="position-relative">
                                    {attributes}
                                </div>
                            </div>
                            : null
                    }
                </div>
                <div className="detail_cart">
                    <input type="text" value={quantity} onChange={props.handler} className="input12" />
                    <Button variant="contained" className={`detail_btn ${added ? 'added' : ''}`}
                        onClick={() => {
                            props.addToCart(props.product.skus[props.pack].id)
                            setAdded(true);
                            setTimeout(() => setAdded(false), 2000)
                        }}>
                        {added ? props.userName ? "ADDED TO CART" : "Please Login" : "ADD TO CART"}
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

                {/* {props.product.skus[props.pack].attributes ?
                    <div className="lister">
                        {props.product.skus[props.pack].attributes.map(attr => (
                            <li className="list">
                                <h6>{attr.name}</h6>
                                <p>{attr.value}</p>
                            </li>
                        ))}
                    </div>
                    : null
                } */}
                {content}
            </CardContent>
        </Card>
    )
}


const mapStateToProps = state => {
    return {
        userName: state.userName
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setResponse: (response) => dispatch({ type: actions.SET_RESPONSE, response: response }),
        addToCart: (SKUId) => dispatch(actions.addToCart(SKUId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);