import React, { createContext, useState } from 'react';

const TrendingVdoContext = createContext();
const { Provider } = TrendingVdoContext;

const TrendingVdoProvider = ({ children }) => {
  const [trendingVdos, setTrendingVdos] = useState([]);

  const updateTrendingVdos = (newTrendingVdos) => {
    setTrendingVdos(newTrendingVdos);
  };

  return (
    <Provider value={{ trendingVdos, updateTrendingVdos }}>
      {children}
    </Provider>
  );
};

export { TrendingVdoContext, TrendingVdoProvider };
