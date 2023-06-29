import React, { createContext, useEffect, useState } from 'react';

export const CountryCodeContext = createContext();

export const CountryCodeProvider = ({ children }) => {
  const [countryCode, setCountryCode] = useState('');

  useEffect(() => {
    const getLocation = async (latitude, longitude) => {
      try {
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const location = await res.json();
        setCountryCode(location.countryCode);
      } catch (error) {
        console.log(error);
      }
    };

    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getLocation(lat, lon);
    });
  }, []);

  return (
    <CountryCodeContext.Provider value={countryCode}>
      {children}
    </CountryCodeContext.Provider>
  );
};
