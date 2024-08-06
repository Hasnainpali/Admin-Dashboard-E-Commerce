import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SidebarProvider } from './components/contextApi/SideBarToggle';
import { UserProvide } from './components/contextApi/UserAuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <SidebarProvider>
      <UserProvide>
        <App />
      </UserProvide> 
      </SidebarProvider>
    </BrowserRouter>
  </React.StrictMode>
);


