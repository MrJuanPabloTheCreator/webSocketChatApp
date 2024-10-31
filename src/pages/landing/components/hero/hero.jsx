import React from 'react'

import styles from "./hero.module.css"

const Hero = ({ handlePagePush }) => {
  return (
    <section>
        <nav className={styles.navbar}> 
            <span>JPChat</span>
            <button onClick={() => handlePagePush('/login')}>
                Login
            </button>
        </nav>
        <div className={styles.landingContent}>
            <aside>
                <h1>Stay Connected, Anytime, Anywhere</h1>
                <p>ChatPro allows you to message your contacts in real-time, enjoy secure conversations, and interact with our intelligent chatbot to stay on top of your tasks.</p>
                <button onClick={() => handlePagePush('/login')}>Get Started</button>
            </aside>
            <img src='../../../assets/webSocketAppIphones.png' alt='Demo Image' height={500}/>
        </div>
    </section>
  )
}

export default Hero