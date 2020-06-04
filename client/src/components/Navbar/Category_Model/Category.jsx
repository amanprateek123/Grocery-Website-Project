import React from 'react'
import { NavLink } from 'react-router-dom'
import './Category.scss'

export default function Category(props) {
  return (
    <div style={{ padding: '12px', minWidth: '240px', height: "100%" }}>
      <span className="cata_drop">
        more in  {props.name}
      </span>
      <div style={{ position: 'absolute', top: '30px' }}>
        {props.cata.map(category =>
          <NavLink to="/" key={category.id} className="sub_nav">
            {category.name}
          </NavLink>

        )}</div>
    </div>
  )
}
