import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Select, MenuItem, Fab } from '@material-ui/core';

import './Product.scss'

const Product = (props) => {
    const product = props.product;

    const [selectedSKU, setSelectedSKU] = useState(product.skus ? product.skus[0] : null);


    return (
        <Card className="product" variant="outlined">
            <CardMedia
                className="card-image"
                title="Apple"
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
            </CardContent>
            <CardActions>
                <Button color="primary">Add</Button>
                {product.skus ?
                    product.skus[0] ?
                        <Select defaultValue={product.skus[0]} className="pack-size" onChange={(e) => setSelectedSKU(e.target.value)}>
                            {
                                product.skus.map(sku => <MenuItem key={sku.id} value={sku}>{sku.name}</MenuItem>)
                            }
                        </Select>
                        : null
                    : null
                }
            </CardActions>
        </Card>
    );
}

export default Product;