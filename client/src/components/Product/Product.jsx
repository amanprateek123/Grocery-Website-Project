import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Select, MenuItem, Fab, InputLabel, CardActionArea } from '@material-ui/core';
import CartIcon from '@material-ui/icons/AddShoppingCart'

import './Product.scss'

const Product = (props) => {
    let product = props.product;

    if (!product) {
        product = {
            name: "Lorem Ipsum",
            brand: "odor",
            description: "lorem ipsum odor isit.?",
            keywords: "",
            json: "",
            category: {
                name: "category"
            },
            skus: [
                {
                    code: "",
                    type: "",
                    name: "",
                    price: "100",
                    json: "",
                    images: [
                        {
                            // src: "http://picsum.photos/200/135"
                        }
                    ],
                    attributes: [
                        {
                            name: "",
                            value: ""
                        }
                    ]
                }
            ]
        }
    }

    const [selectedSKU, setSelectedSKU] = useState(product.skus ? product.skus[0] : null);


    return (
        <Card className="product" variant="outlined">
            <Link to={`/product/${product.id}`} className="stretched-link"></Link>
            <CardMedia
                className="card-image"
                title="Product"
                image={selectedSKU ? selectedSKU.images[0] ? selectedSKU.images[0].src : null : null}
            />
            <CardContent>
                <div className="badge badge-info pb-1">{product.category.name}</div>
                <h5 className="mb-0">{product.name}</h5>
                <Typography variant="body2" color="textSecondary" className="mb-2 company" component="p">{product.brand}</Typography>
                {/* <Typography variant="body2" color="textSecondary" className="desc" component="p">
                        {product.description}
                    </Typography> */}

                <Typography variant="button" color="textPrimary" component="p">
                    Rs {selectedSKU ? selectedSKU.price : '$$$'} <span className="info"></span>
                </Typography>
                {/* <Typography variant="body2" color="textSecondary" className="delivery" component="p">
                        standard delivery time : 6pm-7pm
                </Typography> */}
            </CardContent>
            <CardContent className="sku-select">
                {product.skus ?
                    product.skus[1] ?
                        product.skus[0].attributes.length == 1 ?
                            <div className="variants">
                                <Select defaultValue={product.skus[0]} labelId="variant" className="pack-size" onChange={(e) => setSelectedSKU(e.target.value)}>
                                    {
                                        product.skus.map(sku => <MenuItem key={sku.id} value={sku}>{sku.name}</MenuItem>)
                                    }
                                </Select>
                            </div>
                            : <div className="attrs">
                                {
                                    product.skus[0].attributes.map(attr => (
                                        <div>
                                            <b>{attr.name} :</b>
                                            <span>
                                                {
                                                    Array.from(new Set(product.skus.map(sku => sku.attributes.find(a => a.name == attr.name).value))).map(val => (
                                                        <span>{val}, </span>
                                                    ))
                                                }
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        : null
                    : null
                }
            </CardContent>
            <div className="space"></div>
            <CardActions className="card-actions">
                {/* <div className="btn btn-full add-to-cart"><CartIcon /> Add to Cart</div> */}
                <Link to={`/product/${product.id}`} ><Button style={{ color: '#aaa' }}>Details</Button></Link>
                {props.noCart || product.skus[0].attributes.length > 1 ? null : <Fab size="small" className="add-to-cart-btn" title={"Add to Cart"} variant="round" style={{ background: '#e35f21', color: 'white', boxShadow: '-1px 2px 10px 0 #e35f2199' }} onClick={() => { props.addToCart(selectedSKU.id); props.feedback() }}><CartIcon /></Fab>}

            </CardActions>

        </Card>
    );
}

export default Product;