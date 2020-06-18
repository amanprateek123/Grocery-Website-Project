import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Select, MenuItem, Fab, InputLabel, CardActionArea } from '@material-ui/core';

import './Product.scss'

const Product = (props) => {
    const product = props.product;

    const [selectedSKU, setSelectedSKU] = useState(product.skus ? product.skus[0] : null);


    return (
        <Card className="product" variant="outlined">
            <CardActionArea>
                <CardMedia
                    className="card-image"
                    title="Product"
                    image={selectedSKU ? selectedSKU.images ? selectedSKU.images[0].src : null : null}
                />
                <CardContent>
                    <div className="badge badge-info pb-1">{product.category.name}</div>
                    <h5 className="mb-0">{product.name}</h5>
                    <Typography variant="body2" color="textSecondary" className="mb-2 company" component="p">{product.brand}</Typography>
                    <Typography variant="body2" color="textSecondary" className="desc" component="p">
                        {product.description}
                    </Typography>

                    <Typography variant="button" color="textPrimary" component="p">
                        Rs {selectedSKU ? selectedSKU.price : '$$$'} <span className="info">(inclusive all taxes)</span>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className="delivery" component="p">
                        standard delivery time : 6pm-7pm
                </Typography>
                    {/* {product.skus ?
                    product.skus[0] ?
                        <div className="variants">
                            <InputLabel id="variant-label" >variant</InputLabel>
                            <Select defaultValue={product.skus[0]} labelId="variant" className="pack-size" onChange={(e) => setSelectedSKU(e.target.value)}>
                                {
                                    product.skus.map(sku => <MenuItem key={sku.id} value={sku}>{sku.name}</MenuItem>)
                                }
                            </Select>
                        </div>
                        : null
                    : null
                } */}
                </CardContent>
                <Link to={`/product/${product.id}`} className='stretched-link' />
            </CardActionArea>
            <CardActions className="card-actions">
                <div className="btn btn-full add-to-cart">Add to Cart</div>

            </CardActions>

        </Card>
    );
}

export default Product;