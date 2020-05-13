import React from 'react';

import {Switch, Route} from 'react-router-dom'
import './App.css';
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home';
import Details from './Components/Details/Details'
import Cart from './Components/Cart/Cart'
import Default from './Components/Default/Default'
import Model from './Components/Model';

function App() {
  return (
    <React.Fragment>
        
           <Navbar/>
           <Switch>
           <Route path='/' component = {Home} exact/>
           <Route path='/details' component = {Details}/>
           <Route path='/cart' component = {Cart}/> 
           <Route component={Default}/>
           </Switch>  
           <Model/>
    </React.Fragment> 
  );
}

export default App;
