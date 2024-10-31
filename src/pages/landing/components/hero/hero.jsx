import React from 'react'

import styles from "./hero.module.css"

const Hero = ({ handlePagePush }) => {
  return (
    <section className={styles.heroSection}>
        <div className={styles.gradient1}/>
        <div className={styles.gradient2}/>
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
            <img src='/webSocketAppIphones.png' alt='Demo Image' height={500}/>
        </div>
    </section>
  )
}

export default Hero