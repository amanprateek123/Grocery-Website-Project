import React, { Component } from 'react'

export default class Module extends React.Component {
    constructor(props) {
      super(props);
      this.toggleHidden = this.toggleHidden.bind(this);
      this.state = {
        isHovered: false
      }
    }
  
    toggleHidden () {
      this.setState({
        isHovered: !this.state.isHovered
      })
    }
    
    
    render() {
      const styles = {
        'backgroundColor': this.props.lightColor,
      }
      if (this.state.isHovered) {
        styles['backgroundColor'] = this.props.color;
        styles['color'] = 'white';
      }
  
      return (
        <div className='singleModule'
             onMouseEnter={this.toggleHidden}
             onMouseLeave={this.toggleHidden}
             style={styles}>
          {this.props.id}
        </div>
      )
    }
  }
