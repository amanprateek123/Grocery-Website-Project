import React, { Component } from 'react'
import './Subdept.scss'
import { NavLink } from 'react-router-dom'
import { categoryGroup } from './categoryGroup';
import Category from './subCategory'

export default class Subdept extends Component {
  constructor(props) {
    super(props);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.state = {
      isVisible: false
    }
  }

  toggleHidden(key) {
    this.setState({
      isVisible: key
    })
  }
  resetVisible = () => {
    this.setState({ isVisible: -1 });
  }
  render() {
    return (

      <div className="drop_down">
        <div className="after">
        </div>
        {this.props.module.map(item =>
          <div className="drop_content" onMouseEnter={() => this.toggleHidden(item.name)} onMouseLeave={this.resetVisible} >
            <div className="subdept">
              <NavLink to="/" id={item.name} className="nav_drop" >
                {item.name}
              </NavLink>
            </div>
            <div className={this.state.isVisible == item.name ? "visible" : "invisible"}>
              <Category cata={item.categories} name={item.name} key={item.name} id={item.name} />
            </div>
          </div>
        )}

      </div>
    )
  }
}
