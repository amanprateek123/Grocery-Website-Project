import React from 'react';
import { Paper, Button, Divider } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import '../Admin.scss'
import UploadIcon from '@material-ui/icons/CloudUpload'
import * as actions from '../../../store/actions'
import { connect } from 'react-redux'
import './bulk.scss'
// const ProductRow = (props) => {
//     return (
//         <div className="product-row">
//             <div className="id">{props.product.id}</div>
//             <div className="name">{props.product.name}</div>
//             <div className="categoryId">{props.product.categoryId}</div>
//             <div className="brand">{props.product.brand}</div>
//             <div className="image">{props.product.image}</div>
//         </div>
//     );
// }


const AddProductsFile = (props) => {

    const addDepartments = (e) => {
        e.preventDefault();
        var input = document.querySelector('#departments-file');
        if (!['application/vnd.ms-excel', 'text/csv'].includes(input.files[0].type)) {
            props.setResponse({ status: 400, message: `NOT a .csv file. Please Upload a CSV file with fields [name]. ${input.files[0].type} file type not supported.` })
            return;
        }

        var data = new FormData()
        data.append('departments', input.files[0]);

        fetch('/admin/add-departments', {
            method: 'POST',
            body: data
        }).then(res => res.json().then(res => {
            console.log(res);
            props.setResponse(res);
        })).catch(err => {
            console.log(err);
        })
    }
    const addParentCategories = (e) => {
        e.preventDefault();
        var input = document.querySelector('#parentCategories-file');
        if (!['application/vnd.ms-excel', 'text/csv'].includes(input.files[0].type)) {
            props.setResponse({ status: 400, message: 'Please Upload a CSV file with fields [ department | name ]' })
            return;
        }

        var data = new FormData()
        data.append('parentCategories', input.files[0]);

        fetch('/admin/add-parentCategories', {
            method: 'POST',
            body: data
        }).then(res => res.json().then(res => {
            console.log(res);
            props.setResponse(res);
        })).catch(err => {
            console.log(err);
        })
    }
    const addCategories = (e) => {
        e.preventDefault();
        var input = document.querySelector('#categories-file');
        if (!['application/vnd.ms-excel', 'text/csv'].includes(input.files[0].type)) {
            props.setResponse({ status: 400, message: 'Please Upload a CSV file with fields [parentCategory | name ]' })
            return;
        }

        var data = new FormData()
        data.append('categories', input.files[0]);

        fetch('/admin/add-categories', {
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
            {
                props.response.status == 400 ?
                    <Alert severity="error">
                        {props.response.message}
                    </Alert>
                    : null
            }
            {props.response.status == 200 ?
                <div className="alerts">
                    {props.response.successes[0] ?
                        <Alert severity="success">
                            {props.response.successes.map(suc => <div className="line">{suc.name}</div>)}
                        </Alert>
                        : null
                    }
                    {props.response.errors[0] ?
                        <Alert severity="error">
                            {props.response.errors.map(err => <div className="line">{err.message}</div>)}
                        </Alert>
                        : null
                    }
                </div>
                : null}

            <div className="media_catag">
                <h2 className="mb-2 text-muted">Departments</h2>
                <p className="text-muted mb-4" style={{ opacity: 0.7 }}>upload a csv file with fields : [ name  ]</p>
                <form encType="multipart/form-data" onSubmit={addDepartments}>
                    <div className="form-group">
                        <input required type="file" name="departments" id="departments-file" style={{ opacity: 0.5 }} />
                        <Button startIcon={<UploadIcon />} variant="contained" color="primary" type="submit">Upload</Button>
                    </div>
                </form>
            </div>
            <Divider />
            <div className="media_catag">
                <h2 className="mb-2 text-muted">parentCategories</h2>
                <p className="text-muted mb-4" style={{ opacity: 0.7 }}>upload a csv file with fields : [ department | name ]</p>
                <form encType="multipart/form-data" onSubmit={addParentCategories}>
                    <div className="form-group">
                        <input required type="file" name="parentCategories" id="parentCategories-file" style={{ opacity: 0.5 }} />
                        <Button startIcon={<UploadIcon />} variant="contained" color="primary" type="submit">Upload</Button>
                    </div>
                </form>
            </div>
            <Divider />
            <div className="media_catag">
                <h2 className="mb-2 text-muted">Categories</h2>
                <p className="text-muted mb-4" style={{ opacity: 0.7 }}>upload a csv file with fields : [ parentCategory | name ]</p>
                <form encType="multipart/form-data" onSubmit={addCategories}>
                    <div className="form-group">
                        <input required type="file" name="categories" id="categories-file" style={{ opacity: 0.5 }} />
                        <Button startIcon={<UploadIcon />} variant="contained" color="primary" type="submit">Upload</Button>
                    </div>
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