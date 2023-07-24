import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { CountryCodeProvider } from './context/countryCodeContext';
import { VideoDataProvider } from './context/VideoDataContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CurrentUserContextProvider } from './context/CurrentUserContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();