import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Select, NativeSelect, MenuItem, Fab, InputLabel, CardActionArea, TextField } from '@material-ui/core';
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
        <Card className={`product ${selectedSKU.stockQuantity ? '' : 'no-stock-card'}`} variant="outlined" style={{ ...props.style }
        }>
            <Link to={`/product/${product.id}`} className="stretched-link"></Link>
            <CardMedia
                className="card-image"
                title="Product"
                image={selectedSKU.images ? selectedSKU.images[0] ? selectedSKU.images[0].src : null : null}
            />
            <CardContent className="card-content">
                {/* <div className="badge badge-info pb-1">{product.category.name}</div> */}
                <h6 className="mb-0">{product.name}</h6>
                <Typography variant="body2" color="textSecondary" className="mb-2 company" component="p">{product.brand}</Typography>
                {/* <Typography variant="body2" color="textSecondary" className="desc" component="p">
                        {product.description}
                    </Typography> */}


                {product.skus[0].attributes.length > 100 ? // ? Never Show This
                    <div className="attrs">
                        {
                            product.skus[0].attributes.map((attr, j) => (
                                <div key={attr + j}>
                                    <b>{attr.name} :</b>
                                    <span>
                                        {
                                            Array.from(new Set(product.skus.map(sku => sku.attributes.find(a => a.name == attr.name).value))).map((val, i) => (
                                                <span key={val + i}>{val}, </span>
                                            ))
                                        }
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                    : null}
                {/* <Typography variant="body2" color="textSecondary" className="delivery" component="p">
                        standard delivery time : 6pm-7pm
                </Typography> */}
            </CardContent>
            <div className="space"></div>
            <CardActions className="card-bottom">
                <div className="sku-select">
                    <Typography className="price" component="p">
                        Rs. {selectedSKU ? selectedSKU.price : '$$$'} <span className="info"></span>
                    </Typography>
                    {product.skus ?
                        product.skus[1] ?
                            product.skus[0].attributes.length == 1 ? // show this dropdown for 1 attribute case
                                <div className="variants">
                                    <select labelId="variant" className="pack-size" onChange={(e) => {
                                        console.log(e.target.value);
                                        setSelectedSKU(product.skus[e.target.value])
                                    }}>
                                        {
                                            product.skus.map((sku, i) => <option key={sku.id} value={i}>{sku.attributes[0]?.value}</option>)
                                        }
                                    </select>

                                </div>
                                : null
                            : null
                        : null
                    }
                </div>
                <div className="card-actions">
                    {
                        props.noCart || product.skus[0].attributes.length > 1 && product.skus.length > 1
                            ? null
                            : selectedSKU.stockQuantity ?
                                <React.Fragment>
                                    <TextField className="quantity-inp" type="number" defaultValue="1" label="Qty." InputProps={{ inputProps: { min: 1, max: 10 } }} />
                                    <div className="btn btn-full add-to-cart" onClick={(e) => {
                                        props.addToCart(selectedSKU.id, +e.target.parentElement.querySelector('.quantity-inp input').value)
                                        props.feedback()
                                    }}><CartIcon fontSize="small" /> Add to Cart</div>
                                </React.Fragment>
                                :
                                <div className="btn btn-full add-to-cart out-of-stock">Out of Stock</div>
                    }
                </div>
            </CardActions>


        </Card >
    );
}

export default Product;