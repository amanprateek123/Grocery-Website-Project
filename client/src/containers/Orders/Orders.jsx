import React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useState, useRef } from 'react';
import {Link} from 'react-router-dom'

import {
    Grid, Card, CardContent, Paper, Typography, FormControl,
    InputLabel, Snackbar, CircularProgress, LinearProgress, Select, MenuItem, Button
}
    from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import Modal from '../../components/Modal/Modal'

import OrderItems from './OrderItems/OrderItems'
import './Orders.scss'

function Orders(props) {

    //user


    const [user, setUser] = useState(null);
    useEffect(() => {
        fetch('/profile', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            res.json().then(res => {
                setUser(res.user)
            })
        })
    }, []
    )
    //months array
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    //date decision
    const today = new Date();
    const [mon, setMon] = useState([]);
    let create;

    //finding last six month
    const sixMonth = (tod) => {
        if (tod.getMonth() >= 6) {
            tod.setMonth(tod.getMonth() - 6)
        }
        else {
            tod.setMonth(tod.getMonth() + 6)
            tod.setFullYear(tod.getFullYear() - 1)
        }
        return month[tod.getMonth()] + ' ' + tod.getFullYear()
    }

    //list of duration gapping six month
    useEffect(() => {
        if (!user) return;
        console.log(user.createdAt);

        create = new Date(user.createdAt)
        let _mon = [...mon];
        while (create.getFullYear() <= today.getFullYear()) {
            let c = month[create.getMonth()]
            let d = create.getFullYear()
            _mon.push(c + ' ' + d)
            create.setMonth(create.getMonth() + 6)
            if (create.getMonth() > 11) {
                create.setFullYear(create.getFullYear() + 1)
                create.setMonth(create.getMonth() - 12)
            }
            if (create.getFullYear() === today.getFullYear() && create.getMonth() > today.getMonth()) {
                break;
            }
        }
        _mon = _mon.reverse();
        setMon(_mon);

    }, [user])


    //page & dates
    const [res, setRes] = useState([]);
    let [page, setPage] = useState(1)
    let [prevPage, setPrevPage] = useState(0);

    const [fetching, setFetching] = useState(false);


    const [len, setLen] = useState(0)
    const [dates, SetDates] = useState('Jan 1971')

    useEffect(() => {
        fetch(`/get-orders?page=${1}&date=${dates}`, {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }).then(res => res.json())
            .then(data => {
                setPage(1);
                setRes(data)
                setLen(data.length)
            })
    }, [dates])


    useEffect((x) => {
        if (page == 1) return;

        setFetching(true);
        fetch(`/get-orders?page=${page}&date=${dates}`, {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }).then(res => res.json())
            .then(data => {
                let _res = JSON.parse(JSON.stringify(res))
                _res = [...res, ...data]
                setLen(data.length)
                setFetching(false)
                if (data.length) {
                    setRes(_res)
                }
            })
    }, [page])
    const [date, setDate] = React.useState(0);

    const handleChange = (event) => {
        setDate(event.target.value);
    };
    //modal
    const [show, setShow] = useState(false)
    const [od, setOd] = useState()
    const openModal = (id) => {
        setShow(true)
        setOd(id)
    }
    const closeModal = () => {
        setShow(false)
    }



    const load = () => {
        console.log(page, len);

        let _page = page + 1
        if (len) setPage(_page)
    }

    let loadBtn = useRef();
    // scroll
    const handleScroll = (e) => {
        const bottom = (e.target.scrollingElement.clientHeight - e.target.scrollingElement.scrollHeight + e.target.scrollingElement.scrollTop) < 3;
        if (bottom) {
            if (loadBtn.current) loadBtn.current.click();
            console.log('loading more..');

            window.removeEventListener('scroll', handleScroll);

            setTimeout(() => {
                window.addEventListener('scroll', handleScroll)
            }, 2000)
        }
    }

    useEffect(() => {

        window.addEventListener('scroll', handleScroll)

        return function cleanUp() {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [user])
   

    return (
        <React.Fragment>
            <div className="container">
                <Paper>
                    <Card>
                        <CardContent>
                            <Typography variant="h3" component="h1" style={{ color: 'grey', marginBottom: '0.5em' }}>
                                My Orders
                            </Typography>
                            {
                                user ?
                                    <FormControl className="mt-2" style={{ minWidth: '250px' }}>
                                        <InputLabel id="demo-simple-select-label" style={{ fontSize: '20px' }}>Duration</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={date}
                                            onChange={handleChange}>
                                            <MenuItem value={0} onClick={() => SetDates(sixMonth(new Date()))}>Last Six months</MenuItem>
                                            {mon.map((val, i) => {
                                                return <MenuItem key={val + i} value={val} onClick={() => SetDates(val)}>{val}</MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                    : null
                            }
                        </CardContent>
                    </Card>
                </Paper>
                <Paper style={{ marginTop: '16px', backgroundColor: 'transparent', boxShadow: 'none', overflowY: 'scroll' }} id="scroll" >
                    {(res.map) ? (
                        res.map((order, i) => {
                            let name = ''
                            return (
                                <Link to= {`/order/${order.id}`} style={{textDecoration:'none'}}>
                                <Card key={order.id + i} style={{ marginBottom: '16px', cursor: 'pointer' }} onClick={() => openModal(order.id)}>
                                    <div className="row">
                                        <div className="col-5">
                                            <div className="row">
                                                <div className="col-4 p-2">
                                                    <img src={order.orderItems[0].sku.images[0].src} style={{ width: '70%' }} className="ml-4" />
                                                </div>
                                                <div className="col-8">
                                                    <div className="mt-2">
                                                        {order.orderItems.forEach(od => {
                                                            name = od.sku.product.name
                                                        })}
                                                        <b>{order.orderItems[0].sku.product.name}</b><br />

                                                    </div>
                                                    <div className="mt-2" style={{ color: 'grey' }}>
                                                        Order Date : {month[new Date(order.createdAt).getMonth()]} {new Date(order.createdAt).getDate()}
                                                    </div>
                                                    <div className="mt-1" style={{ color: 'grey' }}>
                                                        Order ID : {order.id}
                                                    </div>
                                                    <div className="mt-1" style={{ color: 'grey' }}>
                                                        Seller : LalaDukaan
                                         </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3" style={{ fontSize: '17px', textAlign: 'left', margin: '2% 0' }}>
                                            ₹{order.price}
                                            {order.cancelled===null?null:<p style={{color:'red',fontSize:'14px',fontWeight:'550',position:'relative',bottom:'-50%'}}>Cancelled</p>}
                                        </div>
                                        <div className="col-4 pt-2" >
                                            <div style={{ textAlign: 'left', margin: '3% 0' }}>
                                                <b>  Delivered on {month[new Date(order.deliverOn).getMonth()]} {new Date(order.deliverOn).getDate()}</b>
                                            </div>
                                            <div style={{ textAlign: 'left', margin: '3% 0' }}>
                                                Return Policy valid till Tommorow, {month[today.getMonth()]} {today.getDate() + 1}
                                            </div>
                                            <div style={{ textAlign: 'left', color: 'var(--mainColor)', margin: '3% 0', cursor: 'pointer' }}>
                                                <StarIcon /> <span>RATE & REVIEW PRODUCT</span>
                                            </div>
                                        </div>

                                    </div>
                                </Card></Link>
                            )
                        })
                    ) : null}
                </Paper>
                <div className="load-more">
                    {fetching ? <LinearProgress /> : !len ? <h5>...</h5> : <Button ref={loadBtn} color="secondary" onClick={load} >.</Button>}
                </div>
            </div>
        </React.Fragment>
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