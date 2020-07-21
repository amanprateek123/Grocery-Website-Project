import React from 'react';
import { Paper, Button, TextField, Select, MenuItem, FormHelperText } from '@material-ui/core'
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
            attributes: [
                {
                    name: "",
                    value: ""
                },

            ]

        },

    ]
}


const AddProduct = (props) => {

    const [product, setProduct] = useState(schema);
    let [categories, setCategories] = useState();
    let [selectedCat, setSelectedCat] = useState();
    const [valError, setValError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [imgUrls, setImgUrls] = useState([[]]);

    useEffect(() => {
        fetch('/get-categories').then(res => res.json().then(res => {
            if (res.length) {
                setCategories(res);
                setSelectedCat({
                    department: res[0],
                    parentCategory: res[0].parentCategories[0],
                    category: res[0].parentCategories[0].categories[0],
                })
            }
        }))
    }, [])

    const handleChangeCat = (e, type) => {
        switch (type) {
            case 'department':
                setSelectedCat({
                    department: categories.find(dept => dept.id == e.target.value),
                    parentCategory: categories.find(dept => dept.id == e.target.value).parentCategories[0],
                    category: categories.find(dept => dept.id == e.target.value).parentCategories[0].categories[0],
                });
                break;
            case 'parentCategory':
                setSelectedCat({
                    ...selectedCat,
                    parentCategory: selectedCat.department.parentCategories.find(pc => pc.id == e.target.value),
                    category: selectedCat.department.parentCategories.find(pc => pc.id == e.target.value).categories[0],
                });
                break;
            case 'category':
                setSelectedCat({
                    ...selectedCat,
                    category: selectedCat.parentCategory.categories.find(cat => cat.id == e.target.value),
                });
                break;
        }
    }

    function isURL(str) {
        let picsum = /^https:\/\/picsum.photos\//; // Dummy Img
        let server = /^\/public\/images\/products\//; // Image on server
        let image = /(\.jpg|\.png|\.jpeg|\.gif)$/; // Image url

        return picsum.test(str) || server.test(str) || image.test(str);
    }

    const handleChange = (e) => {
        let _product = JSON.parse(JSON.stringify(product));
        _product[e.target.name] = e.target.value;
        setProduct(_product)
    }
    const handleChangeSKU = (e, i) => {
        let _product = JSON.parse(JSON.stringify(product));
        _product.skus[i][e.target.name] = e.target.value;
        setProduct(_product)
    }
    const handleChangeIMG = (e, i, j) => {
        let _product = JSON.parse(JSON.stringify(product));
        _product.skus[i].images[j]['src'] = e.target.value;
        setProduct(_product)
    }
    const handleChangeATTR = (e, i, j) => {
        let _product = JSON.parse(JSON.stringify(product));
        _product.skus[i].attributes[j][e.target.name] = e.target.value;
        setProduct(_product)
    }


    const addSKU = () => {
        let _product = JSON.parse(JSON.stringify(product));
        let _len = Math.max(0, _product.skus.length - 1);
        let _schema = _product.skus[_len] || schema.skus[0];
        _product.skus.push(_schema);

        let _urls = [...imgUrls]
        _urls.push([]);

        setImgUrls(_urls);
        setProduct(_product)
    }
    const addIMG = (i) => {
        let _product = JSON.parse(JSON.stringify(product));
        let _len = Math.max(0, _product.skus[i].images.length - 1);
        let _schema = _product.skus[i].images[_len] || schema.skus[0].images[0];
        _product.skus[i].images.push(_schema);
        setProduct(_product)
    }
    const addATTR = (i) => {
        let _product = JSON.parse(JSON.stringify(product));
        let _len = Math.max(0, _product.skus[i].attributes.length - 1);
        let _schema = _product.skus[i].attributes[_len] || schema.skus[0].attributes[0];
        _product.skus[i].attributes.push(_schema);
        setProduct(_product)
    }


    const removeSKU = (i) => {
        let _product = JSON.parse(JSON.stringify(product));
        _product.skus.splice(i, 1);
        let _urls = [...imgUrls]
        _urls.pop();

        setImgUrls(_urls);
        setProduct(_product)
    }
    const removeIMG = (i, j) => {
        let _product = JSON.parse(JSON.stringify(product));
        _product.skus[i].images.splice(j, 1);
        setProduct(_product)
    }
    const removeATTR = (i, j) => {
        let _product = JSON.parse(JSON.stringify(product));
        _product.skus[i].attributes.splice(j, 1);
        setProduct(_product)
    }

    const imgFileChange = (i) => {
        let input = document.querySelector(`#images${i}`);
        let _urls = [...imgUrls];
        _urls[i] = [];
        for (let j = 0; j < input.files.length; ++j) {
            _urls[i].push(URL.createObjectURL(input.files[j]))
        }
        setImgUrls(_urls);
    }

    useEffect(() => {
        return () => {
            imgUrls.forEach(urlGrp => {
                urlGrp.forEach(url => {
                    URL.revokeObjectURL(url);
                })
            })
            console.log('Revoked Image URLS');
        }
    }, [imgUrls])

    const addProduct = (e) => {
        e.preventDefault();
        try {
            console.log("Adding Product");
            var data = new FormData()
            data.append('product', JSON.stringify({
                ...product,
                categoryId: selectedCat.category.id
            }));

            product.skus.forEach((sku, i) => {
                let input = document.querySelector(`#images${i}`);

                for (let x = 0; x < input.files.length; ++x) {
                    data.append(`images${i}`, input.files[x]);
                }
            })

            fetch('/admin/add-product', {
                method: 'post',
                body: data
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
            console.log('SOMETHING WENT WRONG');
            console.log(err);


        }

    }

    return (
        <Paper className="admin-content">
            <div className="row add-product full-width">
                <form onSubmit={addProduct}>
                    <div className="row">
                        <div className="col">
                            <div className="d-flex mb-4">
                                <h2 className="mb-2 text-muted">Product</h2>
                                <Button variant="contained" color="primary" type="submit">Add Product</Button>
                            </div>
                            <div className="info">
                                <p>
                                    A complete product along with its corresponding SKU's, their corresponding images and attributes will be added to the database.
                                </p>
                                <p>Fill in all the details below.</p>
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
                            <h5>Category</h5>
                            {
                                categories && selectedCat ?
                                    <div className="form-group">
                                        <div className="w-100">
                                            <Select name="department" label="department" value={selectedCat.department.id} onChange={(e) => handleChangeCat(e, "department")}>
                                                {categories.map(dept => <MenuItem key={dept.id} value={dept.id}>{dept.name}</MenuItem>)}
                                            </Select>
                                            <FormHelperText className="cat-id-label">{selectedCat.department.id}</FormHelperText>
                                        </div>
                                        <div className="w-100">
                                            <Select name="parentCategory" label="parentCategory" value={selectedCat.parentCategory.id} onChange={(e) => handleChangeCat(e, "parentCategory")}>
                                                {selectedCat.department.parentCategories.map(pc => <MenuItem key={pc.id} value={pc.id}>{pc.name}</MenuItem>)}
                                            </Select>
                                            <FormHelperText className="cat-id-label">{selectedCat.parentCategory.id}</FormHelperText>
                                        </div>
                                        <div className="w-100">
                                            <Select name="category" label="category" value={selectedCat.category.id} onChange={(e) => handleChangeCat(e, "category")}>
                                                {selectedCat.parentCategory.categories.map(cat => <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>)}
                                            </Select>
                                            <FormHelperText className="cat-id-label">{selectedCat.category.id}</FormHelperText>
                                        </div>
                                    </div>
                                    : null
                            }
                            <div className="form-group">
                                <TextField required value={product.name} name="name" onChange={handleChange} label="Name" InputLabelProps={{ shrink: Boolean(product.name) }} />
                                <TextField required value={product.brand} name="brand" onChange={handleChange} label="Brand" InputLabelProps={{ shrink: Boolean(product.brand) }} />
                            </div>
                            <div className="form-group">
                                <TextField required value={product.description} name="description" onChange={handleChange} label="Description" multiline className="w-100" InputLabelProps={{ shrink: Boolean(product.description) }} />
                            </div>
                            <div className="form-group">
                                <TextField value={product.keywords} name="keywords" onChange={handleChange} label="Keywords" InputLabelProps={{ shrink: Boolean(product.keywords) }} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="d-flex  mt-4">
                                <h2 className="mb-2 text-muted">SKU <small style={{ fontSize: '0.4em', color: '#000' }}>*total <b>{product.skus.length}</b> sku(s).</small></h2>
                                <Button onClick={addSKU}>Add SKU</Button>
                            </div>
                            <div className="info">
                                <p>multiple sku(s) an be added for a product.</p>
                            </div>
                            {product.skus.map((sku, i) => (
                                <div key={sku + i} className="sku">
                                    <div className="d-flex">
                                        <h4>SKU {i + 1}</h4>
                                        <Button color="secondary" onClick={() => removeSKU(i)}>Remove</Button>
                                    </div>
                                    <div className="form-group" style={{ width: "50%" }}>
                                        <TextField required value={sku.code} name="code" onChange={(e) => handleChangeSKU(e, i)} label="code" InputLabelProps={{ shrink: Boolean(sku.code) }} />
                                    </div>
                                    <div className="form-group">
                                        {/* <TextField required value={sku.type} name="type" onChange={(e) => handleChangeSKU(e, i)} label="type" InputLabelProps={{ shrink: Boolean(sku.type) }} /> */}
                                        <TextField required value={sku.name} name="name" onChange={(e) => handleChangeSKU(e, i)} label="model" InputLabelProps={{ shrink: Boolean(sku.name) }} />
                                    </div>
                                    <div className="form-group">
                                        <TextField required type="number" value={sku.price} name="price" onChange={(e) => handleChangeSKU(e, i)} label="price" InputLabelProps={{ shrink: Boolean(sku.price) }} />
                                        <TextField required type="number" value={sku.stockQuantity} name="stockQuantity" onChange={(e) => handleChangeSKU(e, i)} label="stockQuantity" InputLabelProps={{ shrink: Boolean(sku.stockQuantity) }} />
                                    </div>
                                    <div className="form-group">
                                        <TextField required value={sku.json} name="json" onChange={(e) => handleChangeSKU(e, i)} label="json" multiline InputLabelProps={{ shrink: Boolean(sku.json) }} />
                                    </div>


                                    <div className="images ml-2">
                                        <div className="d-flex align-items-center">
                                            <h5>Images</h5>
                                            {/* <Button onClick={() => addIMG(i)}>Add Image</Button> */}
                                        </div>
                                        <div className="imgs">
                                            {/* {sku.images.map((img, j) => (
                                                <div key={img + i + j} className="row">
                                                    <div className="col">
                                                        <TextField required value={img.src} name="src" onChange={(e) => handleChangeIMG(e, i, j)} label="image url" type="url" InputLabelProps={{ shrink: Boolean(img.src) }} />
                                                    </div>
                                                    <div className="col">
                                                        {isURL(img.src) ? <img width={200} src={img.src} alt="" /> : null}
                                                    </div>
                                                    <Button color="secondary" onClick={() => removeIMG(i, j)}>Remove</Button>
                                                </div>
                                            ))} */}
                                            <input type="file" name={`images${i}`} id={`images${i}`} onChange={() => imgFileChange(i)} multiple="multiple" style={{ opacity: 0.5 }} />
                                            <div className="images">
                                                {imgUrls[i].map(url => <img width={100} src={url} />)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="attributes ml-2 mt-2">
                                        <div className="d-flex align-items-center">
                                            <h5>Attributes</h5>
                                            <Button onClick={() => addATTR(i)}>Add Attribute</Button>
                                        </div>
                                        <div className="imgs">
                                            {sku.attributes.map((attr, j) => (
                                                <div key={attr + i + j} className="form-group">
                                                    <TextField required value={attr.name} name="name" onChange={(e) => handleChangeATTR(e, i, j)} label="name" InputLabelProps={{ shrink: Boolean(attr.name) }} />
                                                    <TextField required value={attr.value} name="value" onChange={(e) => handleChangeATTR(e, i, j)} label="value" InputLabelProps={{ shrink: Boolean(attr.value) }} />
                                                    <Button color="secondary" onClick={() => removeATTR(i, j)}>Remove</Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);