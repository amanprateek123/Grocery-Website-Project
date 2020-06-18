import React, { Component, useEffect } from 'react';
import ParentCategory from './ParentCategory';

import './Category.scss'

export default class Department extends Component {
  constructor(props) {
    super(props);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.state = {
      isVisible: false,
      departments: null
    }
  }

  componentDidMount() {
    fetch('/get-categories').then(res => {
      res.json().then(departments => {
        this.setState({
          ...this.state,
          departments
        });
      })
    })
  }

  toggleHidden(id) {
    this.setState({
      // isVisible: !this.state.isVisible,
      isVisible: id
    })
  }

  resetVisible = () => {
    this.setState({ isVisible: -1 });
  }

  render() {
    return (
      this.state.departments ?
        <React.Fragment>
          <div className="category-bar">
            <ul className="departments">
              {this.state.departments.map(department => {
                return (

                  <li className="dept" key={department.id} onMouseEnter={() => this.toggleHidden(department.id)} onMouseLeave={this.resetVisible}>
                    <span className="name">{department.name}<i className="fa fa-caret-down icon" aria-hidden="true" />
                    </span>

                    <div className={this.state.isVisible == department.id ? "visible" : "invisible"}>
                      <ParentCategory id={department.name} module={department.parentCategories} item={department.parentCategories.modules} key={department.name} />
                    </div>
                  </li>
                )
              }

              )}
            </ul>
          </div>
        </React.Fragment>
        : null
    )
  }
}
