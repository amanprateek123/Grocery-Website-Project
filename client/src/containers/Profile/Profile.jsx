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
import ChangePassword from './ChangePassword';
import {
    Grid, Card, CardContent, Paper, Typography, CardMedia, Avatar,
    List, ListItem, ListSubheader, ListItemIcon, ListItemText, Divider,
    TextField, CardActionArea, CardActions, Button, Select, MenuItem, InputLabel, Snackbar
}
    from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import SecurityIcon from '@material-ui/icons/Security';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import mail from '../../assets/illustrations/mail.svg'
import male_avatar from '../../assets/illustrations/male_avatar.svg'
import female_avatar from '../../assets/illustrations/female_avatar.svg'
import { Spinner } from 'react-bootstrap'

import { Transition, config } from 'react-spring/renderprops'

const Profile = (props) => {

    const [user, setUser] = useState({});
    const [addingAddress, setAddingAddress] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [modal, setModal] = useState(false);
    const [addressEditMode, setAddressEditMode] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null)
    const [tab, setTab] = useState('profile');

    const [otp, setOTP] = useState('');
    const [otpModal, setOTPModal] = useState(null);
    const [loading, setLoading] = useState(false)
    const [snackbar, setSnackbar] = useState(false);

    let authToken;

    const initialDetails = {
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
        }
    }

    useEffect(() => {
        setSnackbar(true);
    }, [props.response]);


    const [details, setDetails] = useState(initialDetails)

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

    const handleChangeOTP = (e) => {
        setOTP(e.target.value)
    }

    const openModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
    }

    const fetchProfile = () => {
        fetch('/profile', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken
            }
        }).then(res => {
            res.json().then(res => {
                props.setResponse(res);
                setUser(res.user);
                console.log('PROFILE_USER : ', res.user);

            })
        })
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    const postProfile = (e) => {
        e.preventDefault();
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
                setDetails(initialDetails)
            }
            else {
                props.setResponse(res);
            }

            setUser({ ...user, confirmationPassword: '' })

        }).catch(err => {
            console.log(err);

        })
    }

    const addAddress = (address) => {
        console.log("ADD ADDRESS");

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
                // setUser((user) => ({
                //     ...user,
                //     addresses: [
                //         ...user.addresses,
                //         {
                //             ...address,
                //             id: res.addressId
                //         }
                //     ]
                // }))

                fetchProfile();
            }
            else {
                props.setResponse(res);
            }

        }).catch(err => {
            console.log(err);

        })
    }

    const removeAddress = (id) => {
        console.log("REMOVE ADDRESS");
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
                setUser((user) => ({
                    ...user,
                    addresses: user.addresses.filter(add => add.id != id)
                }))
            }
            else {
                props.setResponse(res);
            }

        }).catch(err => {
            console.log(err);

        })
    }

    const editAddress = (address) => {
        setAddressEditMode(true);
        setEditingAddress(address);
    }
    const editAddressPost = (address) => {
        console.log("EDIT ADDRESS");
        removeAddress(address.id);
        // delete address.id;
        addAddress(address);
        setAddressEditMode(false);
        setEditingAddress(null);

    }

    const changePasswordReq = (passwords) => {
        fetch('/change-password', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(passwords)
        }).then(async res => {
            res = await res.json();
            console.log(res);
            if (res.status == 200) {
                props.setResponse(res);
                setChangingPassword(false);
            }
            else {
                props.setResponse(res);
            }

        }).catch(err => {
            console.log(err);

        })
    }

    const changeEmailReq = (e) => {
        e.preventDefault();
        setLoading(true)
        fetch('/change-email-otp', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ email: user.email })
        }).then(async res => {
            res = await res.json();
            console.log(res);
            if (res.status == 200) {
                props.setResponse(res);
                setOTPModal({ sendTo: changeEmail, contact: "Email" });
                authToken = res.authToken;
            }
            else {
                props.setResponse(res);
            }

            setLoading(false);

        }).catch(err => {
            console.log(err);

        })
    }

    const changeEmail = (e, otp) => {
        e.preventDefault();
        setLoading(true)
        fetch('/change-email', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ otp, authToken })
        }).then(async res => {
            res = await res.json();
            console.log(res);
            if (res.status == 200) {
                props.setResponse(res);
                setOTPModal(false);
                setDetails(initialDetails)
            }
            else {
                props.setResponse(res);
            }

            setLoading(false)

        }).catch(err => {
            console.log(err);

        })
    }

    const changeMobileReq = (e) => {
        e.preventDefault();
        setLoading(true)
        fetch('/change-mobile-otp', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ mobile: user.mobile })
        }).then(async res => {
            res = await res.json();
            console.log(res);
            if (res.status == 200) {
                props.setResponse(res);
                setOTPModal({ sendTo: changeMobile, contact: "Mobile" });
                authToken = res.authToken;
            }
            else {
                props.setResponse(res);
            }
            setLoading(false)

        }).catch(err => {
            console.log(err);

        })
    }

    const changeMobile = (e, otp) => {
        e.preventDefault();
        setLoading(true)
        fetch('/change-mobile', {
            headers: {
                'Authorization': 'Bearer ' + props.idToken,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ otp, authToken })
        }).then(async res => {
            res = await res.json();
            console.log(res);
            if (res.status == 200) {
                props.setResponse(res);
                setOTPModal(false);
                setDetails(initialDetails)
            }
            else {
                props.setResponse(res);
            }

            setLoading(false);

        }).catch(err => {
            console.log(err);

        })
    }

    const profileInformationPage = (
        <Paper>
            {user ?
                <CardContent >
                    <div className="profile-section">
                        <header>
                            <h5 className="heading d-inline-block">Personal Information</h5>
                            <Button color="secondary" onClick={() => toggleEdit('name')}>{details['name'].editing ? "Cancel" : "Edit"}</Button>
                        </header>
                        <section>
                            <TextField className="text-field" label="First Name" id="firstName" value={user.firstName} onChange={(e) => onChangeHandler('firstName', e)} disabled={!details['name'].editing} InputLabelProps={{ shrink: Boolean(user.firstName) }} />
                            <TextField className="text-field" label="Last Name" id="lastName" value={user.lastName} onChange={(e) => onChangeHandler('lastName', e)} disabled={!details['name'].editing} InputLabelProps={{ shrink: Boolean(user.lastName) }} />
                            {details['name'].editing ? <Button color="primary" variant="contained" onClick={openModal}>Save</Button> : null}
                        </section>
                        <section>
                            {/* <InputLabel id="gender" className="external-label">Gender</InputLabel> */}
                            <Select className="text-field" labelId="gender" id="gender" value={user.gender} displayEmpty
                                renderValue={() => user.gender == 'M' ? 'Male' : user.gender == 'F' ? 'Female' : user.gender == 'T' ? 'Other' : 'Gender'}
                                onChange={(e) => onChangeHandler('gender', e)} disabled={!details['name'].editing}>
                                {/* <MenuItem value={undefined}>Not Selected</MenuItem> */}
                                <MenuItem value={'M'}>Male</MenuItem>
                                <MenuItem value={'F'}>Female</MenuItem>
                                <MenuItem value={'T'}>Other</MenuItem>
                            </Select>
                            {/* <InputLabel id="dob" className="external-label">Birthday</InputLabel> */}
                            <TextField className="text-field" type="date" label="Birthday" id="dob" value={user.dob || ''} onChange={(e) => onChangeHandler('dob', e)} disabled={!details['name'].editing} />
                        </section>
                    </div>
                    <div className="profile-section">
                        {/* <header>
                            <h5 className="heading d-inline-block">Email Address</h5>
                            <Button color="secondary" onClick={() => toggleEdit('email')}>{details['email'].editing ? "Cancel" : "Edit"}</Button>
                        </header> */}
                        <section>
                            <TextField className="text-field" label="Email" type="email" required id="email" value={user.email} onChange={(e) => onChangeHandler('email', e)} disabled={!details['email'].editing} InputLabelProps={{ shrink: Boolean(user.email) }} />
                            <Button color="secondary" onClick={() => toggleEdit('email')}>{details['email'].editing ? "Cancel" : "Edit"}</Button>
                            {details['email'].editing ? <Button color="primary" variant="contained" onClick={changeEmailReq}>Save</Button> : null}
                        </section>
                    </div>
                    <div className="profile-section">
                        {/* <header>
                            <h5 className="heading d-inline-block">Mobile Number</h5>
                            <Button color="secondary" onClick={() => toggleEdit('mobile')}>{details['mobile'].editing ? "Cancel" : "Edit"}</Button>
                        </header> */}
                        <section>
                            <TextField className="text-field" label="Mobile Number" id="mobile" value={user.mobile} onChange={(e) => onChangeHandler('mobile', e)} disabled={!details['mobile'].editing} InputLabelProps={{ shrink: Boolean(user.mobile) }} />
                            <Button color="secondary" onClick={() => toggleEdit('mobile')}>{details['mobile'].editing ? "Cancel" : "Edit"}</Button>
                            {details['mobile'].editing ? <Button color="primary" variant="contained" onClick={changeMobileReq}>Save</Button> : null}
                        </section>
                    </div>
                    <div className="profile-section">
                        <header>
                            <h5 className="heading d-inline-block">Account & Security</h5>
                        </header>
                        <section style={{ color: '#4caf50', padding: '0 1em' }}>
                            <Button color="inherit" startIcon={<SecurityIcon />} onClick={() => setChangingPassword(true)}>Change Password</Button>
                        </section>
                    </div>
                </CardContent>
                : null}
            {/* <CardActions className="card-actions">
                <Button color="primary" onClick={() => setChangingPassword(true)}>Change Password</Button>
            </CardActions> */}
            <Modal visible={modal} closeModal={closeModal}>
                {user ?
                    <form onSubmit={postProfile} className="form-modal">
                        <h3>Confirm</h3>
                        <p className='text-center'>You are about to change your profile information. <br />Enter your Password to confirm.</p>

                        <input required placeholder="password" className="field text-center" type="password" name="confirmationPassword" id="confirmationPassword" value={user.confirmationPassword} onChange={(e) => onChangeHandler('confirmationPassword', e)} />
                        {[400, 401].includes(props.response.status) ? <form className="error">{props.response.message}</form> : null}
                        <button className="btn btn-danger">Confirm</button>

                    </form>
                    : null
                }
            </Modal>
            <Modal visible={changingPassword} closeModal={() => setChangingPassword(false)}>
                <ChangePassword changePasswordReq={changePasswordReq} closeModal={() => setAddingAddress(false)} />
            </Modal>
        </Paper >
    );

    const manageAddressesPage = (
        <Paper >
            {user ?
                <CardContent>
                    <header>
                        <h5 className="text-muted">Manage Addresses</h5>
                    </header>
                    <section>
                        <AddressEditor addAddress={addAddress} editMode={addressEditMode} address={editingAddress} />
                        {addressEditMode ? <AddressEditor addAddress={editAddressPost} onCancel={() => setAddressEditMode(false)} editMode={addressEditMode} address={editingAddress} /> : null}
                        <Transition config={config.stiff} trail={100}
                            items={user.addresses}
                            keys={it => it.id}
                            from={{ transform: 'translate(50px,0)', opacity: '0' }}
                            enter={{ transform: 'translate(0,0px)', opacity: '1' }}
                            leave={{ transform: 'translate(50px,0px)', opacity: '0' }}>

                            {(address, xx, i) => styles =>
                                <Address key={address.id}
                                    property={`Address ${i + 1} :`}
                                    value={address}
                                    style={{ ...styles }}
                                    removeAddress={() => removeAddress(address.id)}
                                    editAddress={() => editAddress(address)}
                                />
                            }
                        </Transition>
                    </section>
                </CardContent>
                : null}
        </Paper >
    );

    const OTPModal = (
        otpModal ?
            <Modal visible={otpModal} closeModal={() => setOTPModal(false)}>

                <div className="form-container">
                    <h1 className="center">Change {otpModal.contact}</h1>
                    <form onSubmit={(e) => otpModal.sendTo(e, otp)} className="form">
                        <div className="res-img text-center m-2 w-100">
                            <img src={mail} alt="" width={100} />
                        </div>
                        <label htmlFor="otp">Enter OTP sent to your {otpModal.contact}</label>
                        <input required type="text" name="otp" id="otp" value={otp} onChange={handleChangeOTP} />
                        {[417].includes(props.response.status) ? <div className="error">{props.response.message}</div> : null}
                        <button className="btn btn-full btn-primary m-centered" type="submit" disabled={loading}>{!loading ? "Verify OTP" : <Spinner animation="border" />}</button>
                    </form>
                </div>
            </Modal>
            : null
    )

    return (
        <div className="container-fluid page">
            {OTPModal}
            <div className="container profile-page">
                <div className="row">
                    <div className="col-md-4">
                        <div className="side-nav">
                            <div className="mb-4">
                                <Card>
                                    <CardContent>
                                        <div className="row align-items-center">
                                            <div className="col-4">
                                                <Avatar className="dp" src={user.gender == 'F' ? female_avatar : male_avatar} />
                                            </div>
                                            <div className="col">
                                                <div><i>Hello,</i></div>
                                                {user ? <h5>{user.firstName + ' ' + user.lastName}</h5> : 'User'}
                                            </div>
                                        </div>

                                        <Snackbar open={snackbar} onClose={() => setSnackbar(false)} autoHideDuration={5000} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                                            {props.response.status ? <Alert variant="filled" severity={props.response.status == 200 ? "success" : "error"}>{props.response.message}</Alert> : null}
                                        </Snackbar>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="mb-3">
                                <Card>
                                    <CardContent>

                                        <List component="nav" aria-label="main"
                                            subheader={
                                                <ListSubheader component="div" id="nested-list-subheader">
                                                    Account Settings
                                            </ListSubheader>
                                            }
                                        >
                                            <ListItem button selected={tab == 'profile'} onClick={() => setTab('profile')}>
                                                <ListItemIcon>
                                                    <PersonIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Profile Information" />
                                            </ListItem>
                                            <ListItem button selected={tab == 'address'} onClick={() => setTab('address')}>
                                                <ListItemIcon>
                                                    <HomeIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Manage Addresses" />
                                            </ListItem>
                                        </List>
                                        <Divider />
                                        <List component="nav" aria-label="secondary">
                                            <ListItem button onClick={props.logout}>
                                                <ListItemIcon>
                                                    <PowerSettingsNewIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Logout" />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="content">
                            {tab == 'profile' ?
                                profileInformationPage
                                : tab == 'address' ?
                                    manageAddressesPage
                                    : null}
                        </div>
                    </div>
                </div>
            </div>
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
        setResponse: (response) => dispatch({ type: actions.SET_RESPONSE, response: response }),
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);