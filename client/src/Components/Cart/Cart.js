import React, { Component } from 'react'
import Title from '../ProductList/Title';
import CartColoumn from './CartColoumn';
import EmptyCart from './EmptyCart';
import {ProductConsumer} from '../Context';
import CartList from './CartList';

export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {(value) =>{
                        const {cart} = value;
                        if(cart.length>0){
                            return (
                                <React.Fragment>
                                <Title name="your" title="cart"/>
                                <CartColoumn/>
                                <CartList value={value}/>
                                </React.Fragment>
                            )
                        }
                        else{
                            return(
                                <EmptyCart/>
                            )
                        }
                    }}
                </ProductConsumer>
               
               
            </section>
        )
    }
}
