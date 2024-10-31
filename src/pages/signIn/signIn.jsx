import React, { useContext, useState } from 'react'

import { UserContext } from '../../context/userContext';
import styles from './signIn.module.css'

const SignIn = ({ handlePagePush }) => {
    const { connect } = useContext(UserContext);
    const [username, setUsername] = useState('')

    const handleConnect = async (e) => {
        e.preventDefault();
        setUsername('');

        await connect(username);
    }

    return (
        <div className={styles.signInContainer}>
            {/* <button onClick={() => handlePagePush('/')}>Go back</button> */}
            <form onSubmit={e => handleConnect(e)}>
                <input placeholder='Enter desired username' value={username} onChange={e => setUsername(e.target.value)}/>
                <button>Connect</button>
            </form>
        </div>
    )
}

export default SignIn