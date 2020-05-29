import React, { Component } from 'react'
import Carousel from '../../components/Carousel/Carousel';
import Modal from '../../components/Modal/Modal';
import SignUp from '../../components/SignUp/SignUp';
import Card from '../../components/Card/Card' 
import {Row,Col} from 'reactstrap'
import { Container } from '@material-ui/core';


export default class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <Carousel />
                <div className="container">
                    <Carousel />
                </div>
                <Container>
                <Row xs="4">
                 <Col><Card/></Col>
                 <Col><Card/></Col>
                 <Col><Card/></Col>
                 <Col><Card/></Col>
                </Row>
                <Row xs="4">
                 <Col><Card/></Col>
                 <Col><Card/></Col>
                 <Col><Card/></Col>
                 <Col><Card/></Col>
                </Row>
                </Container>
        
            </React.Fragment>
        )
    }
}
