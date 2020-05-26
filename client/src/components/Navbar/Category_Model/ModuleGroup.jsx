import React, { Component } from 'react'
import Module from './Module'
import'../Navbar.css';

export default class ModuleGroup extends React.Component {
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
      const bgStyle = {
      }
      if (this.state.isVisible) {
        bgStyle['backgroundColor'] = `#f3f3f3`;
        bgStyle['borderLeft'] = `5px solid ${this.props.color}`;
      }
  
      return (
        <div className='moduleGroup'
             onMouseEnter={this.toggleHidden}
             onMouseLeave={this.toggleHidden}
             style={bgStyle}>          
          <div className={this.state.isVisible ? 'visible':'invisible'}>
          {this.props.module.map(module => <Module
                key={module.key}
                id={module.key}
                lightColor='#f3f3f3'
              />)}
          </div>
        </div>
      )
    }
  }
