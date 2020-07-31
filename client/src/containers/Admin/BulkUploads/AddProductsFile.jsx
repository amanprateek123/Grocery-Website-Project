import React from 'react';
import { Paper, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import '../Admin.scss'
import UploadIcon from '@material-ui/icons/CloudUpload'
import * as actions from '../../../store/actions'
import { connect } from 'react-redux'

const ProductRow = (props) => {
    return (
        <div className="product-row">
            <div className="id">{props.product.id}</div>
            <div className="name">{props.product.name}</div>
            <div className="categoryId">{props.product.categoryId}</div>
            <div className="brand">{props.product.brand}</div>
            <div className="image">{props.product.image}</div>
        </div>
    );
}


const AddProductsFile = (props) => {

    const addProducts = (e) => {
        e.preventDefault();
        var input = document.querySelector('#products-file');
        if (input.files[0].type != 'text/csv') {
            props.setResponse({ status: 400, message: 'Please Upload a CSV file with fields [sn,op,categoryId,name,brand,description,keywords,code,model,price,stock,json,src,attr,attrv]' })
            return;
        }

        var data = new FormData()
        data.append('products', input.files[0]);

        fetch('/admin/add-products', {
            method: 'POST',
            body: data
        }).then(res => res.json().then(res => {
            console.log(res);
            props.setResponse(res);
        })).catch(err => {
            console.log(err);
        })
    }

    return (
        <Paper className="admin-content">
            <div>
                <h2 className="mb-2 text-muted">Upload Products CSV</h2>
                <p className="text-muted mb-4" style={{ opacity: 0.7 }}>upload a csv file with fields : [ name | categoryId | brand | description | keywords | json]</p>
                <form encType="multipart/form-data" onSubmit={addProducts}>
                    <div className="form-group">
                        <input required type="file" name="products" id="products-file" style={{ opacity: 0.5 }} />
                        <Button startIcon={<UploadIcon />} variant="contained" color="primary" type="submit">Upload</Button>
                    </div>
                    {props.response.status ? <Alert severity={props.response.status == 200 ? "success" : "error"}>{props.response.message}</Alert> : null}

                    {props.response.products ?
                        <div className="results">
                            {props.response.products.map(product =>
                                <ProductRow product={product} />
                            )}
                        </div>
                        : null
                    }
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProductsFile);