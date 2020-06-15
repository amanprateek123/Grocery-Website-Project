import React from 'react'
import'./About.scss'

export default function About(props) {
  const json = props.json
 let content = []

  for(let i=3;i<6;i++){
    content.push(
        <div className="json1">
            <h5>{json[i].key}</h5>            
                <div className="lister">
            {Array.isArray(json[i].value)?
            json[i].value.map(li =>{
             return(<li className="list">   
            <h6>{li.key}</h6>
            <p>{li.value}</p>
            </li>)
            }):
        <p>{json[i].value}</p>}</div>  
        <hr/>  
        </div>
    )
}
    return (
        <div className="about_product">
            <h1>{props.head}</h1>
            <hr/>
            <div>
                {content}
            </div>
        </div>
    )
}
