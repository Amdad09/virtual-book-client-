import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
// import { router } from './router/router';
import AuthProvider from './contexts/AuthProvider';
import App from './App';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <App/>
            {/* <RouterProvider router={router} /> */}
        </AuthProvider>
    </StrictMode>,
);
