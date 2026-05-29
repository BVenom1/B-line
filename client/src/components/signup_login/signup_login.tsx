import React, { useState } from 'react'
import "./signup_login.css";

interface Props {
    switchLoginSignup: () => void;
}

const onSignupSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log("Signup", [...data.entries()])
}

const onLoginSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log("Login", [...data.entries()])
}

const Signup = ({ switchLoginSignup }: Props) => {
    return (
        <div className='container'>
            <div className="title">Sign Up</div>
            <form onSubmit={onSignupSubmit} className='form'>
                <div className="row">
                    <label htmlFor="username">Name:</label>
                    <input
                        type="text"
                        id='signupUsername'
                        name='name'
                        required
                        placeholder='Please Enter Username'
                        autoComplete='off'
                        className='stretch'
                    />
                </div>
                <div className="row">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id='signupEmail'
                        name='email'
                        required
                        placeholder='Please enter Email'
                        autoComplete='off'
                        className='stretch'
                    />
                </div>
                <div className="row">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id='signupPassword'
                        name='password'
                        required
                        placeholder='Please enter Password'
                        autoComplete='off'
                        className='stretch'
                    />
                </div>
                <button type='submit'>Sign Up</button>
            </form>
            <div>Already have an account?</div>
            <button onClick={switchLoginSignup}>Log In</button>
        </div>
    )
}

const Login = ({ switchLoginSignup }: Props) => {
    return (
        <div className='container'>
            <div className="title">Log In</div>
            <form onSubmit={onLoginSubmit} className='form'>
                <div className="row">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id='signupEmail'
                        name='email'
                        required
                        placeholder='Please enter Email'
                        autoComplete='off'
                        className='stretch'
                    />
                </div>
                <div className="row">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id='signupPassword'
                        name='password'
                        required
                        placeholder='Please enter Password'
                        autoComplete='off'
                        className='stretch'
                    />
                </div>
                <button type='submit'>Log In</button>
            </form>
            <div>Don't have an account?</div>
            <button onClick={switchLoginSignup}>Sign Up</button>
        </div>
    )
}

export const SignupLogin = () => {
    const [hasAccount, setHasAccount] = useState(false)

    const switcher = () => {
        setHasAccount(!hasAccount)
    }

    return (
        <>
            {hasAccount ? <Login switchLoginSignup={switcher} /> : <Signup switchLoginSignup={switcher} />}
        </>
    )
}