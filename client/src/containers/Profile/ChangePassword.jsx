import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'

const AddressEditor = (props) => {

    const [passwords, setAddress] = useState({})
    const [match, setMatch] = useState(true);

    const handleChange = (e) => {

        setAddress({
            ...passwords,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (passwords.new != passwords.confirm) {
            setMatch(false);
        }
        else {
            setMatch(true);
        }
    }, [passwords.confirm])

    const changePasswordReq = (e) => {
        e.preventDefault();
        if (passwords.new != passwords.confirm) {
            setMatch(false);
            return;
        }
        props.changePasswordReq(passwords);
    }

    return (
        <div className="form-container" style={{ fontSize: '0.7em' }}>
            <h3>Change Password</h3>

            <form onSubmit={changePasswordReq} className="form" style={{ marginBottom: '0' }}>
                <label htmlFor="address">Old Password</label>
                <input required type="password" value={passwords.old} name="old" id="old" onChange={handleChange} />
                {[403].includes(props.response.status) ? <div className="error">{props.response.message}</div> : null}

                <label htmlFor="city">New Password</label>
                <input required type="password" value={passwords.new} name="new" id="new" onChange={handleChange} />

                <label htmlFor="state">Re-Enter New Password</label>
                <input required type="password" value={passwords.confirm} name="confirm" id="confirm" onChange={handleChange} />
                {!match ? <div className="error">Passwords Don't Match</div> : null}


                <button className="btn btn-full btn-primary m-centered" type="submit">Change Password</button>
            </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressEditor);