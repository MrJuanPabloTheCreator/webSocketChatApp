import React from 'react';
import ReactDOM from 'react-dom/client';

import { Toaster } from 'react-hot-toast';
import { UserProvider } from './userContext';
import Chat from './components/chat/chat';
import SideBar from './components/sideBar/sideBar';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Toaster/>
        <UserProvider>
            <SideBar/>
            <Chat/>
        </UserProvider>
    </React.StrictMode>
);