import React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom'

import {
    Grid, Card, CardContent, Paper, Typography, FormControl,
    InputLabel, Snackbar, CircularProgress, LinearProgress, Select, MenuItem, Button
}
    from '@material-ui/core';
import './OrderedItems.scss'

import site from '../../../../site_config';

function Orders(props) {

    return (
        <div className="admin-orders">
            <h1>Ordered Items</h1>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        ...state
    }
}
const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);