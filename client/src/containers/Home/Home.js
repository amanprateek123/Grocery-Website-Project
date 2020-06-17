import React, { Component } from 'react'
import Carousel from '../../components/Carousel/Carousel';
import Modal from '../../components/Modal/Modal';
import SignUp from '../../components/SignUp/SignUp';
import Card from '../../components/Card/Card'
import { Row, Col } from 'reactstrap'
import { Container } from '@material-ui/core';


export default class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <Carousel />
                <div className="container">
                </div>

            </React.Fragment>
        )
    }
}
