import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'

const AddressEditor = (props) => {

    const [address, setAddress] = useState({})

    const handleChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    const addAddress = (e) => {
        e.preventDefault();
        props.addAddress(address);
    }

    return (
        <div className="form-container" style={{ fontSize: '0.7em' }}>
            <h3>Add <small className="text-muted">a shipping address</small></h3>
            <p>Fill in the details below.</p>

            <form onSubmit={addAddress} className="form" style={{ marginBottom: '0' }}>
                <label htmlFor="address">Address Line 1</label>
                <input required type="text" value={address.address} name="address" id="address" onChange={handleChange} />

                <label htmlFor="city">City</label>
                <input required type="text" value={address.city} name="city" id="city" onChange={handleChange} />

                <label htmlFor="state">State</label>
                <input required type="text" value={address.state} name="state" id="state" onChange={handleChange} />

                <label htmlFor="country">Country</label>
                <input required type="text" value={address.country} name="country" id="country" onChange={handleChange} />

                <label htmlFor="zip">Zip Code</label>
                <input required type="text" value={address.zip} name="zip" id="zip" onChange={handleChange} />

                <label htmlFor="email">Email</label>
                <input required type="text" value={address.email} name="email" id="email" onChange={handleChange} />

                <label htmlFor="mobile">Mobile</label>
                <input required type="text" value={address.mobile} name="mobile" id="mobile" onChange={handleChange} />

                <button className="btn btn-full btn-primary m-centered" type="submit">Add Address</button>
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