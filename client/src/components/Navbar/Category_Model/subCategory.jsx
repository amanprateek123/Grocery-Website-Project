import React, { Component } from 'react'
import'../Navbar.css';
import ModuleGroup from './ModuleGroup'

export default class subCategory extends Component {
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
            <div className='moduleGroup'
            onMouseEnter={this.toggleHidden}
            onMouseLeave={this.toggleHidden}>
            <div className={this.state.isVisible ? 'visible': 'invisible'}>
                {this.props.subcat.map(group => <ModuleGroup key={group.key} id={group.key}
                 module={group.modules} />)}
          </div></div> 
        )
    }
}
