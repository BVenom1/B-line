import React, { useState } from 'react'
import "./signup_login.css";

interface SignupProps {
    switchLoginSignup: () => void;
}

const Signup = ({ switchLoginSignup }: SignupProps) => {

    const onSignupSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        // console.log("Signup", [...data.entries()])

        // attempt signing up with the given name, email & password

        // switch to login page upon successful signing up
    }

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

interface LoginProps {
    switchLoginSignup: () => void;
    onSuccessfulLogin: (name: string, email: string) => void;
}

const Login = ({ switchLoginSignup, onSuccessfulLogin }: LoginProps) => {

    const onLoginSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        // try logging in with given email & password

        // call the onSuccessfulLogin function upon successful login
        onSuccessfulLogin("name", data.get("email")?.toString() ?? "")
    }

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

interface EProps {
    onSuccessfulLogin: (name: string, email: string) => void;
}

export const SignupLogin = ({ onSuccessfulLogin }: EProps) => {
    const [hasAccount, setHasAccount] = useState(false)

    const switcher = () => {
        setHasAccount(!hasAccount)
    }

    return (
        <>
            {hasAccount ? <Login switchLoginSignup={switcher} onSuccessfulLogin={onSuccessfulLogin} /> : <Signup switchLoginSignup={switcher} />}
        </>
    )
}