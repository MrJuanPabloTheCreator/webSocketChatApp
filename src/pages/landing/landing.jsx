import React, { useState, useEffect } from 'react';

import SignIn from '../signIn/signIn';
import Hero from './components/hero/hero.jsx'
import Features from './components/features/features.jsx'
import styles from "./landing.module.css"

const Landing = () => {
  const handlePagePush = (param) => {
    history.pushState({}, "", param);
    setCurrentComponent(determineComponent)
  }

  const determineComponent = () => {
    switch (window.location.pathname) {
      case '/':
        return <Lpage handlePagePush={handlePagePush}/>;
    
      case '/login':
        return <SignIn handlePagePush={handlePagePush}/>;
    
      default:
        return <Lpage handlePagePush={handlePagePush} />;
    }
  }

  const [currentComponent, setCurrentComponent] = useState(determineComponent);

  window.addEventListener('popstate', () => setCurrentComponent(determineComponent))

  useEffect(() => {
    
  }, [currentComponent])
  

  return (
    <div style={{ flex: 1 }}>
      {currentComponent}
    </div>
  );
};

export default Landing;

const Lpage = ({ handlePagePush }) => {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.gradient1}/>
      <div className={styles.gradient2}/>
      <Hero handlePagePush={handlePagePush}/>
      <Features/>
    </div>
  )
}
