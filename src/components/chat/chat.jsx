import React, { useContext, useEffect, useState } from 'react'

import styles from './chat.module.css'
import { UserContext } from '../../context/userContext';
import { FaLocationArrow } from 'react-icons/fa';
import { TiArrowBack } from 'react-icons/ti';

const Chat = () => {
    const { ws, isSocketActive, token, user, messages, activeChat, openChat } = useContext(UserContext);
    const [messageContent, setMessageContent] = useState('');
    const [previousMessages, setPreviousMessages] = useState([])

    const handleSendMessage = (e) => {
        e.preventDefault();
        if(messageContent !== ''){
            ws.send(JSON.stringify({ action: 'sendmessage', message: messageContent, roomId: activeChat, sender: user.username, timestamp: new Date().toISOString()}))
            setMessageContent('')
        }
    }

    const loadChat = async () => {
        console.log('Active Chat: ', activeChat);
        const getMessagesResponse = await fetch(`https://t6e5rh68zj.execute-api.us-east-1.amazonaws.com/first_deploy?token=${token}&roomId=${activeChat}`, {
            method: 'GET'
        })
        if(getMessagesResponse.ok){
            const messagesResponse = await getMessagesResponse.json()
            console.log('Messages from Dynamo: ', messagesResponse)
            setPreviousMessages(messagesResponse.messages)
        } else {
            setPreviousMessages([])
        }
    };

    useEffect(() => {
        if(activeChat){
            loadChat();
        }
    }, [activeChat]);

    return (
        <div className={`${styles.pageContainer} ${activeChat === null && styles.chatActive}`}>
            <span className={styles.socketConnection} style={isSocketActive ? {backgroundColor: 'green'}:{backgroundColor: 'red'}}/>
            {activeChat ? (
                <div className={styles.chatContainer}>
                    <h1>Chat</h1>
                    <button className={styles.goBackButton} onClick={() => openChat(null)}><TiArrowBack size={28}/></button>
                    <div className={styles.chatContent}>
                        {previousMessages.length > 0 && previousMessages.map((messageData, index) => (
                            <div key={index} className={styles.messageContainer} style={user.username === messageData.sender ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }}>
                                <div className={styles.message} style={user.username === messageData.sender ? { borderBottomRightRadius: '0rem' } : { borderBottomLeftRadius: '0rem' }}>
                                    {user.username !== messageData.sender && <h3>{messageData.sender}</h3>}
                                    <p>{messageData.message}</p>
                                    <span>{new Date(messageData.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                                </div>
                            </div>
                        ))}
                        {messages.length > 0 && messages.map((messageData, index) => (
                            <div key={index} className={styles.messageContainer} style={user.username === messageData.sender ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }}>
                                <div className={styles.message} style={user.username === messageData.sender ? { borderBottomRightRadius: '0rem' } : { borderBottomLeftRadius: '0rem' }}>
                                    {user.username !== messageData.sender && <h3>{messageData.sender}</h3>}
                                    <p>{messageData.message}</p>
                                    <span>{new Date(messageData.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={(e) => handleSendMessage(e)}>
                        <input type='text' placeholder='Send Message' value={messageContent} onChange={(e) => setMessageContent(e.target.value)}/>
                        <button><FaLocationArrow size={20}/></button>
                    </form>
                </div>
            ):(
                <div>
                    No Chat
                </div>
            )}
        </div>
    )
}

export default Chat