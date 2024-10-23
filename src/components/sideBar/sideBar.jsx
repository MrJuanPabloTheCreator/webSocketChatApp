import React, { useContext, useEffect, useState } from 'react';

import styles from './SideBar.module.css';
import { UserContext } from '../../userContext';
import toast from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';

const SideBar = () => {
    const { ws, isSocketActive, user, connect, disconnect, notifications, activeChat, openChat } = useContext(UserContext);

    const [contactUsername, setContactUsername] = useState('')
    const [username, setUsername] = useState('')
    const [userRooms, setUserRooms] = useState([])

    const handleConnect = async (e) => {
        e.preventDefault();
        setUsername('');

        await connect(username);
    }

    const handleAddConntact = async (e) => {
        e.preventDefault();

        const data = { sender: user.username, receiver: contactUsername}
        const createRoomResponse = await fetch('https://81pt8jnlha.execute-api.us-east-1.amazonaws.com/second_deploy', {
            method: 'POST',
            body: JSON.stringify(data)
        })

        if(createRoomResponse.ok){  
            const response = await createRoomResponse.json();
            console.log('New Room Id: ', response.roomId)
            setUserRooms([...userRooms, { roomId: response.roomId, users: [contactUsername] }])
            setContactUsername('');
        } else {
            const response = await createRoomResponse.json();
            console.log('Server Error Message: ', response.errorMessage)
            toast.error(response.errorMessage)
        }
    }

    const handleGetUserRooms = async () => {
        const getUserRoomsResponse = await fetch(`https://81pt8jnlha.execute-api.us-east-1.amazonaws.com/second_deploy?username=${user.username}`, {
            method: 'GET'
        })
        if(getUserRoomsResponse.ok){
            const userRoomsResponse = await getUserRoomsResponse.json();
            if(userRoomsResponse.rooms.length > 0){
                setUserRooms(userRoomsResponse.rooms)
                console.log(userRoomsResponse.rooms)
            }
        } else {
            const userRoomsResponse = await getUserRoomsResponse.json();
            console.log(userRoomsResponse.errorMessage)
        }
    }

    const handleDisconnect = () => {
        disconnect()
        setUserRooms([])
    }

    const handleOpenRoom = (roomId) => {
        openChat(roomId)
    }

    useEffect(() => {
        console.log('Active Chat: ', activeChat)
        if(user){
            handleGetUserRooms();
        }
    }, [user])

    return (
        <div className={`${styles.sideBarContainer} ${activeChat !== null && styles.sidebarActive}`}>
            <span className={styles.socketConnection} style={isSocketActive ? {backgroundColor: 'green'}:{backgroundColor: 'red'}}/>
            {user ? (
                <div>
                    <div className={styles.userHeader}>
                        <h1>{user.username}</h1>
                        <button onClick={handleDisconnect}>Disconnect</button>
                    </div>
                    <div className={styles.addContactsContainer}>
                        <h2>Add Contacts</h2>
                        <form onSubmit={(e) => handleAddConntact(e)}>
                            <input placeholder='Enter conntact username' value={contactUsername} onChange={e => setContactUsername(e.target.value)}/>
                            <button>Add</button>
                        </form>
                    </div>
                </div>
            ):(
                <form onSubmit={(e) => handleConnect(e)} className={styles.connectContainer}>
                    <input placeholder='Enter desired username' value={username} onChange={e => setUsername(e.target.value)}/>
                    <button style={{backgroundColor: 'red'}}>Connect</button>
                </form>
            )}
            {user && userRooms.length > 0 && 
                <div className={styles.userRoomsContainer}>
                    <h2>Rooms</h2>
                    {userRooms.map((room, index) => (
                        <button key={index} onClick={() => handleOpenRoom(room.roomId)} className={`${styles.roomButton} ${activeChat === room.roomId ? styles.activeButton : ''}`}>
                            {room.users.map((roomUser) => (
                                <div key={roomUser}>
                                    <FaUser size={20}/>
                                    <p>{roomUser}</p>
                                </div>
                            ))}
                        </button>
                    ))}
                </div>
            }
        </div>
    )
}

export default SideBar