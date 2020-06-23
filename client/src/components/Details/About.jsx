import React from 'react'
import './About.scss'

export default function About(props) {
    let json = JSON.parse(props.json);

    let content = []

    for (let i = 0; i < 3; i++) {
        if (json && json[i]) {
            content.push(
                <div key={json[i].key} className="json1">
                    <h5>{json[i].key}</h5>
                    <div className="lister">
                        {Array.isArray(json[i].value) ?
                            json[i].value.map(li => {
                                return (<li key={li.key} className="list">
                                    <h6>{li.key}</h6>
                                    <p>{li.value}</p>
                                </li>)
                            }) :
                            <p>{json[i].value}</p>}</div>
                    <hr />
                </div>
            )
        }

    }
    return (
        <div className="about_product">
            <h1>{props.head}</h1>
            <hr />
            <div>
                {content}
            </div>
        </div>
    )
}
