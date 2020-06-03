import React, { Component } from 'react';
import { categoryGroup, subcat } from './categoryGroup';
import '../Navbar.css';
import SubCategory from './subCategory';
import Subdept from './Subdept';


export default class CategorySelector extends Component {
  constructor(props) {
    super(props);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.state = {
      isVisible: false
    }
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
    const moduleGroups = categoryGroup;
    const subcata = subcat;
    return (
      <React.Fragment>
        <div className="zi6">
          <div className="_3zd">
            <ul className="_12r">
              {moduleGroups.map(group => {
                return (

                  <li className="Wbt" id={group.id} onMouseEnter={() => this.toggleHidden(group.id)} onMouseLeave={this.resetVisible}>
                    <span className="_1QZ">{group.key}<i className="fa fa-caret-down _34Y" aria-hidden="true" />
                    </span>

                    <div className={this.state.isVisible == group.id ? "visible" : "invisible"}>
                      <Subdept id={group.key} module={group.subcat} item={group.subcat.modules} key={group.key} />
                    </div>
                  </li>
                )
              }

              )}
            </ul>
          </div>

        </div>
      </React.Fragment>
    )
  }
}
