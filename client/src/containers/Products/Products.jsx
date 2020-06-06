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

let sample_product = {
    name: "Product Name",
    category: "category",
    brand: "company name",
    description: "a very short description",
    price: "$720",
    packs: ["12kg", "15kg", '27kg']
}

const Profile = (props) => {


    const products = (
        <div className="products-container">
            <h1>Products</h1>
            <Divider />
            <div className="products">
                <Product product={sample_product} />
                <Product product={sample_product} />
                <Product product={sample_product} />
                <Product product={sample_product} />
                <Product product={sample_product} />
            </div>
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
                                            <Chip className="chip" clickable size="small" variant="outlined" label="this category" />
                                            <Chip className="chip" clickable size="small" variant="outlined" label="that category" />
                                        </List>
                                        <Divider />
                                        <List dense component="nav" aria-label="secondary"
                                            subheader={<ListSubheader component="div" id="nested-list-subheader">Brand</ListSubheader>}
                                        >
                                            <div className="brands">
                                                <FormControlLabel className="d-block ctrl m-0" label="Apple" control={<Checkbox value="apple" />} />
                                                <FormControlLabel className="d-block ctrl m-0" label="samsung" control={<Checkbox value="samsung" />} />
                                                <FormControlLabel className="d-block ctrl m-0" label="motorola" control={<Checkbox value="motorola" />} />
                                                <FormControlLabel className="d-block ctrl m-0" label="haldiram & sons" control={<Checkbox value="haldiram & sons" />} />
                                                <FormControlLabel className="d-block ctrl m-0" label="a very big company name" control={<Checkbox value="a very big company name" />} />
                                            </div>
                                        </List>
                                        <Divider />
                                        <List dense component="nav" aria-label="secondary"
                                            subheader={<ListSubheader component="div" id="nested-list-subheader">Price Range</ListSubheader>}
                                        >
                                            <div className="prices">
                                                <FormControlLabel className="d-block ctrl m-0" label="120$ - 160$" control={<Checkbox value="" />} />
                                                <FormControlLabel className="d-block ctrl m-0" label="120$ - 160$" control={<Checkbox value="" />} />
                                                <FormControlLabel className="d-block ctrl m-0" label="120$ - 160$" control={<Checkbox value="" />} />
                                                <FormControlLabel className="d-block ctrl m-0" label="120$ - 160$" control={<Checkbox value="" />} />
                                                <FormControlLabel className="d-block ctrl m-0" label="120$ - 160$" control={<Checkbox value="" />} />
                                            </div>
                                        </List>
                                        <Divider />
                                        <List dense component="nav" aria-label="secondary"
                                            subheader={<ListSubheader component="div" id="nested-list-subheader">Pack Size</ListSubheader>}
                                        >
                                            <div className="pack-sizes">
                                                <FormControlLabel className="d-block ctrl m-0" label="2kg" control={<Checkbox value="" />} />
                                                <FormControlLabel className="d-block ctrl m-0" label="2kg" control={<Checkbox value="" />} />
                                                <FormControlLabel className="d-block ctrl m-0" label="2kg" control={<Checkbox value="" />} />
                                                <FormControlLabel className="d-block ctrl m-0" label="2kg" control={<Checkbox value="" />} />
                                                <FormControlLabel className="d-block ctrl m-0" label="2kg" control={<Checkbox value="" />} />
                                            </div>
                                        </List>

                                    </CardContent>
                                </Card>
                            </div>

                        </div>
                    </div>
                    <div className="col-9">
                        <div className="content">
                            {products}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);