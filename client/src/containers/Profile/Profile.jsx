import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import ProfileList from './ProfileList'
import { useState } from 'react';
import Modal from "../../components/Modal/Modal";
import Address from './Address';
import AddressEditor from './AddressEditor';
import { Toast } from "react-bootstrap";

const Profile = (props) => {

    const [user, setUser] = useState({});
    const [addingAddress, setAddingAddress] = useState(false);
    const [modal, setModal] = useState(false);
    const [details, setDetails] = useState({
        name: {
            editing: false,
            type: 'text'
        },
        email: {
            editing: false,
            type: 'text'
        },
        mobile: {
            editing: false,
            type: 'text'
        },
        password: {
            editing: false,
            type: 'password'
        },
        address: {
            editing: false,
            type: 'textarea'
        }
    })

    const toggleEdit = (field) => {
        setDetails({
            ...details,
            [field]: {
                ...details[field],
                editing: !details[field].editing
            }
        })
    }

    const onChangeHandler = (field, e) => {
        setUser({
            ...user,
            [field]: e.target.value
        })
    }

    const openModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
    }

    const addAddress = (address) => {
        fetch('/add-address', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(address)
        }).then(async res => {
            res = await res.json();
            console.log(res);
            if (res.status == 200) {
                setAddingAddress(false);
                props.setResponse(res);
                setUser({
                    ...user,
                    addresses: [
                        ...user.addresses,
                        address
                    ]
                })
            }
            else {
                props.setResponse(res);
            }

        }).catch(err => {
            console.log(err);

        })
    }

    useEffect(() => {
        fetch('/profile', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken
            }
        }).then(res => {
            res.json().then(res => {
                props.setResponse(res);
                setUser(res.user);
            })
        })
    }, [])

    const postProfile = () => {
        fetch('/profile', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(user)
        }).then(async res => {
            res = await res.json();
            console.log(res);
            if (res.status == 200) {
                closeModal();
                props.setResponse(res);
            }
            else {
                props.setResponse(res);
            }

        }).catch(err => {
            console.log(err);

        })
    }

    const removeAddress = (id) => {
        fetch('/remove-address', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({ id })
        }).then(async res => {
            res = await res.json();
            console.log(res);
            if (res.status == 200) {
                props.setResponse(res);
                setUser({
                    ...user,
                    addresses: user.addresses.filter(add => add.id != id)
                })
            }
            else {
                props.setResponse(res);
            }

        }).catch(err => {
            console.log(err);

        })
    }


    return (
        <div className="container">
            <h1>Profile</h1>
            <div className="response">
                <Toast>

                    <Toast.Body>{props.response.message}</Toast.Body>
                </Toast>
            </div>
            {user ?
                <div className="login_security">
                    <h1 className="login_header">
                        Login & Security
                    </h1>

                    <Modal visible={addingAddress} closeModal={() => setAddingAddress(false)}>
                        <AddressEditor addAddress={addAddress} closeModal={() => setAddingAddress(false)} />
                    </Modal>

                    <div className="a_sec">
                        <div className="security_box">
                            <div className="inner_box">
                                <ul className="unorder_box">
                                    <ProfileList property="Name:" value={user.name} editable type={details.name.type} editing={details.name.editing} onChange={(e) => onChangeHandler('name', e)} toggleEdit={() => toggleEdit('name')} />
                                    <ProfileList property="Email:" value={user.email} editable={false} type={details.email.type} editing={details.email.editing} onChange={(e) => onChangeHandler('email', e)} toggleEdit={() => toggleEdit('email')} />
                                    <ProfileList property="Mobile Number:" value={user.mobile} editable type={details.mobile.type} editing={details.mobile.editing} onChange={(e) => onChangeHandler('mobile', e)} toggleEdit={() => toggleEdit('mobile')} />
                                    <ProfileList property="Password:" value={user.password ?? '********'} editable={false} type={details.password.type} editing={details.password.editing} onChange={(e) => onChangeHandler('password', e)} toggleEdit={() => toggleEdit('password')} />
                                    <div className="sec">
                                        <h6>Addresses</h6>
                                        <div className="actions">
                                            <button className="btn btn-link btn-sm" onClick={() => setAddingAddress(true)}>+Add</button>
                                        </div>
                                    </div>
                                    {user.addresses?.map((address, i) =>
                                        <Address key={address.id}
                                            property={`Address ${i + 1} :`}
                                            value={address}
                                            removeAddress={() => removeAddress(address.id)}
                                        />
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="actions my-3">
                            <button className="btn btn-danger" onClick={openModal}>Save</button>
                        </div>
                    </div>
                </div>
                :
                <div className="danger">Please Login</div>
            }
            <Modal visible={modal} closeModal={closeModal}>
                {user ?
                    <div className="form">
                        <h3>Confirm</h3>
                        <p className='text-center'>You are about to change your profile information. <br />Enter your Password to confirm.</p>
                        <input required placeholder="password" className="field text-center" type="password" name="confirmationPassword" id="confirmationPassword" value={user.confirmationPassword} onChange={(e) => onChangeHandler('confirmationPassword', e)} />
                        {[400, 401].includes(props.response.status) ? <div className="error">{props.response.message}</div> : null}
                        <button className="btn btn-danger" onClick={postProfile}>Confirm</button>
                    </div>
                    : null
                }
            </Modal>

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