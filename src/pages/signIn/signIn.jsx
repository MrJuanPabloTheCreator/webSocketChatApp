import React, { useContext, useState } from 'react'

import { UserContext } from '../../context/userContext';
import styles from './signIn.module.css'
import { GiRollingDices } from 'react-icons/gi';

const SignIn = ({ handlePagePush }) => {
    const { connect } = useContext(UserContext);
    const [username, setUsername] = useState('')

    const handleConnect = async (e) => {
        e.preventDefault();
        setUsername('');

        await connect(username);
    }

    const handleGenerate = (e) => {
        e.preventDefault();
        
        const adjectives = ["Cool", "Fast", "Lucky", "Brave", "Silly", "Smart"];
        const nouns = ["Tiger", "Eagle", "Panda", "Lion", "Dragon", "Phoenix"];

        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        const randomNum = Math.floor(Math.random() * 1000);

        const randomUsername = `${randomAdjective}${randomNoun}${randomNum}`;

        setUsername(randomUsername);
    }

    return (
        <div className={styles.signInContainer}>
            <div className={styles.gradient1}/>
            {/* <div className={styles.gradient2}/> */}
            <form>
                <h1>Get Started</h1>
                <div>
                    <input placeholder='Enter desired username' value={username} onChange={e => setUsername(e.target.value)}/>
                    <button onClick={(e) => handleConnect(e)}>Connect</button>
                </div>
                <span>or generate username</span>
                <button 
                    style={{ backgroundColor: 'black', color: 'rgba(138, 43, 226, 0.6)'}}
                    onClick={(e) => handleGenerate(e)}
                >
                    <GiRollingDices color='rgba(138, 43, 226, 0.6)' size={24}/>
                    Generate
                </button>
            </form>
        </div>
    )
}

export default SignIn