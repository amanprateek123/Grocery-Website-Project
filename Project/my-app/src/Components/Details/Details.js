import React, { Component } from 'react'
import {ProductConsumer} from '../Context';
import {NavLink} from 'react-router-dom';
import {Button} from '../Button';

export default class Details extends Component {
    render() {
        return (
           <ProductConsumer>
               {(value) =>{
                   const {id,company,img,info,price,title,inCart} = value.detailProduct;
                   return(
                       <div className="container py-5">
                           <div className="row">
                               <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                 <h1>{title}</h1>
                               </div>
                           </div>
                         <div className="row">
                             <div className="col-10 mx-auto col-md-6 my-3">
                                 <img src={img} className="img-fluid" alt="pic"/>
                             </div>
                             <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                 <h2>{title}</h2>
                                 <h4 className=" text-blue ">
                                     <b>price: <span>&</span>
                                     {price}
                                     </b>
                                 </h4>
                                 <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                     some info about product
                                 </p>
                                 <p className="text-muted lead">
                                     {info}                                     
                                 </p>
                                 <div>
                                     <NavLink to="/">
                                        <Button>
                                            back to products 
                                        </Button>
                                     </NavLink>
                                     <Button cart disabled={inCart?true:false} onClick={() => value.addToCart(id)}>
                                            {inCart?"in Cart":"add to cart"}
                                    </Button>
                                 </div>

                             </div>
                         </div>
                       </div>
                   )
               }}
           </ProductConsumer>
        )
    }
}
