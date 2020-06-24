import React from 'react';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import { useState } from 'react';
import Modal from "../../components/Modal/Modal";
import {
    Grid, Card, CardContent, Paper, Typography, CardMedia, Avatar,
    List, ListItem, ListSubheader, ListItemIcon, ListItemText, Divider,
    TextField, CardActionArea, CardActions, Button, Select, MenuItem, InputLabel, Badge, Chip, Checkbox, FormControlLabel
    , Slider, LinearProgress, Snackbar
}
    from '@material-ui/core'
import { Alert, Pagination, PaginationItem, TreeView, TreeItem } from '@material-ui/lab';

import Product from '../../components/Product/Product'

import emptySvg from '../../assets/illustrations/empty.svg'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import './Products.scss'


const Products = (props) => {

    const history = useHistory();

    const [products, setProducts] = useState([])
    const [visibleProducts, setVisibleProducts] = useState([])
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [SKUs, setSKUs] = useState([]);
    const [SKUTypes, setSKUTypes] = useState([]);
    const [priceRange, setPriceRange] = useState([null, null]);

    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState(false);

    const [metaData, setMetaData] = useState({});

    useEffect(() => {
        setLoading(true);
        fetch(`/get-products${props.location.search}`).then(res => res.json().then(({ meta, products }) => {
            setProducts(products);
            setVisibleProducts(products);

            setMetaData(meta)

            // setCategories(Array.from(new Set(products.map(product => product.category.name))));
            setCategories(meta.categories);

            // setBrands(Array.from(new Set(products.map(product => ({ name: product.brand, selected: true })))));
            if (['category', 'parentCategory', '&sr'].map(str => props.location.search.indexOf(str) != -1).reduce((acc, cur) => acc || cur, false)) {
                setBrands(meta.brands.map(brand => ({ name: brand.name, selected: false })))
                props.location.search = props.location.search.replace('&sr', '');
            }

            // setSKUs(Array.from(new Set(products.map(product => product.skus.map(sku => ({ name: sku.name, type: sku.type, selected: true }))).flat())));
            setSKUs(meta.skus.map(s => ({ ...s, selected: (new URLSearchParams(props.location.search).get('filter')) && ((new URLSearchParams(props.location.search).get('filter')).indexOf(s.name) != -1) })));
            setSKUTypes(Array.from(new Set(meta.skus.map(sku => sku.type))));

            setLoading(false);

        })).catch(err => {
            console.log(err);
        })


    }, [props.location])

    const updateVisibleProducts = () => {
        let _products = products.filter(product => {
            if (
                SKUs.filter(sku => sku.selected).map(sku => sku.name).some(item => product.skus.map(sku => sku.name).includes(item))
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
        applyBrands();
    }

    const changeSKU = (name, e) => {
        let updatedSKU = SKUs.map(sku => {
            if (sku.name == name) {
                sku.selected = e.target.checked;
            }
            return sku;
        })

        setSKUs(updatedSKU);
        applyFilter(updatedSKU);
    }
    const applyFilter = (SKUs) => {
        let filter = SKUs.filter(s => s.selected).map(s => s.name).join(' ');
        console.log(filter);

        if (props.location.search.indexOf('filter') != -1) {
            let query = props.location.search.replace(/filter=[a-zA-z\-\+\d %]*&/, `filter=${filter}&`);

            console.log(query);

            history.push(`/products${query}`);
        }
        else {
            history.push(`/products?filter=${filter}&${props.location.search.slice(1)}`)
        }
    }

    const handlePriceChange = (e, i) => {
        let val = parseInt(e.target.value);

        if (val < 0) val = 0;
        if (!i && val > priceRange[1]) val = priceRange[1];
        if (i && val < priceRange[0]) val = priceRange[0];

        let newPriceRange = [...priceRange];
        newPriceRange[i] = val;
        setPriceRange(newPriceRange)

    }

    const applyBrands = () => {
        let brandQuery = brands.filter(b => b.selected).map(b => b.name).join(',');

        if (props.location.search.indexOf('brand') != -1) {
            let query = props.location.search.replace(/brand=[\w ,]*&/, `brand=${brandQuery}&`);
            history.push(`/products${query}`);
        }
        else {
            history.push(`/products?brand=${brandQuery}&${props.location.search.slice(1)}`)
        }
    }

    const productsSection = (
        <div className="products-container">
            {/* <h1>Products</h1> */}
            {/* <p>{metaData.count} products.</p> */}
            {/* <Divider /> */}
            {!loading ? products[0] ?
                <div className="products">
                    {visibleProducts.map(product => <Product key={product.id} product={product} addToCart={props.addToCart} feedback={() => setSnackbar(true)} />)}
                </div>
                : <img src={emptySvg} className="empty" title="No products found" alt="No Products Found" />
                : <LinearProgress />
            }
        </div>
    )




    return (
        <div className="container-fluid page products-page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 d-none d-md-block">
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
                                <Card className="side-nav">
                                    <CardContent>

                                        <List dense component="nav" aria-label="main"
                                            subheader={<ListSubheader component="div" id="categories-fetched">Categories</ListSubheader>}
                                        >
                                            <ul>

                                                {categories.map(parentCategory => (

                                                    <li key={parentCategory.name}>
                                                        <Link to={`/products?parentCategory=${parentCategory.name}`}>{parentCategory.name}</Link>
                                                        <ul>
                                                            {parentCategory.categories.map(cat => <li key={cat.name} ><Link to={`/products?category=${cat.name}`}>{cat.name}</Link></li>)}
                                                        </ul>
                                                    </li>
                                                ))}

                                            </ul>
                                        </List>

                                        <List dense component="nav" aria-label="secondary"
                                            subheader={<ListSubheader component="div" id="nested-list-subheader">Brand</ListSubheader>}
                                        >
                                            <div className="brands">
                                                {brands.map(brand => <FormControlLabel key={brand.name} className="d-block ctrl m-0" label={brand.name} control={<Checkbox color="primary" checked={brand.selected} onChange={(e) => changeBrand(brand.name, e)} value={brand.name} />} />)}
                                            </div>
                                        </List>

                                        {/* <Divider />
                                        <List dense component="nav" aria-label="secondary"
                                            subheader={<ListSubheader component="div" id="nested-list-subheader">Price Range <Button size="small" color="primary">Apply</Button></ListSubheader>}
                                        >
                                            <div className="prices">
                                                <TextField type="number" label="min" value={priceRange[0]} onChange={(e) => handlePriceChange(e, 0)} />
                                                <TextField type="number" label="max" value={priceRange[1]} onChange={(e) => handlePriceChange(e, 1)} />

                                            </div>
                                        </List> */}

                                        <Divider />
                                        {SKUTypes.map(type => (
                                            <List key={type} dense component="nav" aria-label="secondary"
                                                subheader={<ListSubheader component="div" id="nested-list-subheader">{type}</ListSubheader>}
                                            >
                                                <div className="pack-sizes">
                                                    {SKUs.map(sku => (
                                                        sku.type == type && sku.name ?
                                                            <FormControlLabel key={sku.name + sku.id + sku.type} className="d-block ctrl m-0" label={sku.name} control={<Checkbox color="primary"
                                                                checked={sku.selected} onChange={(e) => changeSKU(sku.name, e)} value={sku.name} />} />
                                                            : null
                                                    ))}
                                                </div>
                                            </List>
                                        ))}

                                    </CardContent>
                                </Card>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-10 col">
                        <Snackbar open={snackbar} onClose={() => setSnackbar(false)} autoHideDuration={2000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                            {true ? <Alert variant="filled" severity={"success"}>{"Item Added to Cart"}</Alert> : null}
                        </Snackbar>
                        <div className="content">
                            {productsSection}
                        </div>
                        <div className="pagination mt-4">
                            <Pagination
                                page={parseInt(new URLSearchParams(props.location.search).get('page'))}
                                count={metaData.pageCount}
                                renderItem={(item) => (
                                    <PaginationItem
                                        component={Link}
                                        to={`/products${props.location.search.split('&page')[0] || '?'}${item.page === 0 ? '' : `&page=${item.page}`}`}
                                        {...item}
                                    />
                                )}
                            />
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
        logout: () => dispatch(actions.logout()),
        addToCart: (SKUId) => dispatch(actions.addToCart(SKUId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
