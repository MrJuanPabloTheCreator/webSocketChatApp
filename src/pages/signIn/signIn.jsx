import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/userContext';

const SignIn = ({setShowSignIn}) => {
    const { connect } = useContext(UserContext);
    const [username, setUsername] = useState('')

    const handleConnect = async (e) => {
        e.preventDefault();
        setUsername('');

        await connect(username);
    }

    return (
        <div>
            <button onClick={() => setShowSignIn(false)}>Go back</button>
            <div>
                <form onSubmit={e => handleConnect(e)}>
                    <input placeholder='Enter desired username' value={username} onChange={e => setUsername(e.target.value)}/>
                    <button style={{backgroundColor: 'red'}}>Connect</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn