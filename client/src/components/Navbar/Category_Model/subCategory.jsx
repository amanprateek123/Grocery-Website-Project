import React from 'react'
import { NavLink } from 'react-router-dom'
import './Subdept.scss'

export default function subCategory(props) {
  return (
    <div style={{padding:'12px', minWidth:'240px'}}>
                        <span className="cata_drop">
                            more in  {props.name}
                        </span>
                        {props.cata.map(grp=>
                          <NavLink to="/" className="sub_nav">
                                 {grp.key}
                          </NavLink>
                          
                          )}
                   </div>
  )
}
