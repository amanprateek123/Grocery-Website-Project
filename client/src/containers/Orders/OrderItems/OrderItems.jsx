import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {
    Grid, Card ,CardContent, Slider,Paper, Typography,FormControl, CardMedia, Avatar,
    List, ListItem, ListSubheader, ListItemIcon, ListItemText, Divider,
    TextField, CardActionArea, CardActions, Button, Select, MenuItem, InputLabel, Snackbar
}
    from '@material-ui/core';

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
    useEffect(()=>{
        fetch(`/get-orders?page=1&id=${props.match.params.id}`, {
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
    },[])
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
       const status_1 = (ord)=>{
        let status = progress.find((p)=>{
            return p.label===ord            
        })
        return status
       }
      const single = (ord)=>{
        let pro = []
        let val = status_1(ord[0].status).value
       while(val>=0){
           pro.push(val)
           val=val-33.33
       }
       return pro
      }
       
    return (        
        order?<React.Fragment>
        <Paper className="container-fluid mx-auto row mt-2" style={{boxShadow:'none',backgroundColor:'transparent',}}>
        <Card className="col-3 p-3">
           <Typography variant="h5" component="h1">
               Delivery Address
            </Typography>   
            <Typography variant="p" component="h6">
            <div className="mt-2">
            <b>{order[0].shippingAddress.name}</b>
            </div>
            <div className="mt-2">
            {order[0].shippingAddress.address}<br/>
            {order[0].shippingAddress.state}, {order[0].shippingAddress.country} - {order[0].shippingAddress.zip}
            </div>
            <div className="mt-2 mb-2">
            Phone Number - <br/>
            {order[0].shippingAddress.mobile}
            </div>                 
            </Typography> <Typography variant="h5" component="h6" style={{marginTop:'30px'}}>
               Order Number : <span className="ml-1" style={{color:'blue'}}>{(order[0].id)}</span>
            </Typography> 
            <Typography variant="h5" component="h6" style={{marginTop:'30px'}}>
               Order Date : <span className="ml-1" style={{color:'blue'}}>{new Date(order[0].createdAt).getDate()} {month[new Date(order[0].createdAt).getMonth()]} {new Date(order[0].createdAt).getFullYear()}</span>
            </Typography>                
           </Card>
           <Paper className="col-9 row" style={{boxShadow:'none'}}>
               <Paper className="col-6">
                   <h3 style={{textAlign:'center'}}>Items({order[0].orderItems.length})</h3>
                   {order[0].orderItems.map(itm=>{
                     return(
                       <Card style={{margin:'16px 4px',border:'1px solid #f0f0f0', borderRadius:'5px',boxShadow:'none'}}>
                          <div className="row">
                             <div className="col-3">
                                <img src={itm.sku.images[0].src} style={{width:'100px',height:'100px'}}/>
                             </div>
                             <div className="col-6" style={{textAlign:'center',marginTop:'6%'}}>
                              <Typography variant="p" component="h6">
                               <b> {itm.sku.product.name} - {itm.sku.name} </b>
                                </Typography>
                             </div>
                             <div className="col-3" style={{color:'grey',fontWeight:'bold',marginTop:'6%'}}>
                             <Typography variant="p" component="h6">
                                Price: {itm.sku.price}
                                </Typography>
                             </div>
                          </div>
                       </Card>
                     )
                   })}
               </Paper>
               <Card className="col-4">
               <div style={{width:'300px',margin:'0 auto',marginTop:'10%',color:'green'}}>
               <Slider
                  defaultValue={single(order)}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider-custom"
                  step={33.33}
                  valueLabelDisplay="auto"
                  marks={progress}
                  disabled
                  style={{color:'var(--mainColor)'}}
                  />
               </div>
               </Card>
               <Card className="col-2">
               <Typography variant="p" component="h6" style={{textAlign:'center',marginTop:'100px'}}>
                 <b >
                 Your Item has been 
               <div>
               deliverd on {new Date(order[0].deliverOn).getDate()} {month[new Date(order[0].deliverOn).getMonth()]}  {new Date(order[0].deliverOn).getFullYear()}
               </div>
                 </b>
            </Typography>
               </Card>
           </Paper>
        </Paper>
  </React.Fragment>:null
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