import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import AddIcon from '@material-ui/icons/Add';

import { TextField, Button, Paper, Checkbox, FormControlLabel } from '@material-ui/core'

const AddressEditor = (props) => {

    const [address, setAddress] = useState(props.address || {})
    const [editing, setEditing] = useState(props.editMode || false)

    const handleChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
        if (e.target.hasOwnProperty('checked')) {
            setAddress({
                ...address,
                [e.target.name]: e.target.checked
            })
        }
    }

    const addAddress = (e) => {
        e.preventDefault();
        props.addAddress(address);
        setEditing(false);
        setAddress({})
    }


    return (
        <Paper variant="outlined" className="add-address" style={{border:'none',margin:'0'}}>
            {!editing ?
                      <div style={{marginTop:'8px',backgroundColor:'white'}}>
                          <div className="adder" onClick={() => setEditing(true)}>
                              <AddIcon style={{margin: '0 22px 0 26px',verticalAlign: 'middle'}}/>
                              Add a new address
                          </div>
                      </div>
                :
                <div className="address-form" style={{ fontSize: '0.7em' }}>
                    <h5 style={{ color: '#3f51b5', padding: '1em' }}>ADD A NEW ADDRESS</h5>
                    <form onSubmit={addAddress} className="form" style={{ marginBottom: '0' }}>
                        <div className="form-group">
                            <TextField className="text-field address-field" variant="outlined" label="Name" id="name" name="name" value={address.name} onChange={handleChange} required />
                            <TextField className="text-field address-field" variant="outlined" label="Mobile" id="mobile" name="mobile" value={address.mobile} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <TextField className="text-field address-field" variant="outlined" label="City" id="city" name="city" value={address.city} onChange={handleChange} required />
                            <TextField className="text-field address-field" variant="outlined" label="Zip" id="zip" name="zip" value={address.zip} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <TextField className="text-field address-field" multiline style={{ width: '100%' }} variant="outlined" label="Address" id="address" name="address" value={address.address} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <TextField className="text-field address-field" variant="outlined" label="State" id="state" name="state" value={address.state} onChange={handleChange} required />
                            <TextField className="text-field address-field" variant="outlined" label="Country" id="country" name="country" value={address.country} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <TextField className="text-field address-field" variant="outlined" label="Email" id="email" name="email" value={address.email} onChange={handleChange} />
                        </div>
                        <div className="form-group ml-3">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={address.isPrimary}
                                        onChange={handleChange}
                                        name="isPrimary"
                                        value={address.isPrimary}
                                        color="primary"
                                    />
                                }
                                label="Primary Address"
                            />
                        </div>
                        <Button color="primary" variant="contained" className="mx-3" type="submit">Add Address</Button>
                        <Button color="secondary" type="button" onClick={props.onCancel ? props.onCancel : () => setEditing(false)}>Cancel</Button>
                    </form>
                </div>
            }
        </Paper>
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