import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, NavLink
} from 'reactstrap';

const Example = (props) => {
  return (
    <div style={{margin:'15px 0px'}}>
     <NavLink href="/details"> <Card>
        <CardImg top width="100%" src="http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-12_thumb.jpg" alt="Card image cap" style={{width:'100%',height:'200px'}} />
        <CardBody>
        <CardSubtitle style={{color:'#E35F21',fontSize:'12px', fontWeight:'bold'}}>Category</CardSubtitle>
          <CardTitle style={{color:'black',fontSize:"20px",marginTop:'5px'}}>Name</CardTitle>
          <CardText style={{marginTop:"-5px"}}>Price: <b>Rs. 250</b></CardText>
          <CardSubtitle style={{color:'#E35F21',fontSize:'11px', fontWeight:'bold'}}>Standard Delivery: Tomorrow 7:00AM - 9:00AM</CardSubtitle>
          <Button style={{backgroundColor:'#E35F21',color:'black',marginTop:'4px'}}>Add To Cart</Button>
        </CardBody>
      </Card></NavLink>
    </div>
  );
};

export default Example;