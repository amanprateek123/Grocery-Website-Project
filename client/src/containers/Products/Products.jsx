import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import { useState } from 'react';
import Modal from "../../components/Modal/Modal";
import {
    Grid, Card, CardContent, Paper, Typography, CardMedia, Avatar,
    List, ListItem, ListSubheader, ListItemIcon, ListItemText, Divider,
    TextField, CardActionArea, CardActions, Button, Select, MenuItem, InputLabel, Badge, Chip, Checkbox, FormControlLabel
}
    from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import SecurityIcon from '@material-ui/icons/Security';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import mail from '../../assets/illustrations/mail.svg'
import male_avatar from '../../assets/illustrations/male_avatar.svg'
import female_avatar from '../../assets/illustrations/female_avatar.svg'
import { Spinner } from 'react-bootstrap'

import Product from '../../components/Product/Product'

import './Products.scss'


const Products = (props) => {

    const [products, setProducts] = useState([])
    const [visibleProducts, setVisibleProducts] = useState([])
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [SKUs, setSKUs] = useState([]);
    const [SKUTypes, setSKUTypes] = useState([]);

    const [page, setPage] = useState(0);

    useEffect(() => {
        fetch(`/get-products${props.location.search}&page=${page}`).then(res => res.json().then(products => {
            setProducts(products);
            setVisibleProducts(products);

            setCategories(Array.from(new Set(products.map(product => product.category.name))));

            setBrands(Array.from(new Set(products.map(product => ({ name: product.brand, selected: true })))));

            setSKUs(Array.from(new Set(products.map(product => product.skus.map(sku => ({ name: sku.name, selected: true }))).flat())));
            setSKUTypes(Array.from(new Set(products.map(product => product.skus.map(sku => sku.type)).flat())));

        })).catch(err => {
            console.log(err);
        })


    }, [props.location])

    const updateVisibleProducts = () => {
        let _products = products.filter(product => {
            if (
                brands.filter(brand => brand.selected).map(brand => brand.name).includes(product.brand)
                && SKUs.filter(sku => sku.selected).map(sku => sku.name).some(item => product.skus.map(sku => sku.name).includes(item))
            ) {
                return true;
            }
            else {
                return false;
            }
        })

        setVisibleProducts(_products);
    }

    const changeBrand = (name, e) => {
        let updatedBrands = brands.map(brand => {
            if (brand.name == name) {
                brand.selected = e.target.checked;
            }
            return brand;
        })

        setBrands(updatedBrands);
        updateVisibleProducts();
    }

    const changeSKU = (name, e) => {
        let updatedSKU = SKUs.map(sku => {
            if (sku.name == name) {
                sku.selected = e.target.checked;
            }
            return sku;
        })

        setSKUs(updatedSKU);
        updateVisibleProducts();
    }

    const productsSection = (
        <div className="products-container">
            <h1>Products</h1>
            <Divider />
            {products[0] ?
                <div className="products">
                    {visibleProducts.map(product => <Product key={product.id} product={product} />)}
                </div>
                : null
            }
        </div>
    )




    return (
        <div className="container-fluid page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <div className="side-nav">
                            {/* <div className="mb-4">
                                <Card>
                                    <CardContent>
                                        <div className="row align-items-center">
                                            <div className="col-4">
                                                <Avatar className="dp" src={female_avatar} />
                                            </div>
                                            <div className="col">
                                                <div><i>Hello,</i></div>
                                                <h5>User</h5>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col" style={{ fontSize: '0.5em' }}>
                                                {props.response.status ? <Alert severity={props.response.status == 200 ? "success" : "error"}>{props.response.message}</Alert> : null}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div> */}

                            <div className="mb-3">
                                <Card>
                                    <CardContent>

                                        <List dense component="nav" aria-label="main"
                                            subheader={<ListSubheader component="div" id="nested-list-subheader">Categories</ListSubheader>}
                                        >
                                            {categories.map(category => <Chip key={category} className="chip" clickable size="small" variant="outlined" label={category} />)}

                                        </List>
                                        <Divider />
                                        <List dense component="nav" aria-label="secondary"
                                            subheader={<ListSubheader component="div" id="nested-list-subheader">Brand</ListSubheader>}
                                        >
                                            <div className="brands">
                                                {brands.map(brand => <FormControlLabel key={brand.name} className="d-block ctrl m-0" label={brand.name} control={<Checkbox checked={brand.selected} onChange={(e) => changeBrand(brand.name, e)} value={brand.name} />} />)}
                                            </div>
                                        </List>
                                        <Divider />
                                        <List dense component="nav" aria-label="secondary"
                                            subheader={<ListSubheader component="div" id="nested-list-subheader">Price Range</ListSubheader>}
                                        >
                                            <div className="prices">
                                                <FormControlLabel className="d-block ctrl m-0" label="120$ - 160$" control={<Checkbox value="" />} />
                                            </div>
                                        </List>
                                        <Divider />
                                        <List dense component="nav" aria-label="secondary"
                                            subheader={<ListSubheader component="div" id="nested-list-subheader">{SKUTypes.join(', ')}</ListSubheader>}
                                        >
                                            <div className="pack-sizes">
                                                {SKUs.map(sku => <FormControlLabel key={sku.name} className="d-block ctrl m-0" label={sku.name} control={<Checkbox checked={sku.selected} onChange={(e) => changeSKU(sku.name, e)} value={sku.name} />} />)}
                                            </div>
                                        </List>

                                    </CardContent>
                                </Card>
                            </div>

                        </div>
                    </div>
                    <div className="col-9">
                        <div className="content">
                            {productsSection}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ...state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setResponse: (response) => dispatch({ type: actions.SET_RESPONSE, response: response }),
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);