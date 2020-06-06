import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Select, MenuItem, Fab } from '@material-ui/core';

import './Product.scss'

const Product = (props) => {
    const product = props.product;
    return (
        <Card className="product" variant="outlined">
            <CardMedia
                className="card-image"
                title="Apple"
                image={"https://picsum.photos/300/200"}
            />
            <CardContent>
                <div className="badge badge-info pb-1">{product.category}</div>
                <h5 className="mb-0">{product.name}</h5>
                <Typography variant="body2" color="textSecondary" className="mb-2 company" component="p">{product.brand}</Typography>
                <Typography variant="body2" color="textSecondary" className="desc" component="p">
                    {product.description}
                </Typography>

                <Typography variant="button" color="textPrimary" component="p">
                    {product.price} <span className="info">(inclusive all taxes)</span>
                </Typography>
                <Typography variant="body2" color="textSecondary" className="delivery" component="p">
                    standard delivery time : 6pm-7pm
                </Typography>
            </CardContent>
            <CardActions>
                <Button color="primary">Add</Button>
                <Select defaultValue={product.packs[0]} className="pack-size">
                    {
                        product.packs.map(size => <MenuItem value={size}>{size}</MenuItem>)
                    }
                </Select>
            </CardActions>
        </Card>
    );
}

export default Product;