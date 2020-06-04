import React, { Component, useEffect } from 'react';
import { departmentGroup } from './categoryGroup';
import '../Navbar.css';
import SubCategory from './subCategory';
import Subdept from './Subdept';


export default class CategorySelector extends Component {
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
          <div className="zi6">
            <div className="_3zd">
              <ul className="_12r">
                {this.state.departments.map(group => {
                  return (

                    <li className="Wbt" key={group.id} onMouseEnter={() => this.toggleHidden(group.id)} onMouseLeave={this.resetVisible}>
                      <span className="_1QZ">{group.name}<i className="fa fa-caret-down _34Y" aria-hidden="true" />
                      </span>

                      <div className={this.state.isVisible == group.id ? "visible" : "invisible"}>
                        <Subdept id={group.name} module={group.parentCategories} item={group.parentCategories.modules} key={group.name} />
                      </div>
                    </li>
                  )
                }

                )}
              </ul>
            </div>

          </div>
        </React.Fragment>
        : null
    )
  }
}
