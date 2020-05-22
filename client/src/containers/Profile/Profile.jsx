import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'

const Profile = (props) => {
    useEffect(() => {
        fetch('/profile', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken
            }
        }).then(res => {
            res.json().then(res => {
                props.setResponse(res);
            })
        })
    }, [])
    return (
        <div className="container">
            <h1>Profile Page</h1>
            {props.response.message}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ...state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setResponse: (response) => dispatch({ type: actions.SET_RESPONSE, response: response })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);