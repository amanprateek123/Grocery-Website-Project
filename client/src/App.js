import React, { useState, Component } from 'react';

import { Switch, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Home from './containers/Home/Home';
import E404 from './containers/E404/E404'
import Modal from './components/Modal/Modal';
import SignUp from './components/SignUp/SignUp';
import { connect } from 'react-redux';
import * as actions from './store/actions'


class App extends Component {

  componentDidMount() {
    console.log(this.props);

  }

  render() {
    return (
      <React.Fragment>

        <Navbar />

        <Modal visible={this.props.authModalVisible} closeModal={this.props.closeModal}>
          <SignUp />
        </Modal>

        <Switch>
          <Route path='/' exact >
            <Home {...this.props} />
          </Route>
          <Route component={E404} />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    authModalVisible: state.authModalVisible
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch({ type: actions.CLOSE_AUTH_MODAL }),
    openModal: () => dispatch({ type: actions.OPEN_AUTH_MODAL })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
