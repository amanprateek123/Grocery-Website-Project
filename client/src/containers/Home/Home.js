import React, { Component } from 'react'
import Carousel from '../../components/Carousel/Carousel';
import Modal from '../../components/Modal/Modal';
import SignUp from '../../components/SignUp/SignUp';


export default class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <Carousel />
                <div className="container">
                    <Carousel />
                </div>
            </React.Fragment>
        )
    }
}
