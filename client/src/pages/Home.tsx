import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Home: React.FC = () => {
    const currentUser = useSelector((state: any) => state.user.currentUser)
    console.log('currentUser', currentUser)
    const [newUser, setNewUser] = useState<boolean>(currentUser.isNewUser)

    return (
        <div id='home-page'>
            {newUser ? (
                <h3
                    style={{
                        textAlign: 'center',
                        color: 'green',
                    }}>
                    Thank you for registering!
                </h3>
            ) : (
                <h3
                    style={{
                        color: 'green',
                    }}>
                    Welcome back!
                </h3>
            )}
        </div>
    )
}

export default Home
