import React, { Component } from 'react'
import Carousel from './Carousel/Carousel';
import ProductList from './ProductList/ProductList';


export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Carousel/>
                <ProductList/>
                <div className="container">
                    <Carousel/>
                </div>
            </React.Fragment>
        )
    }
}
