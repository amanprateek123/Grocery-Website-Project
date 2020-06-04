import React from 'react'
import { NavLink } from 'react-router-dom'
import './Subdept.scss'

export default function subCategory(props) {
  return (
    <div style={{ padding: '12px', minWidth: '240px', height: "100%" }}>
      <span className="cata_drop">
        more in  {props.name}
      </span>
      <div style={{ position: 'absolute', top: '30px' }}>
        {props.cata.map(grp =>
          <NavLink to="/" className="sub_nav">
            {grp.name}
          </NavLink>

        )}</div>
    </div>
  )
}
