import React, { createContext, useState } from 'react';

export const SearchDataContext = createContext();

const SearchDataContextProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({});

  const updateSearchData = (searchQuery, data) => {

    // Store data of search. so we don't need fetch the data for same query
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      [searchQuery]: data,
    }));
  };

  return (
    <SearchDataContext.Provider value={{ searchData, updateSearchData }}>
      {children}
    </SearchDataContext.Provider>
  );
};

export default SearchDataContextProvider;
