import React from 'react'
import { useState } from 'react';
import { connect } from "react-redux";
import * as actions from '../../store/actions'
import './SignUp.scss'
import { useHistory, Redirect, withRouter } from 'react-router-dom';
import { useEffect } from 'react';

const SignUp = props => {

    const [regMode, setRegMode] = useState(false)
    const [formState, setFormState] = useState(0);
    const [id, setId] = useState(null)
    const [userDetails, setUserDetails] = useState({ name: '', mobile: '', password: '', confirmPassword: '', email: '' });
    const [otp, setOTP] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [resetPassword, setResetPassword] = useState(false);


    const handleChangeEmail = e => {
        setEmail(e.target.value);
    }
    const handleChangePassword = e => {
        setPassword(e.target.value);
    }
    const handleChangeOTP = e => {
        setOTP(e.target.value);
    }

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }

    const sendOTP = (e) => {
        e.preventDefault();
        let details = { id, name: userDetails.name, password: userDetails.password, mobile: userDetails.mobile, email: userDetails.email }
        fetch('/otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        }).then(res => {
            res.json().then(res => {
                console.log(res);
                props.setResponse({ status: res.status, message: res.message })
                setId(res.id);
                if (res.status != 7) setFormState(1)
            })

        }).catch(err => {
            console.log(err);

        })
    }

    const verifyOTP = (e) => {
        e.preventDefault();
        fetch('/verify-otp', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, otp, id })
        }).then(res => {
            res.json().then(res => {
                console.log(res);
                props.setResponse({ status: res.status, message: res.message })
                if (res.status == 200) {
                    setFormState(2)
                    setTimeout(() => {
                        setFormState(0);
                        setRegMode(false);
                    }, 2000)
                }
            })

        }).catch(err => {
            console.log(err);

        })
    }

    const PROTP = (e) => {
        e.preventDefault();
        fetch('/pr-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }).then(res => {
            res.json().then(res => {
                console.log(res);
                props.setResponse({ status: res.status, message: res.message })
                setId(res.id);
                if (res.status == 200) setFormState(1)
            })

        }).catch(err => {
            console.log(err);

        })

    }

    const PRVerifyOTP = (e) => {
        e.preventDefault();
        fetch('/pr-otp-verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, otp })
        }).then(res => {
            res.json().then(res => {
                console.log(res);
                props.setResponse({ status: res.status, message: res.message })
                if (res.status == 200) {
                    setId(res.authToken);
                    setFormState(2);
                }
            })

        }).catch(err => {
            console.log(err);

        })

    }

    const PRReq = (e) => {
        e.preventDefault();
        fetch('/pr-req', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, password: userDetails.password, confirmPassword: userDetails.confirmPassword })
        }).then(res => {
            res.json().then(res => {
                console.log(res);
                props.setResponse({ status: res.status, message: res.message })
                if (res.status == 200) {
                    setId(res.authToken);
                    setFormState(3);
                    setTimeout(() => {
                        setFormState(0);
                        setRegMode(false);
                        setResetPassword(false);
                    }, 2000)
                }
            })

        }).catch(err => {
            console.log(err);

        })
    }

    const login = (e) => {
        e.preventDefault();
        props.login(email, password);
    }


    const changeMode = () => {
        setRegMode(!regMode);
        props.setResponse({ status: 0, message: '' })
    }

    const signUpForm =
        <React.Fragment>
            {[0, 1].includes(formState) ?
                <React.Fragment>
                    <h1>SignUp</h1>
                </React.Fragment>
                : null}
            <p>{props.response.message || "Create an account for LalaDukaan using your Email Account."}</p>
            {formState == 0 ?
                <form onSubmit={sendOTP} className="form">
                    <label htmlFor="name">Full Name</label>
                    <input required type="text" value={userDetails.name} name="name" id="name" placeholder="John Doe" onChange={handleChange} />

                    <label htmlFor="email">Email</label>
                    <input required type="email" name="email" id="email" placeholder="email@example.com" onChange={handleChange} value={userDetails.email} />
                    {[6, 7].includes(props.response.status) ? <div className="error">{props.response.message}</div> : null}

                    <label htmlFor="mobile">Mobile Number</label>
                    <input required type="text" name="mobile" value={userDetails.mobile} id="mobile" placeholder="+91 9874543210" onChange={handleChange} />

                    <label htmlFor="password">Create Password</label>
                    <input required type="password" name="password" value={userDetails.password} id="password" onChange={handleChange} />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input required type="password" name="confirmPassword" value={userDetails.confirmPassword} id="confirmPassword" onChange={handleChange} />

                    <button className="btn btn-full btn-primary m-centered" type="submit">Sign Up Using OTP</button>
                </form>
                : formState == 1 ?
                    <form onSubmit={verifyOTP} className="form">
                        <label htmlFor="otp">Enter OTP sent to your email</label>
                        <input required type="text" name="otp" id="otp" onChange={handleChangeOTP} value={otp} />
                        {[401].includes(props.response.status) ? <div className="error">{props.response.message}</div> : null}
                        <button className="btn btn-full btn-primary m-centered" type="submit">Verify OTP</button>
                    </form>
                    :
                    formState == 2 ?
                        <h3 className="text-success text-center">Your Account is Created.</h3>
                        : null
            }
        </React.Fragment>;

    const logInForm =
        <React.Fragment>
            <h1>Log In</h1>
            <p>Login to Your Account</p>
            {
                <form onSubmit={login} className="form">
                    <label htmlFor="email">Email</label>
                    <input required type="text" name="email" id="email" onChange={handleChangeEmail} value={email} />
                    <label htmlFor="email">Password</label>
                    <input type="password" name="password" id="password" onChange={handleChangePassword} value={password} />
                    {[401].includes(props.response.status) ? <div className="error">{props.response.message}</div> : null}
                    <div className="row px-2">
                        <button className="btn btn-link btn-sm" type="button" onClick={() => setResetPassword(true)}>Forgot Password?</button>
                    </div>
                    <button className="btn btn-full btn-primary m-centered" type="submit">Login</button>
                    <div className="row terms">
                        See our <a href="#" className="link px-1"> Terms </a> and <a href="#" className="link px-1"> Privacy Policy</a>
                    </div>
                </form>
            }
        </React.Fragment>


    const resetPasswordForm =
        <React.Fragment>
            <h1>Reset Password</h1>
            <p>We will send OTP to your email.</p>
            {formState == 0 ?
                <form onSubmit={PROTP} className="form">
                    <label htmlFor="email">Your Existing Account Email</label>
                    <input required type="text" name="email" id="email" onChange={handleChangeEmail} value={email} />
                    {[400].includes(props.response.status) ? <div className="error">{props.response.message}</div> : null}
                    <button className="btn btn-full btn-primary m-centered" type="submit">Send OTP</button>
                </form>
                : formState == 1 ?
                    <form onSubmit={PRVerifyOTP} className="form">
                        <label htmlFor="otp">Enter OTP sent to your email</label>
                        <input required type="text" name="otp" id="otp" onChange={handleChangeOTP} value={otp} />
                        {[400].includes(props.response.status) ? <div className="error">{props.response.message}</div> : null}
                        <button className="btn btn-full btn-primary m-centered" type="submit">Verify OTP</button>
                    </form>
                    : formState == 2 ?
                        <form onSubmit={PRReq} className="form" style={{ marginBottom: '0' }}>

                            <label htmlFor="city">New Password</label>
                            <input required type="password" value={userDetails.password} name="password" id="new" onChange={handleChange} />

                            <label htmlFor="state">Re-Enter New Password</label>
                            <input required type="password" value={userDetails.confirmPassword} name="confirmPassword" id="confirm" onChange={handleChange} />
                            {/* {!match ? <div className="error">Passwords Don't Match</div> : null} */}


                            <button className="btn btn-full btn-primary m-centered" type="submit">Change Password</button>
                        </form>
                        : formState == 3 ?
                            <h3 className="text-success text-center">Password Reset Success.</h3>
                            : null
            }
        </React.Fragment>


    return (
        <div className="form-container">
            {!resetPassword ?
                <React.Fragment>

                    <div className="form-nav" onClick={changeMode}>
                        <div className="tab">{regMode
                            ? "Sign In"
                            : "Register"
                        }</div>
                    </div>
                    {regMode ? signUpForm : logInForm}
                </React.Fragment>
                : resetPasswordForm
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchTooProps = dispatch => {
    return {
        login: (email, password) => dispatch(actions.login(email, password)),
        setResponse: (response) => dispatch({ type: actions.SET_RESPONSE, response })
    }
}

export default connect(mapStateToProps, mapDispatchTooProps)(withRouter(SignUp));