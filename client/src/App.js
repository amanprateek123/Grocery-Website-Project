import React, { useState, Component, useEffect } from 'react';

import { Switch, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Home from './containers/Home/Home';
import E404 from './containers/E404/E404'
import Modal from './components/Modal/Modal';
import SignUp from './components/SignUp/SignUp';
import { Profile, Products, Admin, Details, Checkout, Test, Orders } from './containers'
import AdminDashboard from './containers/Admin/Dashboard/Dashboard'
import { connect } from 'react-redux';
import * as actions from './store/actions';
import Footer from './components/Footer/Footer';
import OrderConfirmation from './containers/Checkout/OrderConfirm/OrderConfirmation'
import OrderItems from './containers/Orders/OrderItems/OrderItems';


const App = (props) => {

  useEffect(() => {
    if (props.response.status == 401) {
      console.log("Your Session Expired : Logging Out. -> please Login Again.")
      // props.logout();
    }
  }, [props.response])


  return (
    <React.Fragment>

      <Navbar />
      <div className="app-main-body">

        <Modal visible={props.authModalVisible || props.response.status == 401}
          // closeModal={props.closeModal} 
          closeBtn={props.closeModal}>
          <SignUp />
        </Modal>

        <Switch>
          <Route path='/' exact >
            <Home {...props} />
          </Route>

          <Route path='/products' exact component={Products} />
          <Route path='/test' exact component={Test} />

          {props.userId ?
            <Route path="/profile">
              <Profile />
            </Route>
            : null
          }


          <Route path="/admin" exact>
            <Admin />
          </Route>
          <Route path="/admin/dashboard" exact>
            <AdminDashboard />
          </Route>


          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/product/:id" component={Details} />
          <Route path="/order/:id" component={OrderItems} />
          <Route path="/checkout" component={Checkout} />
          <Route component={E404} />
        </Switch>
      </div>
      <Footer />
    </React.Fragment>
  );

}

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch({ type: actions.CLOSE_AUTH_MODAL }),
    openModal: () => dispatch({ type: actions.OPEN_AUTH_MODAL }),
    logout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
