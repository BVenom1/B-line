import React, { useState } from 'react'
import "./signup_login.css";

interface SignupProps {
    switchLoginSignup: () => void;
}

const Signup = ({ switchLoginSignup }: SignupProps) => {

    const [hint, setHint] = useState("Already have an account?")

    const onSignupSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const res = await fetch("http://localhost:8000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Object.fromEntries(data.entries()))
        });

        const result = await res.json();

        if (result.status == 400) {
            setHint(result.message);
        } else switchLoginSignup();
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
            <div>{hint}</div>
            <button onClick={switchLoginSignup}>Log In</button>
        </div>
    )
}

interface LoginProps {
    switchLoginSignup: () => void;
    onSuccessfulLogin: (name: string, email: string) => void;
}

const Login = ({ switchLoginSignup, onSuccessfulLogin }: LoginProps) => {

    const [hint, setHint] = useState("Don't have an account?")

    const onLoginSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const res = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...Object.fromEntries(data.entries()), name: null })
        });

        const result = await res.json();

        if (result.status == 200) onSuccessfulLogin(result.item.name, result.item.email);
        else setHint(result.message);
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
            <div>{hint}</div>
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