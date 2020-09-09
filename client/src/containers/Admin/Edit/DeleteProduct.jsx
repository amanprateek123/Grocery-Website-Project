import React from 'react';
import { Paper, Button, TextField, Select, MenuItem } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import UploadIcon from '@material-ui/icons/CloudUpload'
import * as actions from '../../../store/actions'
import { connect } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import Product from '../../../components/Product/Product'
import { useRef } from 'react';

import Swal from 'sweetalert2'
import '../Admin.scss'
import '../SingleUploads/AddProduct.scss'
import '@sweetalert2/theme-minimal/minimal.scss';

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

    const deleteProduct = (e, method) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: method=='hard'?
            `All related data (sku,images,attributes) related to this product will be deleted. This cannot be reverted.`
            :`Reduce Stock Quantity to 0.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor:'#f009',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.value) {
                fetch('/admin/delete-product', {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        productId: product.id,
                        method: method
                    })
                }).then(res => res.json())
                    .then(res => {
                        setResponse(res);
                        if (res.status == 200) {
                            Swal.fire(
                                'Deleted!',
                                'Product has been deleted Successfully.',
                                'success'
                            )
                        }
                        else {
                            Swal.fire(
                                'Error',
                                'Some Error Occurred on Server.',
                                'error'
                            )
                        }
                    })


            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Product NOT Deleted.',
                    'error'
                )
            }
        })

    }

    return (
        <Paper className="admin-content">
            <div className="row delete-product full-width">
                <div className="col">
                    <h2 style={{fontSize:'25px'}}>Delete Product</h2>
                    <form onSubmit={getProduct}>
                        <div className="form-group">
                            <TextField className="text-center" style={{width:'200px'}} value={productId} onChange={(e) => setProductId(e.target.value)} label="find product by Id" name="productId" />
                        </div>
                    </form>
                    {
                        product ?
                            <div className="form-group">
                                <div>
                                    <p>Are you sure you want to DELETE this product?</p>

                                    <p><b>Soft Delete</b> <br /> <span style={{ color: '#4CAF50' }}>Safe</span> - Reduce Stock Quantity to 0. <br />
                                        <span className="text-muted">'Out of Stock' will be displayed if the product is in user's carts.</span>
                                    </p>
                                    <Button variant="contained" style={{ background: '#4CAF50', color: 'white' }} onClick={(e) => deleteProduct(e, 'soft')}>Safe Delete</Button>
                                    <br />
                                    <br />
                                    <p><b>Hard Delete</b> <br /> <span style={{ color: 'red' }}>UnSafe</span> - All related data (sku,images,attributes) related to this product will be deleted. <br />
                                        <span className="text-muted">Only do this if this product was added by mistake, or you completely want to wipe out this product from database. It will be directly removed from user carts.</span>
                                    </p>
                                    <Button variant="contained" color="secondary" onClick={(e) => deleteProduct(e, 'hard')}>Delete this Product</Button>
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