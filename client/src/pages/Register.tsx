import React from 'react'
import SignUpForm from '../components/SignUpForm'
import Header from '../components/Header'

const Register: React.FC = () => {
    return (
        <div id='register-page'>
            <div id='register-content'>
                <SignUpForm />
            </div>
        </div>
    )
}

export default Register
