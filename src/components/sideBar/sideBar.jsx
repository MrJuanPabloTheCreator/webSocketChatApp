import React, { useContext, useEffect, useState } from 'react';

import styles from './SideBar.module.css';
import { UserContext } from '../../context/userContext';
import toast from 'react-hot-toast';
import { FaRobot, FaUser } from 'react-icons/fa';

const SideBar = () => {
    const { ws, isSocketActive, user, connect, disconnect, notifications, activeChat, openChat } = useContext(UserContext);

    const [contactUsername, setContactUsername] = useState('')
    const [userRooms, setUserRooms] = useState([])

    const handleAddConntact = async (e) => {
        e.preventDefault();

        const data = { sender: user.username, receiver: contactUsername}

        const createRoomResponse = fetch('https://81pt8jnlha.execute-api.us-east-1.amazonaws.com/second_deploy', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(async (serverResponse) => {
            if(serverResponse.ok){  
                const response = await serverResponse.json();
                console.log('New Room Id: ', response.roomId)
                setUserRooms([...userRooms, { roomId: response.roomId, users: [contactUsername] }])
                setContactUsername('');
            } else {
                // const response = await createRoomResponse.json();
                // console.log('Server Error Message: ', response.errorMessage)
                throw new Error('User not found:(');
            }
        })

        toast.promise(
            createRoomResponse, 
            {
                loading: 'Searching User...',
                success: username => `User ${contactUsername} added succesfully!`,
                error: msg => `${msg.message}`,
            }
        );
    }

    const handleGetUserRooms = async () => {
        const getUserRoomsResponse = await fetch(`https://81pt8jnlha.execute-api.us-east-1.amazonaws.com/second_deploy?username=${user.username}`, {
            method: 'GET'
        })
        if(getUserRoomsResponse.ok){
            const userRoomsResponse = await getUserRoomsResponse.json();

            const aiRoom = userRoomsResponse.rooms.find((room) => room.roomId.startsWith('AI_'));
            const otherRooms = userRoomsResponse.rooms.filter((room) => !room.roomId.startsWith('AI_'));

            setUserRooms(aiRoom ? [aiRoom, ...otherRooms] : otherRooms);
        } else {
            const userRoomsResponse = await getUserRoomsResponse.json();
            console.log(userRoomsResponse.errorMessage)
        }
    }

    const handleDisconnect = () => {
        disconnect()
        setUserRooms([])
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
            <div className={styles.userRoomsContainer}>
                <h2>Contacts</h2>
                {userRooms[0] && userRooms[0].roomId &&
                    <button className={`${styles.AIbutton} ${activeChat === userRooms[0].roomId ? styles.activeAIButton : ''}`} onClick={() => openChat(activeChat === userRooms[0].roomId ? null : userRooms[0].roomId)}>
                        <img src='../../../assets/JP.jpg' alt='JP' height={35} width={35} style={{ borderRadius: 17.5 }}/>
                        <p>Juan Pablo AI</p>
                    </button>
                }
                {user && userRooms.length > 0 && 
                    userRooms.slice(1).map((room, index) => (
                        <button
                            key={index}
                            onClick={() => openChat(room.roomId)}
                            className={`${styles.roomButton} ${activeChat === room.roomId ? styles.activeButton : ''}`}
                        >
                            {room.users.map((roomUser) => (
                            <div key={roomUser}>
                                <FaUser size={20} />
                                <p>{roomUser}</p>
                            </div>
                            ))}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default SideBar