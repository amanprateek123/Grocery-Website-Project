import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux'

const Test = (props) => {

    const [res, setRes] = useState();

    useEffect(() => {

        fetch('/get-orders', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }).then(res => res.json())
            .then(res => {
                setRes(res)
            })

    }, [])

    return (
        res ?
            <pre>
                {JSON.stringify(res, undefined, 4)}
            </pre>
            : null
    );
}

const mapStateToProps = state => {
    return {
        ...state
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);