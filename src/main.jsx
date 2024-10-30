import React from 'react';
import ReactDOM from 'react-dom/client';

import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/userContext';
import App from './pages/app/app';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Toaster/>
        <UserProvider>
            <App/>
        </UserProvider>
    </React.StrictMode>
);