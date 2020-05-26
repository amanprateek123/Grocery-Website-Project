import React, { Component } from 'react';
import {categoryGroup} from './categoryGroup';
import '../Navbar.css';
import SubCategory from './subCategory';


export default class CategorySelector extends Component {
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
        const moduleGroups = categoryGroup;
        return (
            <React.Fragment>
                 <div className="zi6 container">
                    <div className="_3zd">
                    <ul className="_12r">
                            {moduleGroups.map(group=>                              
                              <li className="Wbt" onMouseEnter={this.toggleHidden} onMouseLeave={this.toggleHidden} id={group.id}>
                              <span className="_1QZ">{group.key}<i className="fa fa-caret-down _34Y" aria-hidden="true"/>
                              </span>                              
                              </li>                              
                            )}
                         </ul>    
                     </div>
                     <div className={this.state.isVisible ? 'visible': 'invisible'}>
                           {moduleGroups.map(group=> <SubCategory id={group.id} subcat={group.subcat}/>)}
                     </div>                                    
                 </div>
                 



          </React.Fragment>
         ) }
}
