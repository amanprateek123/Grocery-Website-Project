import React, { Component } from 'react'
import './Category.scss'
import { Link } from 'react-router-dom'
import Category from './Category'

export default class ParentCategory extends Component {
  constructor(props) {
    super(props);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.state = {
      isVisible: false,
      identity:null
    }
  }

  toggleHidden(key,i) {
    this.setState({
      isVisible: key,
      identity:i
    })
  }
  resetVisible = () => {
    this.setState({ isVisible: -1,identity:null });
  }
  render() {
    return (

      <div className="drop_down">
        <div className="after">
        </div>
        {this.props.module.map(parentCategory =>
          <div className="drop_content" key={parentCategory.id} onMouseEnter={() => this.toggleHidden(parentCategory.name,parentCategory.id)} onMouseLeave={this.resetVisible} >
            <div className="subdept">
              <Link to={`/products?parentCategory=${parentCategory.name}`} id={parentCategory.name} className={parentCategory.id===this.state.identity?"nava1":"nav_drop"} >
                {parentCategory.name}{parentCategory.id===this.state.identity?<i className="fa fa-caret-down icon" aria-hidden="true" style={{transform:'rotate(-90deg)'}} />:null}
              </Link>
            </div>
            <div className={this.state.isVisible == parentCategory.name ? "visible" : "invisible"}>
              <Category cata={parentCategory.categories} name={parentCategory.name} key={parentCategory.name} id={parentCategory.name} />
            </div>
          </div>
        )}

      </div>
    )
  }
}
