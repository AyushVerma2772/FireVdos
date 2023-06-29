import React, { createContext, useContext, useEffect, useState } from 'react';
import { CountryCodeContext } from './countryCodeContext';
import { fetchFromAPI } from '../fetchAPI';

const HomeVdoContext = createContext();
const { Provider } = HomeVdoContext;

const HomeVdoProvider = ({ children }) => {
    const [homeVdos, setHomeVdos] = useState([]);
    const countryCode = useContext(CountryCodeContext);

    useEffect(() => {

        const getDataFromApi = async () => {

            if (countryCode) {
                const apiData = await fetchFromAPI(`home?geo=${countryCode}`)
                setHomeVdos(apiData.data)
            }
        }

        getDataFromApi();

    }, [countryCode])


    return (
        <Provider value={homeVdos}>
            {children}
        </Provider>
    );
};

export { HomeVdoContext, HomeVdoProvider };
