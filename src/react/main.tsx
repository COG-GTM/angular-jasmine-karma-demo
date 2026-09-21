import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import {
  UsersServiceContext,
  createUsersService,
} from '../app/user/react-hooks/useUsersService';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UsersServiceContext.Provider value={createUsersService()}>
        <App />
      </UsersServiceContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
