import React, { useContext, useEffect, useState } from 'react';
import VideoContainer from '../components/VideoContainer';
import { fetchFromAPI } from '../fetchAPI';
import { CountryCodeContext } from '../context/countryCodeContext';
import { TrendingVdoContext } from '../context/TrendingVdoContext';

const Trending = () => {
  const { trendingVdos, updateTrendingVdos } = useContext(TrendingVdoContext);
  const countryCode = useContext(CountryCodeContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDataFromApi = async () => {
      setLoading(true);
      if (countryCode) {
        const apiData = await fetchFromAPI(`trending?geo=${countryCode}`);
        updateTrendingVdos(apiData.data);
      }
      setLoading(false);
    };

    // Check if the trending videos data is already available and if data is already available then api call karne ki need nhi ha
    if (trendingVdos.length === 0) {
      getDataFromApi();
    }

    // eslint-disable-next-line
  }, [countryCode, trendingVdos]);

  return (
    <>
      <div className="w-full max-w-full max-h-full overflow-auto">
        <h2 className="dark:text-white text-black m-4 text-2xl md:text-3xl">Trending videos</h2>
        <VideoContainer loading={loading} videos={trendingVdos} />
      </div>
    </>
  );
};

export default Trending;
