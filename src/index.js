import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { AuthContextProvider } from './context/AuthContext';
import { CountryCodeProvider } from './context/countryCodeContext';
import SearchDataContextProvider from './context/SearchDataContext';
import { UserDataContextProvider } from './context/UserDataContext';
import { VideoDataProvider } from './context/VideoDataContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <CountryCodeProvider>
      <SearchDataContextProvider>
        <VideoDataProvider>
          <UserDataContextProvider>

            <App />

          </UserDataContextProvider>
        </VideoDataProvider>
      </SearchDataContextProvider>
    </CountryCodeProvider>
  </AuthContextProvider>
);
