import React from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';

import {
    Grid, Card ,CardContent, Paper, Typography,FormControl, CardMedia, Avatar,
    List, ListItem, ListSubheader, ListItemIcon, ListItemText, Divider,
    TextField, CardActionArea, CardActions, Button, Select, MenuItem, InputLabel, Snackbar
}
    from '@material-ui/core';
    import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom';

function Orders(props) {

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

    const [res, setRes] = useState();

    useEffect(() => {

        fetch('/get-orders', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }).then(res => res.json())
            .then(data => {
                setRes(data)
            })

    }, [])

    const [user, setUser] = useState({});
   useEffect(()=>
    {
        fetch('/profile', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken
            }
        }).then(res => {
            res.json().then(res => {
                setUser(res.user)

            })
        })
    },[]
   )  
   const [date, setDate] = React.useState('');

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  const today = new Date();
  const created = new Date(user.createdAt)
 
    return (
       <React.Fragment>
           <div className="container">
           <Paper>
               <Card>
                  <CardContent>
                    <Typography variant="h4" component="h1" style={{color:'grey'}}>
                       My Orders
                    </Typography>
                    <FormControl className="mt-2" style={{minWidth:'250px'}}>
                      <InputLabel id="demo-simple-select-label">Duration</InputLabel>
                         <Select
                           labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           value={date}
                           onChange={handleChange}>
                                <MenuItem value={10}>{month[created.getMonth()]} {created.getFullYear()}</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                  </CardContent>
               </Card>
           </Paper>
           <Paper style={{marginTop:'16px',backgroundColor:'transparent',boxShadow:'none'}}>
               {(res && user) ?(
                   res.map((order,i)=>{
                    let name = ''
                    return(
                        <Link to={`/order/${order.id}`} style={{textDecoration:'none'}}>
                            <Card style={{marginBottom:'16px'}}>
                            <div className="row">
                                <div className="col-5">
                                   <div className="row">
                                      <div className="col-4 p-2">
                                         <img src={order.orderItems[0].sku.images[0].src} style={{width:'70%'}} className="ml-4" />
                                      </div>
                                      <div className="col-8">
                                         <div className="mt-2">
                                         {order.orderItems.forEach(od=>{
                                                name=name+' '+od.sku.name+','
                                         })}
                                         <b>{name}</b><br/>
                                         
                                         </div>
                                         <div className="mt-2" style={{color:'grey'}}>
                                             Order Date : {month[new Date(order.createdAt).getMonth()]}
                                         </div>
                                         <div className="mt-1" style={{color:'grey'}}>
                                             Order ID : {order.id}
                                         </div>
                                         <div className="mt-1" style={{color:'grey'}}>
                                             Seller : LalaDukaan
                                         </div>
                                         
                                      </div>
                                   </div>
                                </div>
                                 <div className="col-3" style={{fontSize:'17px',textAlign:'left',margin:'2% 0'}}>
                                    ₹{order.price}
                                </div>
                                 <div className="col-4 pt-2" >
                                     <div style={{textAlign:'left',margin:'3% 0'}}>
                                     <b>  Delivered on {month[new Date(order.deliverOn).getMonth()]} {new Date(order.deliverOn).getDate()}</b>
                                     </div>
                                     <div style={{textAlign:'left',margin:'3% 0'}}>
                                         Return Policy valid till Tommorow, {month[today.getMonth()]} {today.getDate()+1} 
                                     </div>
                                     <div style={{textAlign:'left',color:'var(--mainColor)', margin:'3% 0',cursor:'pointer'}}>
                                         <StarIcon/> <span>RATE & REVIEW PRODUCT</span>
                                     </div>
                                </div>

                            </div>
                        </Card>
                        </Link>
                    )
                })
               ):null}
           </Paper>
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