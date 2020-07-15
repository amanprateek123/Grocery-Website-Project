import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Grid, Card, CardContent, Slider, Paper, Typography, FormControl, CardMedia, Avatar,
  List, ListItem, ListSubheader, ListItemIcon, ListItemText, Divider,
  TextField, CardActionArea, CardActions, Button, Select, MenuItem, InputLabel, Snackbar
}
  from '@material-ui/core';
import './OrderItems.scss'
import CloseIcon from '@material-ui/icons/Close';
import ReplayIcon from '@material-ui/icons/Replay';
import HelpIcon from '@material-ui/icons/Help';
import StarIcon from '@material-ui/icons/Star';

function OrderItems(props) {
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
  const [order, setOrder] = useState(null);
  useEffect(() => {
    fetch(`/get-orders?page=1&date=1&id=${props.id}`, {
      headers: {
        'Authorization': 'Bearer ' + props.idToken,
        'Content-Type': 'application/json'
      },
      method: 'GET',
    }).then(res => res.json())
      .then((data) => {
        setOrder(data)
        console.log(data)
      })
  }, [])

  console.log(order)
  const progress = [
    {
      value: 0,
      label: 'ordered',
    },
    {
      value: 33.33,
      label: 'packed',
    },
    {
      value: 66.66,
      label: 'shipped',
    },
    {
      value: 99.99,
      label: 'delivered',
    },
  ];

  function valuetext(value) {
    return `${value}`;
  }
  const status_1 = (ord) => {
    let status = progress.find((p) => {
      return p.label === ord
    })
    return status
  }
  const single = (ord) => {
    let pro = []
    let val = status_1(ord[0].status.status).value
    while (val >= 0) {
      pro.push(val)
      val = val - 33.33
    }
    return pro
  }
  console.log(order)

  let address;

  return (
    order ? <React.Fragment>
      <Paper className="orderItem">
        <div className="row">
          <div className="col-md-3">
            <Typography variant="h6" component="h6">
              #{(order[0].id)}
            </Typography>
            <Typography variant="p" component="p">
              ordered on <span className="text12" style={{ color: 'green' }}>{new Date(order[0].createdAt).getDate()}/{new Date(order[0].createdAt).getMonth() + 1}/{new Date(order[0].createdAt).getFullYear()}</span>
            </Typography>
            <Typography variant="h5" component="h5" style={{ marginTop: '15%', textAlign: 'left', marginBottom: '5%' }}>
              Delivery Address
            </Typography>
            <Typography variant="p" component="h6" style={{ textAlign: 'left', color: 'green' }}>
              {(address = JSON.parse(order[0].shippingAddress)) ? null : null}
              <p style={{ width: '100%' }} className="mar">
                <div>{address.name} - {address.mobile}</div>
                <div>{address.address},{address.city} </div>
                <div>{address.state} - {address.zip}, {address.country}</div>
                <div>{address.email}</div>
              </p>
            </Typography>
          </div>
          <div className="col-md-5">
            <Paper className="q1" style={{ overflowY: 'scroll', maxHeight: '400px', boxShadow: 'none' }}>
              {order[0].orderItems.map(itm => {
                return (
                  <div className="rows">
                    <div className="q2">
                      <img src={itm.sku.images[0].src} style={{ width: '100px', height: 'auto' }} />
                    </div>
                    <div>
                      <div className="q4" style={{ textAlign: 'center', marginTop: '6%' }}>
                        <Typography variant="p" component="h6" style={{ fontWeight: '600', fontSize: '12px' }}>
                          {itm.sku.product.name}
                        </Typography>
                      </div>
                      <div className="q2" style={{ color: 'grey', fontWeight: 'bold', marginTop: '6%' }}>
                        <Typography variant="p" component="h6">
                          ₹ {itm.sku.price}
                        </Typography>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Paper>
          </div>
          <div className="col-md-4">
            <div className="status_slide" style={{ width: '80%', margin: '0 auto', marginTop: '10%', paddingTop: '1%', color: 'green' }}>
              <Slider
                defaultValue={single(order)}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-custom"
                step={33.33}
                valueLabelDisplay="auto"
                marks={progress}
                disabled
                style={{ color: 'green' }}
              />
            </div>
            <Typography variant="p" component="h6" style={{ textAlign: 'center' }}>
              <b style={{ fontSize: '13px', color: "#666", padding: "1em" }}>
                Your Item has been deliverd on <span>
                  {new Date(order[0].deliverOn).getDate()} {month[new Date(order[0].deliverOn).getMonth()]}  {new Date(order[0].deliverOn).getFullYear()}
                </span>
              </b>
            </Typography>
          </div>
        </div>
        <span className="cross_order"><CloseIcon onClick={props.closeModal} /></span>
      </Paper>
      <div>
        <p className="return_pol">
          Return policy valid till Today,{(new Date()).getDate()}, {month[new Date().getMonth()]}
          <span style={{ color: 'var(--mainColor' }}>  <ReplayIcon /> RETURN  <HelpIcon /> NEED HELP? <StarIcon />  RATE & REVIEW PRODUCTS</span>
        </p>
      </div>
    </React.Fragment> : null
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderItems);