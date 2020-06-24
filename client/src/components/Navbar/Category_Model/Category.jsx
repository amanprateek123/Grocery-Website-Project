import React from 'react'
import { Link } from 'react-router-dom'
import './Category.scss'

export default function Category(props) {
  return (
    <div style={{ padding: '12px', minWidth: '240px', height: "100%" }}>
      <span className="cata_drop">
        More in  {props.name}
      </span>
      <div style={{ position: 'absolute', top: '30px', height: '100%' }}>
        {props.cata.map(category =>
          <Link to={`/products?category=${category.name}`} key={category.id} className="sub_nav">
            {category.name}
          </Link>

        )}</div>
    </div>
  )
}
