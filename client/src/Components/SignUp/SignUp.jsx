import React from 'react'
import { useState } from 'react';
import './SignUp.scss'
import { useHistory, Redirect } from 'react-router-dom';

const SignUp = props => {

    const [regMode, setRegMode] = useState(true)
    const [email, setEmail] = useState('');
    const [id, setId] = useState(null)
    const [otp, setOTP] = useState('');
    const [formState, setFormState] = useState(0);
    const [response, setResponse] = useState({ status: 0, message: '' })
    const [userDetails, setUserDetails] = useState({ name: '', mobile: '', password: '', confirmPassword: '' });
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useState(false)

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
        fetch('/otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }).then(res => {
            res.json().then(res => {
                console.log(res);
                setResponse({ status: res.status, message: res.message })
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
                setResponse({ status: res.status, message: res.message })
                if (res.status == 200)
                    setFormState(2)
            })

        }).catch(err => {
            console.log(err);

        })
    }

    const sendDetails = (e) => {
        e.preventDefault();
        fetch('/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, name: userDetails.name, password: userDetails.password, mobile: userDetails.mobile })
        }).then(res => {
            res.json().then(res => {
                console.log(res);
                setResponse({ status: res.status, message: res.message })
                if (res.status == 200)
                    setFormState(3)
            })

        }).catch(err => {
            console.log(err);

        })
    }
    const login = (e) => {
        e.preventDefault();
        fetch('/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(res => {
            res.json().then(res => {
                console.log(res);
                setResponse({ status: res.status, message: res.message })
                if (res.status == 200)
                    setAuth(true);
            })

        }).catch(err => {
            console.log(err);
        })
    }


    const changeMode = () => {
        setRegMode(!regMode);
        setResponse({ status: 0, message: '' })
    }

    const signUpForm = <>
        {[0, 1].includes(formState) ?
            <>
                <h1>SignUp</h1>
                <p>We are happy to see you coming.</p>
            </>
            : null}
        <p>{response.message || "Create an account for LalaDukaan using your Email Account."}</p>
        {formState == 0 ?
            <form onSubmit={sendOTP} className="form">
                <label htmlFor="email">Enter your Email Id</label>
                <input required type="email" name="email" id="email" onChange={handleChangeEmail} value={email} />
                {[6, 7].includes(response.status) ? <div className="error">{response.message}</div> : null}
                <button className="btn btn-full btn-primary m-centered" type="submit">Sign Up Using OTP</button>
            </form>
            : formState == 1 ?
                <form onSubmit={verifyOTP} className="form">
                    <label htmlFor="otp">Enter OTP sent to your email</label>
                    <input required type="text" name="otp" id="otp" onChange={handleChangeOTP} value={otp} />
                    {[401].includes(response.status) ? <div className="error">{response.message}</div> : null}
                    <button className="btn btn-full btn-primary m-centered" type="submit">Submit OTP</button>
                </form>
                :
                formState == 2 ?
                    <form onSubmit={sendDetails} className="form">
                        <label htmlFor="name">Full Name</label>
                        <input required type="text" value={userDetails.name} name="name" id="name" onChange={handleChange} />

                        <label htmlFor="mobile">Mobile Number</label>
                        <input required type="text" name="mobile" value={userDetails.mobile} id="mobile" placeholder="+91 9874543210" onChange={handleChange} />

                        <label htmlFor="password">Create Password</label>
                        <input required type="password" name="password" value={userDetails.password} id="password" onChange={handleChange} />

                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input required type="password" name="confirmPassword" value={userDetails.confirmPassword} id="confirmPassword" onChange={handleChange} />

                        <button className="btn btn-full btn-primary m-centered" type="submit">Sign Up Using OTP</button>
                    </form>
                    : formState == 3 ?
                        <h3 className="text-success text-center">Your Account is Created.</h3>
                        : null
        }
    </>;

    const logInForm = <>
        <h1>Log In</h1>
        <p>Login to Your Account</p>
        {
            <form onSubmit={login} className="form">
                <label htmlFor="email">Email</label>
                <input required type="text" name="email" id="email" onChange={handleChangeEmail} value={email} />
                <label htmlFor="email">Password</label>
                <input type="password" name="password" id="password" onChange={handleChangePassword} value={password} />
                {[401].includes(response.status) ? <div className="error">{response.message}</div> : null}
                <button className="btn btn-full btn-primary m-centered" type="submit">Login</button>
            </form>
        }
    </>

    return (
        <div className="form-container">
            {auth ? <Redirect to="/details" /> : null}
            <div className="form-nav" onClick={changeMode}>
                <div className="tab">{regMode
                    ? "Sign In"
                    : "Register"
                }</div>
            </div>
            {regMode ? signUpForm : logInForm}
        </div>
    )
}

export default SignUp;