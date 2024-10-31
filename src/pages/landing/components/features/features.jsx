import React from 'react'

import styles from './features.module.css'
import { IoFlash } from 'react-icons/io5';
import { IoIosContacts } from 'react-icons/io';
import { RiRobot2Fill } from 'react-icons/ri';

const featuresConstants = [
  {
    title: "Instant Messaging",
    icon: <IoFlash size={68}/>,
    description: "Experience seamless, real-time messaging with your contacts. Send and receive messages instantly without delays."
  },
  {
    title: "Add and Manage Contacts",
    icon: <IoIosContacts size={76}/>,
    description: "Easily build your contact list and keep in touch with friends and colleagues. Organize and prioritize your connections."
  },
  {
    title: "AI-Powered Chatbot",
    icon: <RiRobot2Fill size={68}/>,
    description: "Get instant responses, quick information, and task management support with our intelligent chatbot."
  }
];

const Features = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.featuresContainer}>
        {featuresConstants.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <div className={styles.icon}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features;