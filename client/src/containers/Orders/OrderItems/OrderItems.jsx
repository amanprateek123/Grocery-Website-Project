import React, { useState, useEffect, useHistory } from 'react'
import { connect } from 'react-redux'
import {
  Grid, Card, CardContent, Slider, Paper, Typography, FormControl, CardMedia, Avatar,
  List, ListItem, ListSubheader, ListItemIcon, ListItemText, Divider,
  TextField, CardActionArea, CardActions, Button, Select, MenuItem, InputLabel, Snackbar
}
  from '@material-ui/core';
import './OrderItems.scss'
import CloseIcon from '@material-ui/icons/Close';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import Modal from '../../../components/Modal/Modal'
import { useMutation } from 'react-query'
import { Redirect } from 'react-router-dom'
import { Alert } from '@material-ui/lab'

import Swal from 'sweetalert2'

import site from '../../../site_config';

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

  let orderId = props.match.params.id;
  const [order, setOrder] = useState(null);
  useEffect(() => {
    fetch(`/get-orders?page=1&date=1&id=${props.match.params.id}`, {
      headers: {
        'Authorization': 'Bearer ' + props.idToken,
        'Content-Type': 'application/json'
      },
      method: 'GET',
    }).then(res => res.json())
      .then((data) => {
        setOrder(data[0])
        console.log(data[0])
      })
  }, [])

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
    let val = status_1(ord.status.status).value
    while (val >= 0) {
      pro.push(val)
      val = val - 33.33
    }
    return pro
  }
  const cancel_list = [
    { reason: 'Order Created by mistake' },
    { reason: 'Item(s) would not arrive on time' },
    { reason: 'Shipping cost is too high' },
    { reason: 'Item price is too high' },
    { reason: 'Found Cheaper somewhere else' },
    { reason: 'Need to change Shipping address' },
    { reason: 'Need to change shipping speed' },
    { reason: 'Need to change billing address' },
    { reason: 'Need to change payment method' },
    { reason: 'Others' }
  ]
  const [cancel, setCancel] = useState(false)
  const openModal = () => {
    setCancel(true)
  }
  const closeModal = () => {
    setCancel(false)
  }




  //   const deleteOrder = ()=>{
  //     return fetch('/delete-order',{
  //         headers: {
  //             'Authorization': 'Bearer ' + props.idToken,
  //             'Content-Type': 'application/json'
  //         },
  //         method:'POST',
  //         body:JSON.stringify({id:props.match.params.id})
  //     }
  //         ).then(async res=>{
  //           res = await res.json()
  //           if(res.status === 400){
  //               return res.message
  //           }
  //           return res.message
  //         }).catch(err => {
  //             console.log(err);
  //         })
  // // }
  const [snackbar, setSnackbar] = useState(false)

  const cancelOrder = (variable) => {
    let body;
    if (variable.variables.reason === "Others") {
      body = variable.variables.other
    }
    else {
      body = variable.variables.reason
    }
    console.log(body)
    return fetch('/get-orders', {
      headers: {
        'Authorization': 'Bearer ' + props.idToken,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      body: JSON.stringify({ reason: body, id: order.id })
    }).then(res => res.json()).then(res => {
      console.log(order.id)
      setTimeout(() => {
        props.history.push(`/orders`)
      }, 3000)
    }
    )
  }
  // let data = []
  // if(order){
  //   data = [...order.orderItems]
  // }
  // const duplicate = (data) =>{
  //   data.map(item=>{
  //     let a = []
  //     if(!a.includes(item)){
  //           a.push(item)
  //     }
  //     return a
  //   })
  // }

  const [cancels, meta] = useMutation(cancelOrder)

  const [msg, setMsg] = useState(false);

  const getInvoice = (orderId) => {
    fetch(`/get-invoice/${orderId}`, {
      headers: {
        'Authorization': 'Bearer ' + props.idToken,
      },
      method: 'GET',
    }).then(async response => {
      if (response.status != 200) {
        return Swal.fire('Not Authorized', 'The order was not found with your account.', 'error');
      }
      let blob = await response.blob();
      let url = URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.download = `invoice-${orderId}.pdf`
      a.href = url;
      a.click();
    })
  }

  const cancelling = (
    order ?
      <React.Fragment>
        <Paper className="container" style={{ minHeight: '350px', padding: '15px' }}>
          <CloseIcon style={{ float: 'right', cursor: 'pointer' }} onClick={closeModal} />
          <h4 style={{ padding: '10px 20px' }}>Reason for cancellation:</h4>
          <Formik
            initialValues={{
              reason: '',
              other: ''
            }}
            onSubmit={async (values, { setSubmitting }) => await cancels({ variables: values })}
          >
            {({ values }) => (
              <Form className="row">
                <div className="col-md-8">
                  <Field style={{ width: '60%', margin: '30px 17%', padding: '10px' }} as="select" name="reason">
                    <option value="">Select Cancellation Reason</option>
                    {cancel_list.map(itm => {
                      return (
                        <option value={itm.reason}>{itm.reason}</option>
                      )
                    })}
                  </Field>
                  {values.reason === "Others" ? <Field type="text" required name="other" placeholder="Enter reason..." style={{ width: '14.3rem', margin: '0 17%', padding: '10px' }} className="vis" /> : <Field type="text" name="other" placeholder="Enter reason..." style={{ width: '30%', margin: '0 17%', padding: '10px' }} className="hid" />}

                </div>
                <div className="col-md-3 cancel_o">
                  <Button type="submit" variant="contained" disabled={(values.reason === '') ? true : false} color='secondary' style={{ padding: '10px', width: '200px', marginTop: '12%' }} >Cancel Order</Button>
                </div>
                {(meta.isSuccess && order.statusId < 3) ?
                  <div className="message">
                    <p style={{ textAlign: 'left', color: 'green', marginTop: '2%' }}>Your order has been cancelled for the reason indicated below. You will get an email with details of items which were part of the cancelled order.</p>
                    <p><b>Reason:</b> {values.other === '' ? values.reason : values.other} </p>
                  </div> : null
                }
              </Form>
            )}

          </Formik>
        </Paper>
      </React.Fragment> : null
  )
  // let a = []
  // let skuId = []
  // if(order){
  //   for(let i=0;i<order.orderItems.length;i++){
  //     let count = 0
  //         for(let j=0;j<order.orderItems.length;j++){
  //            if(order.orderItems[i].sku.id===order.orderItems[j].sku.id){
  //                     count++;
  //            }
  //         }     
  //     if(!skuId.includes(order.orderItems[i].sku.id)){
  //     a.push({data:order.orderItems[i],count:count})
  //     skuId.push(order.orderItems[i].sku.id)
  //         }   
  //   }
  // }
  // console.log(a)
  let filtered = [];
  if (order) {
    for (let oi of order.orderItems) {
      let existing = filtered.find(foi => foi.skuId == oi.skuId);
      if (existing) {
        existing.count++;
      }
      else {
        filtered.push({ ...oi, count: 1 })
      }
    }
  }

  return (
    order ? <React.Fragment>
      <Paper className="container" style={{ marginTop: '2%', marginBottom: '2%', paddingBottom: '20px' }}>
        <div className="row">
          <div className="col-md-5">
            <h1 style={{ padding: '25px 0 5px 0', fontSize: '20px', fontWeight: 'bold' }}>Order Summary</h1>
            <p style={{ fontSize: '15px' }}>Ordered on {new Date(order.createdAt).getDate()} {month[new Date(order.createdAt).getMonth()]} {new Date(order.createdAt).getFullYear()} </p>
            <p style={{ fontSize: '15px' }}>Order: <span style={{ color: 'var(--mainColor)' }}> #{10000 + order.id} </span></p>
          </div>
          <div className="col-md-6 slider" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            {!order.isCancelled ?
              <Slider
                defaultValue={single(order)}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-custom"
                step={33.33}
                valueLabelDisplay="auto"
                marks={progress}
                disabled
                style={{ color: 'green', textTransform: 'capitalize' }}
              /> : <h5 style={{ fontSize: '16px' }}>Status:<span className="ml-2" style={{ color: 'red', fontWeight: '550' }}>Cancelled</span></h5>}
          </div>
        </div>
        <div className="orderItems">
          <div className="row" style={{ padding: '10px 15px' }}>
            <div className="col-md-4">
              <h5 style={{ fontSize: '16px', fontWeight: 'bold' }}>Shipping Address</h5>
              <div style={{ fontSize: '13px' }}>
                {JSON.parse(order.shippingAddress).address}<br />
                      State: <span style={{ fontWeight: 'bold' }}> {JSON.parse(order.shippingAddress).state} </span><br />
                      Country: <span style={{ fontWeight: 'bold' }} > {JSON.parse(order.shippingAddress).country} </span><br />
                      Pin Code: <span style={{ fontWeight: 'bold' }} > {JSON.parse(order.shippingAddress).zip} </span>
              </div>
            </div>
            <div className="col-md-4">
              <h5 style={{ fontSize: '16px', fontWeight: 'bold' }}>Payment Method</h5>
              <p style={{ fontSize: '13px' }}> {order.paymentType} </p>
              <div className="mt-4" style={{ fontSize: '16px' }}>
                Download <span style={{ color: 'var(--mainColor)', cursor: 'pointer' }} onClick={() => getInvoice(orderId)}>Invoice</span>
              </div>
            </div>
            <div className="col-md-4">
              <h5 style={{ fontSize: '16px', fontWeight: 'bold' }}>Order Summary</h5>
              <div style={{ fontSize: '13px' }}>
                Item(s) Subtotal: <span style={{ float: 'right' }}> ₹{order.price - order.shippingCharges + order.discount} </span><br />
                      Shipping: <span style={{ float: 'right' }}> +₹{order.shippingCharges} </span><br />
                {order.discount ? <React.Fragment>Discount : <span style={{ float: 'right' }}> -₹{order.discount} </span><br /></React.Fragment> : null}
                <div className="mt-3" style={{ fontWeight: 'bold' }}>
                  <span >Grand Total:</span> <span style={{ float: 'right' }}> ₹{order.price} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="orderItems">
          <div className="row" style={{ padding: '10px 15px' }}>
            <div className="col-md-8 hides" style={{ maxHeight: '450px', overflowY: 'scroll' }}>
              <div>
                {filtered.map((item, i) => {
                  return (
                    <div className="row p-1 mt-1" key={i}>
                      <div className="col-md-2 li_img" style={{ backgroundImage: `url(${item.sku.images[0].src})` }}>

                      </div>
                      <div className="col-md-8 order_list_item">
                        <p style={{ fontSize: '16px', fontWeight: 'bold' }}> {item.sku.product.name} </p>
                        <p>Sold by: <span style={{ color: 'var(--mainColor)' }}>{site.name}</span></p>
                        <p>₹ <span style={{ color: 'var(--mainColor)' }}> {item.sku.price} </span></p>
                        <p style={{ fontWeight: 'bold' }}>Quantity: <span style={{ fontWeight: 'normal' }}> {item.count} </span></p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="col-md-4" style={{ display: 'flex', justifyContent: 'center' }}>
              {!order.isCancelled ?
                <div className="mt-3">
                  <Button variant="contained" color="inherit" style={{ backgroundColor: 'var(--mainColor)', color: 'white', padding: '10px 15px', width: '260px', fontSize: '14px' }}>Track Package</Button>
                  <div style={{ marginTop: '5%' }}>
                    {order.statusId < 3 ? <Button variant="contained" color="inherit" style={{ backgroundColor: '#f3f3f3', color: 'black', padding: '10px 15px', width: '260px', fontSize: '14px' }} onClick={openModal}>Cancel Order</Button> :
                      <Button variant="contained" color="inherit" style={{ backgroundColor: '#f3f3f3', color: 'black', padding: '10px 15px', width: '260px', fontSize: '14px' }} onClick={() => setMsg(true)} >Cancel Order</Button>}
                    <Modal visible={cancel}>
                      {cancelling}
                    </Modal>
                  </div>
                </div> : null}
            </div>
          </div>
          {msg ?
            <div>
              <p style={{ textAlign: 'left', color: 'red', marginTop: '1%', fontSize: '15px', padding: '0 15px' }}><b>Note: </b><span style={{ fontSize: '13px', color: 'black' }}>Your Order is shipped.So,you are not able to cancel the order!</span> </p>
            </div> : null}
        </div>

      </Paper>
      {/* <Snackbar open={snackbar} autoHideDuration={2000} className="home-snackbar" onClose={() => setSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
         <Alert  severity="success" className="home-snackbar" variant="filled" >
            Your Order is Cancelled!
          </Alert>
      </Snackbar> */}
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



{/* <Paper className="orderItem">
        <div className="row" style={{height:'100%'}}>
          <div className="col-md-3" style={{borderRight:'1px solid grey',height:'100%'}}>
            <Typography variant="h6" component="h6">
              #{(order[0].id)}
            </Typography>
            <Typography variant="p" component="p">
              ordered on <span className="text12" style={{ color: 'var(--mainColor)' }}>{new Date(order[0].createdAt).getDate()}/{new Date(order[0].createdAt).getMonth() + 1}/{new Date(order[0].createdAt).getFullYear()}</span>
            </Typography>
            <Typography variant="h5" component="h5" style={{ marginTop: '15%', textAlign: 'left', marginBottom: '5%' }}>
              Delivery Address
            </Typography>
            <Typography variant="p" component="h6" style={{ textAlign: 'left',fontSize:"14px",lineHeight:'1.5'}}>
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
            <Paper className="q1" style={{ overflowY: 'scroll',overflowX:'hidden', maxHeight: '400px', boxShadow: 'none' }}>
              {order[0].orderItems.map(itm => {
                return (
                  <div className="rows">
                    <div className="col-md-3">
                      <img src={itm.sku.images[0].src} style={{ width: '100%', height: 'auto',maxHeight:'80px',padding:'5px' }} />
                    </div>
                      <div className="col-md-7" style={{ textAlign: 'center',margin:'auto' }}>
                        <Typography variant="p" component="h6" style={{ fontWeight: '600', fontSize: '11px' }}>
                          {itm.sku.product.name}
                        </Typography>
                      </div>
                      <div className="col-md-2" style={{ color: 'grey', fontWeight: 'bold', margin:'auto',textAlign:'center'}}>
                        <Typography variant="p" component="h6">
                          ₹{itm.sku.price}
                        </Typography>
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
                style={{ color: 'green'}}
              />
            </div>
            <Typography variant="p" component="h6" style={{ textAlign: 'center',marginTop:'10%' }}>
              <b style={{ fontSize: '13px', color: "#666", padding: "1em" }}>
                Your Item has been deliverd on <span>
                  {new Date(order[0].deliverOn).getDate()} {month[new Date(order[0].deliverOn).getMonth()]}  {new Date(order[0].deliverOn).getFullYear()}
                </span>
              </b>
            </Typography>
          </div>
        <span className="cross_order"><CloseIcon onClick={props.closeModal} /></span>
        </div>
        <div>
        <p className="return_pol">
          Return policy valid till Today,{(new Date()).getDate()}, {month[new Date().getMonth()]}
          <span style={{ color: 'var(--mainColor' }}>  <ReplayIcon /> RETURN  <HelpIcon /> NEED HELP? <StarIcon />  RATE & REVIEW PRODUCTS</span>
        </p>
      </div>
      </Paper> */}