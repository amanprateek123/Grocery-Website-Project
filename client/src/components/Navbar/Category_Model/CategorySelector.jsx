import React, { Component } from 'react';
import {categoryGroup,subcat} from './categoryGroup';
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
    
      toggleHidden () {
        this.setState({
          isVisible: !this.state.isVisible
        })
      } 
    render() {
        const moduleGroups = categoryGroup;
        const subcata = subcat;
        return (
            <React.Fragment>
                 <div className="zi6 container">
                    <div className="_3zd">
                    <ul className="_12r">
                            {moduleGroups.map(group=> 
                              {
                                return(
                                  <div>
                                  <li className="Wbt" id={group.id}  onClick={this.toggleHidden}>
                                  <span className="_1QZ">{group.key}<i className="fa fa-caret-down _34Y" aria-hidden="true"/>
                                  </span>                             
                                  </li>
                                  <div className={this.state.isVisible?"visible":"invisible"}>
                                  <Subdept id={group.key} module={group.subcat} item={group.subcat.modules} key={group.key}/> 
                                  </div>
                                 
                                  </div>
                                )
                              }                             
                                                           
                            )}
                         </ul>    
                     </div>
                                                        
                 </div>
          </React.Fragment>
         ) }
}
