import React, { useState, Component } from 'react';

import { Switch, Route } from 'react-router-dom'
import './App.css';
import Navbar from './Components/Navbar/Nav'
import Home from './Components/Home';
import Details from './Components/Details/Detail'
import Cart from './Components/Cart/Cart'
import Default from './Components/Default/Default'
import Model from './Components/Model';
import Modal from './Components/Modal/Modal';
import SignUp from './Components/SignUp/SignUp';


class App extends Component {
  state = {
    modalVisible: true,
  }

  closeModal = () => {
    this.setState({ ...this.state, modalVisible: false });
  }

  render() {
    return (
      <React.Fragment>

        <Navbar />
        <Switch>
          <Route path='/' exact >
            <Home {...this.state} closeModal={this.closeModal} />
          </Route>
          <Route path='/details' component={Details} />
          <Route path='/cart' component={Cart} />
          <Route component={Default} />

        </Switch>
        <Model />
      </React.Fragment>
    );
  }
}

export default App;
