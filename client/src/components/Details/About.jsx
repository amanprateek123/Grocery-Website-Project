import React from 'react'
import './About.scss'

export default function About(props) {
    let json = JSON.parse(props.json);

    let content = []

    for (let i = 1; i < json.length; i++) {
        if (json && json[i]) {
            content.push(
                <div key={json[i].key + i} className="json1">
                    <h5>{json[i].key}</h5>
                    <div className="lister">
                        {Array.isArray(json[i].value) ?
                            json[i].value.map((li, k) => {
                                return (<li key={li.key + k} className="list">
                                    <h6>{li.key}</h6>
                                    <pre>{li.value}</pre>
                                </li>)
                            }) :
                            <pre>{json[i].value}</pre>}
                    </div>
                    <hr />
                </div>
            )
        }

    }
    return (
        content.length ?
            <div className="about_product">
                <h1>{props.head}</h1>
                <hr />
                <div>
                    {content}
                </div>
            </div>
            : null
    )
}
