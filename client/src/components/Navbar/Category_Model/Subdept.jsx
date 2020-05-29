import React, { Component } from 'react'
import './Subdept.scss'
import {NavLink} from 'react-router-dom'
import {categoryGroup,subcat} from './categoryGroup';
import Category from './subCategory'

export default class Subdept extends Component {
    constructor(props) {
        super(props);
        this.toggleHidden = this.toggleHidden.bind(this);
        this.state = {
          isVisible: false
        }
      }
    
      toggleHidden () {
        this.setState({
          isVisible: !this.state.isVisible
        })
      } 
    render() {
        return (
            
            <div className="drop_down">
                <div className="after">
                </div>
                       {this.props.module.map(item=>
                       <div className="drop_content">
                       <div className="subdept">
                           <NavLink to="/" id={item.key} className="nav_drop" onClick={this.toggleHidden}>
                               {item.key}
                           </NavLink>
                           </div>
                           <div className={this.state.isVisible?"visible":"invisible"}>
                           <Category cata={item.modules} name={item.key} key={item.key} id={item.key}/>
                                  </div>
                   
                </div>
                       )}
                  
            </div>
        )
    }
}
