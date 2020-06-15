import React from 'react'
import './Details.scss'
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ChatIcon from '@material-ui/icons/Chat';
import LocalShippingSharpIcon from '@material-ui/icons/LocalShippingSharp';
import {
    Grid, Card, CardContent, Paper, Typography, CardMedia, Avatar,
    List, ListItem, ListSubheader, ListItemIcon, ListItemText, Divider,
    TextField, CardActionArea, CardActions,FormControl, Button, Select, MenuItem, InputLabel, Badge, Chip, Checkbox, FormControlLabel
} from '@material-ui/core';
import { useState } from 'react';

const Detail = (props)=>{

const quantity = props.quantity    
const json = props.json;
let content=[];

for(let i=0;i<3;i++){
    content.push(
        <div className="json">
            <h5>{json[i].key}</h5>            
                <div className="lister">
            {Array.isArray(json[i].value)?
            json[i].value.map(li =>{
             return(<li className="list">   
            <h6>{li.key}</h6>
            <p>{li.value}</p>
            </li>)
            }):
        <p>{json[i].value}</p>}</div>    
        </div>
    )
}
    return(
        <Card variant="outlined" className="card_det">
             <CardContent>
                  <div className="detail_head">
                     <p><u>{props.product.category.name}</u></p>
                     <h3>{props.product.skus[props.pack].name}</h3>    
                  </div>
                  <div className="detail_price">
                     <h6>MRP:<span><b>Price Rs.{props.product.skus[props.pack].price*(quantity)}</b></span>(inclusive of all taxes)</h6>
                  </div>
                  <div style={{marginTop:"4%"}}>
                   <FormControl style={{minWidth:"120px"}}>
                     <InputLabel id="demo-simple-select-label">Pack Size</InputLabel>
                     <Select
                         labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         value={props.size}
                         onClick={props.handleChange}>
                             {props.product.skus.map((product,i)=>
                                <MenuItem value={product.size} onClick={()=>props.handle(i)} id={product.id}>{product.size} Kg.</MenuItem>
                                 )}
                             
                     </Select>
                   </FormControl>
                  </div>
                  <div className="detail_cart">
                      <input type="text" value={quantity} onChange={props.handler} className="input12"/>                                                                                               
                      <Button variant="contained" className="detail_btn">
                          ADD TO CART
                      </Button>
                      <Button variant="contained" className="detail_save">
                         <BookmarkIcon/><span>Wishlist</span>
                      </Button>
                  </div>
                  <div className="detail_ship">
                      <LocalShippingSharpIcon/><span>Standard: Tomorrow 9:30AM - 5:30PM</span>
                  </div>
                  <div className="product_detail">
                       <h1>PRODUCT DETAILS <span><ChatIcon/></span></h1>
                       <p>{props.product.description}</p>
                  </div>
                  {content}
             </CardContent>
        </Card>
    )
}
export default Detail