import React, { useState, useEffect } from 'react'
import { Card, Paper, CardMedia, CardContent, Typography, CardActions, Button, Select, MenuItem, Fab, InputLabel, CardActionArea } from '@material-ui/core';
import './Checkout.scss'
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Order from './OrderSum'
import AddressEditor from '../../containers/Profile/AddressEditor'
import Payment from './Payment/Payment';
import * as actions from '../../store/actions'

function Checkout(props) {

    const [user, setUser] = useState({});
    useEffect(() => {
        fetch('/profile', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken
            }
        }).then(res => {
            res.json().then(res => {
                setUser(res.user)
                props.setAddress(res.user.addresses[0]);

            })
        })

        // fetch latest cart
        props.fetchCart();

    }, []
    )


    const [addr, SetAddr] = useState(3)
    const [addingAddress, setAddingAddress] = useState(false);
    const [addressEditMode, setAddressEditMode] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null)


    const [radio, setRadio] = useState(0)
    const radiochange = (i) => {
        setRadio(i)
        setAddressEditMode(false)
        props.setAddress(user.addresses[i]);
    }
    const viewAdd = (i) => {
        if (addr === i) {
            SetAddr(3)
        }
        else {
            SetAddr(i)
        }
    }
    const [idx, SetIdx] = useState(0)

    const [box, setBox] = useState(1)
    const takeBox = (i) => {
        setBox(2)
        SetIdx(i)
    }
    const setPayment = () => {
        setBox(3)
    }
    const change1 = () => {
        setBox(2)
    }

    const addAddress = (address) => {
        fetch('/add-address', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(address)
        }).then(async res => {
            res = await res.json();
            console.log(res);
            if (res.status == 200) {
                setAddingAddress(false);
                setUser((user) => ({
                    ...user,
                    addresses: [
                        ...user.addresses,
                        {
                            ...address,
                            id: res.addressId
                        }
                    ]
                }))
            }
            else {
                props.setResponse(res);
            }

        }).catch(err => {
            console.log(err);

        })
    }
    const removeAddress = (id) => {
        fetch('/remove-address', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({ id })
        }).then(async res => {
            res = await res.json();
            console.log(res);
            if (res.status == 200) {
                setUser((user) => ({
                    ...user,
                    addresses: user.addresses.filter(add => add.id != id)
                }))
            }
            else {
                props.setResponse(res);
            }

        }).catch(err => {
            console.log(err);

        })
    }
    const [show, setShow] = useState(false)
    const remAdd = () => {
        setShow(false)
    }
    const change = () => {
        setBox(1)
    }
    const editAddress = (address) => {
        setAddressEditMode(true);
        setEditingAddress(address);
    }
    const editAddressPost = (address) => {
        removeAddress(address.id);
        addAddress(address);
        setAddressEditMode(false);
        setEditingAddress(null);
    }
    return (
        box === 1 ?
            (
                (user && user.addresses) ?
                    <Paper style={{ marginTop: '15px', boxShadow: 'none' }} id="ord">
                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <div className="address_det">
                                <h3>
                                    <span className="span1">
                                        1
                                    </span>
                                    <span className="span2">
                                        Delivery Address
                                    </span>
                                </h3>
                                <div >
                                    <div>
                                        {user.addresses.slice(0, addr).map((add, i) => {
                                            return (
                                                <label for="radio" className="add_radio">
                                                    <input type="radio" id="radio" name='address' value={i} checked={radio == i} onChange={() => radiochange(i)} onClick={remAdd} />
                                                    <div className="user_add">
                                                        <div style={{ width: '100%' }}>
                                                            <div className="user_1">
                                                                <p className="mb-0">
                                                                    <span className="span_name">{user.addresses[i].name}</span>
                                                                    {/* <span className="span_place">Home</span> */}
                                                                    <span className="span_num">{user.addresses[i].mobile}</span>
                                                                </p>

                                                                {!add.canDeliver ? <div className="badge badge-warning mb-1 ml-1" style={{ opacity: 0.7 }}>Delivery NOT Availiable at this address </div> : null}
                                                                <span className="address_show">
                                                                    {add.address}
                                                                    <br />
                                                                    <span> {add.state}, {add.country} - {add.zip}</span>
                                                                </span>
                                                                {(radio === i) ?
                                                                    add.canDeliver ?
                                                                        <button onClick={() => takeBox(i)}>
                                                                            Deliver Here
                                                                        </button>
                                                                        : <button style={{ opacity: 0.8, filter: 'saturate(0)' }}>
                                                                            Deliver Here
                                                                        </button>
                                                                    : null
                                                                }
                                                            </div>
                                                            {(radio === i) ? <div className="user_edit">
                                                                <button onClick={() => editAddress(add)}>
                                                                    Edit
                                                                </button>
                                                            </div>
                                                                : null
                                                            }
                                                        </div>
                                                    </div>
                                                </label>
                                            )
                                        })}
                                    </div>
                                    {(user.addresses.length > 3) ?
                                        <div style={{ backgroundColor: 'white' }}>
                                            <div className="adder" onClick={() => viewAdd(user.addresses.length)}>
                                                <ExpandMoreIcon style={{ margin: '0 22px 0 26px', verticalAlign: 'middle' }} className={(addr === user.addresses.length) ? "uparrow" : null} />
                                                View all {user.addresses.length} addresses
                                            </div>
                                        </div>
                                        : null
                                    }
                                    <section style={{ marginTop: '8px', backgroundColor: 'white' }}>
                                        <AddressEditor addAddress={addAddress} editMode={addressEditMode} address={editingAddress} show={show} />
                                        {addressEditMode ? <AddressEditor addAddress={editAddressPost} onCancel={() => setAddressEditMode(false)} editMode={addressEditMode} address={editingAddress} show={show} /> : null}
                                    </section>

                                    <div style={{ marginTop: '8px', backgroundColor: 'white' }}>
                                        <div className="order_sum">
                                            <span className="span1" style={{ margin: '0 22px 0 26px', verticalAlign: 'middle' }}>
                                                2
                                            </span>
                                            ORDER SUMMARY
                                        </div>
                                    </div>


                                    <div style={{ marginTop: '8px', marginBottom: '8px', backgroundColor: 'white' }}>
                                        <div className="order_sum">
                                            <span className="span1" style={{ margin: '0 22px 0 26px', verticalAlign: 'middle' }}>
                                                3
                                            </span>
                                            PAYMENT OPTIONS
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </Paper>
                    : null
            ) : box === 2 ? <Order idx={idx} address={user.addresses} takeBox={takeBox} user={user} change={change} payment={setPayment} /> :
                box === 3 ? <Payment setPlacedOrder={props.setPlacedOrder} setOrderData={props.setOrderData} idx={idx} address={user.addresses} addrIndex={radio} takeBox={takeBox} user={user} change={change} cart={props.cart} change1={change1} /> : null

    )
}
const mapStateToProps = state => {
    return {
        ...state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        emptyCart: () => dispatch({ type: actions.SET_CART, cart: [] }),
        fetchCart: () => dispatch(actions.fetchCart())


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);