import React, { useState } from 'react';

import SignIn from '../signIn/signIn';
import styles from "./landing.module.css"

const Landing = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div style={{ flex: 1 }}>
      {showSignIn ? (
        <SignIn setShowSignIn={setShowSignIn}/>
      ) : (
        <div className={styles.landingContainer}>
          <section>
            <nav className={styles.navbar}> 
              <span>JPChat</span>
              <button>
                Login
              </button>
            </nav>
            <div className={styles.landingContent}>
              <div>
                <h1>Stay Connected, Anytime, Anywhere</h1>
                <p>ChatPro allows you to message your contacts in real-time, enjoy secure conversations, and interact with our intelligent chatbot to stay on top of your tasks.</p>
                <button onClick={() => setShowSignIn(true)}>Get Started</button>
              </div>
              <img src='../../../assets/webSocketAppIphones.png' alt='Demo Image' height={500}/>
            </div>
          </section>
          <section>
            Details
          </section>
        </div>
      )}
    </div>
  );
};

export default Landing;
