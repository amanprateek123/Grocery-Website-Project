import React from 'react';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import { useState } from 'react';
import Modal from "../../components/Modal/Modal";
import FilterListIcon from '@material-ui/icons/FilterList';

import { Transition, config } from 'react-spring/renderprops'

import {
    Grid, Card, CardContent, Paper, Typography, CardMedia, Avatar,
    List, ListItem, ListSubheader, ListItemIcon, ListItemText, Divider,
    TextField, CardActionArea, CardActions, Button, Select, MenuItem, InputLabel, Badge, Chip, Checkbox, FormControlLabel
    , Slider, LinearProgress, Snackbar, InputAdornment,
}
    from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Alert, Pagination, PaginationItem, TreeView, TreeItem } from '@material-ui/lab';

import Product from '../../components/Product/Product'

import emptySvg from '../../assets/illustrations/empty.svg'


import './Products.scss'
import { useRef } from 'react';
import { compareSync } from 'bcryptjs';


const Products = (props) => {

    const history = useHistory();

    const [products, setProducts] = useState([])
    const [visibleProducts, setVisibleProducts] = useState([])
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [SKUs, setSKUs] = useState([]);
    const [SKUTypes, setSKUTypes] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 10000000]);
    const [sortBy, setSortBy] = useState('');
     const [cata,setCata] = useState(null)
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState(false);

    const [metaData, setMetaData] = useState({});

    const [dep,setDep] = useState([])

//    useEffect(()=>{
//     fetch('/get-categories').then(res => {
//         res.json().then(departments=>{
//             setDep(departments)
//         })})
//    },[])


    useEffect(() => {
        products.length && null || setLoading(true);
        fetch(`/get-products${props.location.search}`).then(res => res.json().then(({ meta, products }) => {
            setProducts(products);

            // Sort

            let _searchParams = new URLSearchParams(props.location.search);
            if (_searchParams.get('order')) {
                console.log('Sorted Data');
                if (_searchParams.get('dir') == 'DESC') {
                    products = products.sort((a, b) => b.skus[0].price - a.skus[0].price);
                }
                else if (_searchParams.get('dir') == 'ASC') {
                    products = products.sort((a, b) => a.skus[0].price - b.skus[0].price);
                }
            }
            setCata(_searchParams.get('category'))
            setVisibleProducts(products);

            setMetaData(meta)

            setCategories(meta.categories);

            // refresh sidebar 
            if (['?category', '?parentCategory', '&sr'].map(str => props.location.search.indexOf(str) != -1).reduce((acc, cur) => acc || cur, false)) {
                setBrands(Array.from(
                    new Set(
                        meta.brands.map(brand => (
                            JSON.stringify({
                                name: brand.name,
                                selected: (_searchParams.get('brand')) && ((_searchParams.get('brand')).indexOf(brand.name) != -1)
                            })
                        ))
                    )
                ).map(brand => JSON.parse(brand))
                )
                props.location.search = props.location.search.replace('&sr', '');
            }
            setSKUs(meta.skus.map(s => ({ ...s, selected: (_searchParams.get('filter')) && ((_searchParams.get('filter')).indexOf(s.value) != -1) })));
            setSKUTypes(Array.from(new Set(meta.skus.map(sku => sku.name))));


            setLoading(false);

            window.scrollTo(0, 0);

        })).catch(err => {
            console.log(err);
        })


    }, [props.location])

    const [a,setA] = useState(null)

    // useEffect(()=>{
    //     fetch('/get-categories').then(res => {
    //         res.json().then(departments=>{
    //             setDep(departments)
    //         })})
    //     if(cata && dep.length>0){
    //         dep.forEach(item=>(
    //             item.parentCategories.forEach(i=>{
    //                 i.categories.forEach(j=>{
    //                     if(j.name===cata){
    //                         setA(item)
    //                         console.log('i',item)
    //                     }
    //                     else{
    //                         console.log(j.name + '!=' + cata)
    //                     }
                        
    //                 })
    //              })
    //         ))
    //     }
    // },[cata])
    // console.log('a',a)


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

    const changeSKU = (value, e) => {
        let updatedSKU = SKUs.map(sku => {
            if (sku.value == value) {
                sku.selected = e.target.checked;
            }
            return sku;
        })

        setSKUs(updatedSKU);
        applyFilter(updatedSKU);
    }
    const applyFilter = (SKUs) => {
        let filter = SKUs.filter(s => s.selected).map(s => `${s.name}:${s.value}`).join(',');

        if (props.location.search.indexOf('filter') != -1) {
            let query = props.location.search.replace(/filter=[a-zA-z\-\+\d : ,%]*&/, `filter=${filter}&`);
            query = query.replace(/page=[\w\d ,]*/, `page=1`);
            history.push(`/products${query}`);
        }
        else {
            let query = props.location.search.replace(/page=[\w\d,]*/, `page=1`);
            history.push(`/products?filter=${filter}&${query.slice(1)}`)
        }
    }

    const handleChangeSort = (e) => {
        let value = e.target.value;
        setSortBy(e.target.value);
        console.log(e.target.value);
        if (!value) {
            let query = props.location.search.replace(/order=[\w .,]*&dir=[\w .,]*&/, `&`);
            query = query.replace(/page=[\w\d ,]*/, `page=1`);
            history.push(`/products${query}`);
            return;
        }
        if (props.location.search.indexOf('order') != -1) {
            let query = props.location.search.replace(/order=[\w .,]*&dir=[\w .,]*&/, `order=${value}&`);
            query = query.replace(/page=[\w\d .,]*/, `page=1`);
            history.push(`/products${query}`);
        }
        else {
            let query = props.location.search.replace(/page=[\w\d .,]*/, `page=1`);
            history.push(`/products?order=${value}&${query.slice(1)}`)
        }
    }

    const handlePriceChange = (e, i) => {
        let val = parseInt(e.target.value);

        if (val < 0) val = 0;
        // if (!i && val > priceRange[1]) val = priceRange[1];
        // if (i && val < priceRange[0]) val = priceRange[0];

        let newPriceRange = [...priceRange];

        newPriceRange[i] = val;
        !i && (newPriceRange[1] = Math.max(newPriceRange[0], newPriceRange[1]))
        i && (newPriceRange[0] = Math.min(newPriceRange[0], newPriceRange[1]))
        setPriceRange(newPriceRange)

    }
    const applyPrice = () => {
        let priceQuery = `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;

        if (props.location.search.indexOf('minPrice') != -1) {
            let query = props.location.search.replace(/minPrice=[\w\d .,]*&maxPrice=[\w\d .,]*&/, `${priceQuery}&`);
            query = query.replace(/page=[\w\d ,]*/, `page=1`);
            history.push(`/products${query}`);
        }
        else {
            let query = props.location.search.replace(/page=[\w\d ,]*/, `page=1`);
            history.push(`/products?${priceQuery}&${query.slice(1)}`)
        }
    }

    const applyBrands = () => {
        let brandQuery = brands.filter(b => b.selected).map(b => b.name).join(',');

        if (props.location.search.indexOf('brand') != -1) {
            let query = props.location.search.replace(/brand=[\w ,]*&/, `brand=${brandQuery}&`);
            query = query.replace(/page=[\w\d ,]*/, `page=1`);
            history.push(`/products${query}`);
        }
        else {
            let query = props.location.search.replace(/page=[\w\d ,]*/, `page=1`);
            history.push(`/products?brand=${brandQuery}&${query.slice(1)}`)
        }
    }

    const productsSection = (
        <div className="products-container product-sec">
            {/* <h1>Products</h1> */}
            {/* <p>{metaData.count} products.</p> */}
            {/* <Divider /> */}
            {!loading ? products[0] ?
                <div className="products">
                    {/* <Transition items={visibleProducts} keys={item => item.id} config={config.stiff} trail={100}
                        from={{ transform: 'translate(0,20px) translateZ(30px)', opacity: '0' }}
                        enter={{ transform: 'translate(0,0px) translateZ(0)', opacity: '1' }}>
                        {product => styles => <Product style={styles} key={product.id} product={product} addToCart={props.addToCart} feedback={() => setSnackbar(true)} />}
                    </Transition> */}
                    {visibleProducts.map(product => <Product key={product.id} product={product} addToCart={props.addToCart} feedback={() => setSnackbar(true)} />)}
                </div>
                :
                <React.Fragment>
                    <img src={emptySvg} className="empty" title="No products found" alt="No Products Found" />
                    <div className="no-products">
                        <h2>Sorry, No Products Found.</h2>
                        <p>Please try to search with a different spelling or check out our categories.</p>
                    </div>
                </React.Fragment>
                : <LinearProgress />
            }
        </div>
    )




    return (
        <div className="container-fluid page products-page">
            <div className="container-fluid">
                {/* <div className="cats">
                    {a?a.parentCategories.map(parent=>(
                        <Accordion key={parent.id} className="acco">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                {parent.name}
                            </AccordionSummary>
                            <AccordionDetails className="row">
                                {parent.categories.map(cata=>(
                                    <div key={cata.id} className="col-12 text-center mt-2"  >
                                         <Link to={`/products?category=${cata.name}`} style={{color:'var(--mainColor',textDecoration:'none'}}>{cata.name}</Link>
                                    </div>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    )):null}
                </div> */}
                <div className="row">
                    <div className="col-2 d-none d-md-block">
                        {
                            categories.length ?
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
                                            <CardContent className="side-nav">
                                                <List className="filter-list" dense component="nav" aria-label="main" id="categories-fetched"
                                                    subheader={<ListSubheader component="div" >Categories</ListSubheader>}
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

                                                {/* <Divider /> */}

                                                {
                                                    brands.length ?
                                                        <Accordion className="filter-list acc" dense aria-controls="brands-content" >
                                                            <AccordionSummary className="list-heading" expandIcon={<ExpandMoreIcon />}>Brands</AccordionSummary>
                                                            <AccordionDetails>
                                                                <div className="brands">
                                                                    {brands.map((brand, i) => <FormControlLabel key={brand.name + i} className="d-block ctrl m-0" label={brand.name} control={<Checkbox color="primary" checked={brand.selected} onChange={(e) => changeBrand(brand.name, e)} value={brand.name} />} />)}
                                                                </div>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                        : null
                                                }
                                                {/* <Divider /> */}

                                                {
                                                    categories.length ?
                                                        <Accordion className="filter-list acc" dense aria-controls="brands-content" >
                                                            <AccordionSummary className="list-heading" expandIcon={<ExpandMoreIcon />}>Price Filter</AccordionSummary>
                                                            <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <div onClick={applyPrice} style={{ margin: '-1.5em 0 1em 0' }} className="btn-sec">
                                                                    Apply
                                                                </div>
                                                                <div className="prices">
                                                                    <TextField InputProps={{
                                                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                                    }} type="number" label="min" value={priceRange[0]} onChange={(e) => handlePriceChange(e, 0)} />
                                                                    <TextField InputProps={{
                                                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                                    }} type="number" label="max" value={priceRange[1]} onChange={(e) => handlePriceChange(e, 1)} />

                                                                </div>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                        : null
                                                }

                                                {SKUTypes.map(name => (
                                                    name?.trim() ?
                                                        <React.Fragment key={name}>
                                                            <Accordion className="filter-list acc" key={name} dense  >
                                                                <AccordionSummary className="list-heading" expandIcon={<ExpandMoreIcon />}>{name}</AccordionSummary>
                                                                <AccordionDetails>
                                                                    <div className="pack-sizes">
                                                                        {SKUs.map(sku => (
                                                                            sku.name == name && sku.value ?
                                                                                <FormControlLabel key={sku.value + sku.id + sku.name} className="d-block ctrl m-0" label={sku.value} control={<Checkbox color="primary"
                                                                                    checked={sku.selected} onChange={(e) => changeSKU(sku.value, e)} value={sku.value} />} />
                                                                                : null
                                                                        ))}
                                                                    </div>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                            {/* <Divider /> */}
                                                        </React.Fragment>
                                                        : null
                                                ))}

                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                                : null
                        }

                    </div>
                    {
                        categories.length ?
                            <div style={{width:'100%',display:'flex'}}>
                                <div className="filter-lists">
                                    <Accordion style={{zIndex:'1',width:'180px',backgroundColor:'#fff',boxShadow:'none'}}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        style={{position:'relative',top:'2px'}}
                                        >
                                            <span style={{color:'#999'}}>Filters</span>
                                        </AccordionSummary>
                                        <AccordionDetails className="row" style={{}}>
                                        {
                                                    brands.length ?
                                                        <Accordion className="filter-list acc" dense aria-controls="brands-content" style={{width:'180px',boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                                                            <AccordionSummary className="" expandIcon={<ExpandMoreIcon />}>Brands</AccordionSummary>
                                                            <AccordionDetails>
                                                                <div className="brands">
                                                                    {brands.map((brand, i) => <FormControlLabel key={brand.name + i} className="d-block ctrl m-0" label={brand.name} control={<Checkbox color="primary" checked={brand.selected} onChange={(e) => changeBrand(brand.name, e)} value={brand.name} />} />)}
                                                                </div>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                        : null
                                                }
                                                {/* <Divider /> */}

                                                {
                                                    categories.length ?
                                                        <Accordion className="filter-list acc" dense aria-controls="brands-content" style={{width:'180px',boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
                                                            <AccordionSummary className="list-heading" expandIcon={<ExpandMoreIcon />}>Price Filter</AccordionSummary>
                                                            <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <div onClick={applyPrice} style={{ margin: '-1.5em 0 1em 0' }} className="btn-sec">
                                                                    Apply
                                                                </div>
                                                                <div className="prices">
                                                                    <TextField InputProps={{
                                                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                                    }} type="number" label="min" value={priceRange[0]} onChange={(e) => handlePriceChange(e, 0)} />
                                                                    <TextField InputProps={{
                                                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                                    }} type="number" label="max" value={priceRange[1]} onChange={(e) => handlePriceChange(e, 1)} />

                                                                </div>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                        : null
                                                }

                                                {SKUTypes.map(name => (
                                                    name?.trim() ?
                                                        <React.Fragment key={name}>
                                                            <Accordion className="filter-list acc" key={name} style={{width:'180px',boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}} >
                                                                <AccordionSummary className="list-heading" expandIcon={<ExpandMoreIcon />}>{name}</AccordionSummary>
                                                                <AccordionDetails>
                                                                    <div className="pack-sizes">
                                                                        {SKUs.map(sku => (
                                                                            sku.name == name && sku.value ?
                                                                                <FormControlLabel key={sku.value + sku.id + sku.name} className="d-block ctrl m-0" label={sku.value} control={<Checkbox color="primary"
                                                                                    checked={sku.selected} onChange={(e) => changeSKU(sku.value, e)} value={sku.value} />} />
                                                                                : null
                                                                        ))}
                                                                    </div>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                            {/* <Divider /> */}
                                                        </React.Fragment>
                                                        : null
                                                ))}
                                        </AccordionDetails>
                                    </Accordion>
                                 </div>   
                                <div className="filter-list acc sort-ctrl" dense aria-controls="brands-content">
                                <label style={{ color: '#aaa' }}>Sort by : </label>
                                <select onChange={handleChangeSort}>
                                    <option name="sort" value="">None</option>
                                    <option name="sort" value="skus.price&dir=ASC" >Price - Low to High</option>
                                    <option name="sort" value="skus.price&dir=DESC">Price - High to Low</option>
                                </select>
                            </div>
                             </div>   
                            
                            : null
                    }
                    <div className="col-md-10 col">
                        {props.userName ?
                            <Snackbar className="cart-snackbar" open={snackbar} onClose={() => setSnackbar(false)} autoHideDuration={2000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                                {true ? <Alert className="cart-snackbar" variant="filled" severity={props.response.status == 200 ? "success" : "warning"}>{props.response.message}</Alert> : null}
                            </Snackbar>
                            :
                            <Snackbar className="cart-snackbar" open={snackbar} onClose={() => setSnackbar(false)} autoHideDuration={2000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                                {true ? <Alert className="cart-snackbar" variant="filled" severity={"error"}>{"Please Login to add items to Cart"}</Alert> : null}
                            </Snackbar>
                        }
                        <div className="content">
                            {productsSection}
                            {
                                metaData.pageCount > 1 ?
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
                                    : null
                            }
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
        addToCart: (SKUId, qty = 1) => dispatch(actions.addToCart(SKUId, qty))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
