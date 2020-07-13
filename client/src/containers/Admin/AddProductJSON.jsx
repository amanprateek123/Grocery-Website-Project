import React from 'react';
import { Paper, Button, TextField, Select, MenuItem } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import './Admin.scss'
import UploadIcon from '@material-ui/icons/CloudUpload'
import * as actions from '../../store/actions'
import { connect } from 'react-redux'
import './AddProduct.scss'
import { useState } from 'react';
import { useEffect } from 'react';


let schema = {
    name: "",
    brand: "",
    description: "",
    keywords: "",
    categoryId: "",
    skus: [
        {
            code: "",
            name: "",
            price: "",
            stockQuantity: "",
            json: "",
            images: [
                {
                    src: ""
                },

            ],
            attributes: [
                {
                    name: "",
                    value: ""
                },

            ]

        },

    ]
}

const AddProductJSON = (props) => {

    const [json, setJson] = useState(JSON.stringify(schema, undefined, 2));
    const [error, setError] = useState(null);
    const [valError, setValError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChangeJSON = (e) => {
        try {
            JSON.parse(e.target.value)
            setError(null)
        } catch (err) {
            setError(err.message);
        }
        setJson(e.target.value)
    }
    const prettyJSON = (e) => {
        if (e.ctrlKey && e.keyCode == 13) {
            try {
                let obj = JSON.parse(json);
                let pretty = JSON.stringify(obj, undefined, 2);
                setJson(pretty)
            }
            catch (err) {
                setError(err.message);
            }
        }
    }

    const addProduct = (e) => {
        e.preventDefault();
        try {
            console.log("Adding Product");

            JSON.parse(json);
            fetch('/admin/add-product', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        setSuccess(res.product)
                        setValError(null)
                    }
                    else if (res.status == 422) {
                        setValError(res.errors)
                        setSuccess(null)
                    }
                })
        } catch (err) {
            console.log('BAD JSON');

        }

    }

    return (
        <Paper className="admin-content">
            <div className="row add-product full-width">
                <div className="col">
                    <form onSubmit={addProduct}>
                        <div className="form-group">
                            <h2 className="mb-2 text-muted">Add Product JSON</h2>
                            <Button type="submit" color={`${!error ? 'primary' : 'secondary'}`} disabled={error} variant="contained" style={{ width: 'fit-content', padding: '0 2em' }}>Submit</Button>
                        </div>
                        <div>
                            {success ? <Alert severity="success">{`Product Added with id ${success.id}`}</Alert> : null}
                        </div>
                        <div>
                            {valError ?
                                <Alert severity="error">{
                                    valError.map(err => (
                                        <div key={err.msg} className="error">
                                            {err.msg}
                                        </div>
                                    ))
                                }</Alert> : null}
                        </div>
                        <div className="form-group">
                            <TextField className={`json ${error ? 'error' : ''}`} helperText="Ctrl+Enter to format json" multiline value={json} onChange={handleChangeJSON} onKeyDown={prettyJSON} />
                        </div>
                        <div>
                            {error ? <Alert severity="error">{error}</Alert> : null}
                        </div>
                    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProductJSON);