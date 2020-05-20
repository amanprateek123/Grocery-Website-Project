import React, { Component } from 'react'
import Carousel from './Carousel/Carousel';
import ProductList from './ProductList/ProductList';
import Modal from './Modal/Modal';
import SignUp from './SignUp/SignUp';


export default class Home extends Component {



    render() {
        return (
            <React.Fragment>
                <Carousel />
                <ProductList />
                <div className="container">
                    <Carousel />
                </div>
                <Modal visible={this.props.modalVisible} closeModal={this.props.closeModal}>
                    <SignUp />
                </Modal>
            </React.Fragment>
        )
    }
}
