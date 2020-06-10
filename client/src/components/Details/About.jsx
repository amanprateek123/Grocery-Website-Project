import React from 'react'
import'./About.scss'

export default function About(props) {
    return (
        <div className="about_product">
            <h1>{props.head}</h1>
            <hr/>
            <div>
                {props.about.map(item=>{
                  return  (
                        <div className="det_about">
                            <h4>
                              {item.key}
                            </h4>   
                            <p>
                               {item.value}
                            </p>  
                         <hr/>
                        </div>
                         
                    )
                })}
            </div>
        </div>
    )
}
