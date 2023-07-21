import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { CountryCodeProvider } from './context/countryCodeContext';
import { VideoDataProvider } from './context/VideoDataContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CurrentUserContextProvider } from './context/CurrentUserContext';

const queryClint = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CurrentUserContextProvider>
    <CountryCodeProvider>
      <VideoDataProvider>
        <QueryClientProvider client={queryClint}>
          <App />
        </QueryClientProvider>
      </VideoDataProvider>
    </CountryCodeProvider>
  </CurrentUserContextProvider>
);
