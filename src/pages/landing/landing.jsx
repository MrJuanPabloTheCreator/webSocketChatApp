import React, { useState } from 'react';
import SignIn from '../signIn/signIn';

const Landing = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div>
      {showSignIn ? (
        <SignIn setShowSignIn={setShowSignIn}/>
      ) : (
        <div>
          <h1>Landing</h1>
          <button onClick={() => setShowSignIn(true)}>Sign In</button>
        </div>
      )}
    </div>
  );
};

export default Landing;
