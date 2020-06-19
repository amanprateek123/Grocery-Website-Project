import React, { Component } from 'react'
import './Category.scss'
import { Link } from 'react-router-dom'
import Category from './Category'

export default class ParentCategory extends Component {
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
        {this.props.module.map(parentCategory =>
          <div className="drop_content" key={parentCategory.id} onMouseEnter={() => this.toggleHidden(parentCategory.name)} onMouseLeave={this.resetVisible} >
            <div className="subdept">
              <Link to={`/products?parentCategory=${parentCategory.name}`} id={parentCategory.name} className="nav_drop" >
                {parentCategory.name}
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
