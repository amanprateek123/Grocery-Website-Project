import React from 'react'
import './About.scss'

export default function About(props) {
    let json = JSON.parse(props.json)
    return (
        <div className="about_product">
            <h1>{props.head}</h1>
            <hr />
            <div>
                {json.map(item => {
                    return (
                        <div key={item.key} className="det_about">
                            <h4>
                                {item.key}
                            </h4>
                            <p>
                                {item.value}
                            </p>
                            <hr />
                        </div>

                    )
                })}
            </div>
        </div>
    )
}
