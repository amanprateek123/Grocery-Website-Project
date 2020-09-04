import React from 'react';
import { NavLink } from 'react-router-dom';
import './Profile.css';

export default function Button() {
    return (
        <div className="done_btn">
                            <div style={{width:'100%'}}>
                                <div className="done_1">
                                   <span className="done_span">
                                       <span className="btn_span_done">
                                           <NavLink to="/done" style={{color:'#111'}} className="nav_done">
                                               Done
                                           </NavLink>
                                       </span>
                                   </span>
                                </div>
                            </div>
                       </div>
    )
}
