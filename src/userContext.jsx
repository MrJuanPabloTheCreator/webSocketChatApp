import React, { createContext, useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

import createWebSocket from './socket';
import validateToken from './validateToken';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [activeChat, setActiveChat] = useState(null)
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [ws, setWs] = useState(null);
    const [isSocketActive, setIsSocketActive] = useState(false);
    const [messages, setMessages] = useState([]);
    const [notifications, setNotifications] = useState([])

    const activeChatRef = useRef(activeChat);

    const setUpWebSocket = (token) => {
        const onMessageCallback = (data) => {
            if (data.roomId === activeChatRef.current) {
                setMessages((prevMessages) => [...prevMessages, data]);
            } else {
                setNotifications((prevNotifications) => [...prevNotifications, data]);
            }
        }

        const newWebSocket = createWebSocket(token, onMessageCallback);
    
        newWebSocket.onopen = () => {
            setIsSocketActive(true);
            console.log('WebSocket is open now.');
        };
        newWebSocket.onclose = (event) => {
            setIsSocketActive(false);
            localStorage.clear();
            setToken(null);
            setUser(null);
            setActiveChat(null);
            setWs(null);
            console.log('WebSocket is closed now.', event);
        };
        newWebSocket.onerror = (error) => {
            setIsSocketActive(false);
            console.error('WebSocket error:', error);
        };
    
        setWs(newWebSocket);
    };

    const connect = (username) => {
        const data = { username: username };

        const connectPromise = fetch('https://xyyn5q4i1i.execute-api.us-east-1.amazonaws.com/login', {
            method: 'POST',
            body: JSON.stringify(data),
        })
        .then(async (response) => {

            const result = await response.json();
            console.log(result.body);

            if (result.statusCode === 200) {
                const parsedBody = JSON.parse(result.body);

                localStorage.setItem('token', parsedBody.token);
                localStorage.setItem('userData', JSON.stringify(parsedBody.userData));

                setToken(parsedBody.token)
                setUser(parsedBody.userData)

                setUpWebSocket(parsedBody.token);

                return parsedBody.userData.username

            } else {
                throw new Error(JSON.parse(result.body));
            }
        });

        toast.promise(
            connectPromise, 
            {
                loading: 'Connecting...',
                success: username => `Welcome, ${username}!`,
                error: msg => `${msg.message}`,
            }
        );
    };

    const disconnect = () => {
        if (ws) {
            ws.close();
        }
    };

    const initialConnection = async () => {
        const storedToken = localStorage.getItem('token');
        if(!storedToken){
            console.log('No user data')
            return
        }

        const isTokenValid = await validateToken(storedToken)

        if(isTokenValid){
            const userData = JSON.parse(localStorage.getItem('userData'));

            setToken(storedToken)
            setUser(userData)

            setUpWebSocket(storedToken);

        } else {
            console.log('Token invalid, expired or no token found')
        }
    }

    const openChat = (roomId) => {
        setMessages([])
        setActiveChat(roomId);
    }

    useEffect(() => {
        initialConnection()

        return () => {
            if (ws) {
                console.log('Closing socket...')
                ws.close();
            }
        };    
    }, [])

    useEffect(() => {
        activeChatRef.current = activeChat;
    }, [activeChat]); 

    return (
        <UserContext.Provider value={{ ws, user, token, connect, disconnect, messages, notifications, activeChat, openChat, isSocketActive }}>
            {children}
        </UserContext.Provider>
    );
};
