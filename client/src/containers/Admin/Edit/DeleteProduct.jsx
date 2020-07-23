import React from 'react';
import { Paper, Button, TextField, Select, MenuItem } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import UploadIcon from '@material-ui/icons/CloudUpload'
import * as actions from '../../../store/actions'
import { connect } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import '../Admin.scss'
import '../SingleUploads/AddProduct.scss'
import Product from '../../../components/Product/Product'
import { useRef } from 'react';

const DeleteProduct = (props) => {

    const [product, setProduct] = useState();
    const [productId, setProductId] = useState('')
    const [response, setResponse] = useState()


    const getProduct = (e) => {
        e.preventDefault();
        setProduct(null)
        fetch('/get-products?id=' + productId).then(res => res.json())
            .then(({ products: [product] }) => {
                if (product) {
                    setProduct(product)
                    setResponse(null)
                }
                else {
                    setResponse({ status: 400, message: 'No such product.' })
                    setProduct(null)
                }
            })

    }

    const deleteProduct = (e) => {
        e.preventDefault();
        fetch('/admin/delete-product', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: product.id
            })
        }).then(res => res.json())
            .then(res => {
                setResponse(res);
            })

    }

    return (
        <Paper className="admin-content">
            <div className="row delete-product full-width">
                <div className="col">
                    <h2>Delete Product</h2>
                    <form onSubmit={getProduct}>
                        <div className="form-group">
                            <TextField className="text-center" value={productId} onChange={(e) => setProductId(e.target.value)} label="find product by Id" name="productId" />
                        </div>
                    </form>
                    {
                        product ?
                            <div className="form-group">
                                <div>
                                    <p>Are you sure you want to DELETE this product?</p>
                                    <p>All related data (sku,images,attributes) related to this product will be deleted.</p>
                                    <Button variant="contained" color="secondary" onClick={deleteProduct}>Delete this Product</Button>
                                </div>
                            </div>
                            : null
                    }
                    {
                        response ?
                            <Alert severity={response.status == 200 ? "success" : "error"}>{response.message}</Alert>
                            : null
                    }
                </div>
                <div className="col">
                    {product ? <Product product={product} noCart /> : null}
                </div>
            </div>
        </Paper>
    )

}


const mapStateToProps = state => {
    return {
        response: state.response
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setResponse: (response) => dispatch({ type: actions.SET_RESPONSE, response: response }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProduct);