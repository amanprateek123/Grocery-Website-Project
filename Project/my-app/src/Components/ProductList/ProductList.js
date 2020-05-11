import React, { Component } from 'react';
import Products from '../Products/Products';
import {Container} from '@material-ui/core';
import "bootstrap/dist/css/bootstrap.min.css";
import Title from './Title';
import {ProductConsumer} from '../Context';

export default class ProductList extends Component {
    render() {
        return (
            <React.Fragment>
              <div className="py-5">
                 <Container>
                     <Title name="best" title="sellers"/>
                     <div className="row">
                     <ProductConsumer>
                           {(value) =>{
                               return value.products.map(product => {
                                   return <Products key={product.id} product={product}/>
                               })
                           }}
                     </ProductConsumer>
                     </div>
                   
                 </Container>
                  </div>  
            
            </React.Fragment>
            
            
             
        )
    }
}
