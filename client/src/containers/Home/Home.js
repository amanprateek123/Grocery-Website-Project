import React, { Component } from 'react'
import Carousel from '../../components/Carousel/Carousel';
import HomePage from '../../components/HomePage/Home'

export default class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <Carousel />
                <HomePage/>

            </React.Fragment>
        )
    }
}
