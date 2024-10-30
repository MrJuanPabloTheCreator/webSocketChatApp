import React, { useContext } from 'react'

import SideBar from '../../components/sideBar/sideBar'
import Chat from '../../components/chat/chat'
import Landing from '../landing/landing'
import { UserContext } from '../../context/userContext'

const App = () => {
  const { user } = useContext(UserContext);

  if(!user){
    return <Landing/>
  }
  
  return (
    <div style={{ display: 'flex', minWidth: '100%'}}>
      <SideBar/>
      <Chat/>
    </div>
  )
}

export default App