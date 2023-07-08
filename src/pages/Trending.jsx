import React, { useContext, useEffect, useState } from 'react';
import VideoContainer from '../components/VideoContainer';
import { VideoDataContext } from '../context/VideoDataContext';

const Trending = () => {
  const { trendingVdos } = useContext(VideoDataContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (trendingVdos) setLoading(false)
    else setLoading(true)

  }, [trendingVdos])


  return (
    <>
      <div className="w-full max-w-full max-h-full overflow-auto scrollbar-hide md:scrollbar-default">
        <h2 className="dark:text-white text-black m-4 text-2xl md:text-3xl">Trending videos</h2>
        <VideoContainer loading={loading} videos={trendingVdos} />
      </div>
    </>
  );
};

export default Trending;
