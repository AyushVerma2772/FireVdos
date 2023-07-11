import React, { useEffect, useState } from 'react';
import ChannelBanner from '../components/ChannelBanner';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../fetchAPI';
import ChannelVdoCard from '../components/ChannelVdoCard';
import ChannelBannerSkeleton from '../skeletonComponents/ChannelBannerSkeleton';
import ChannelVdoCardSkeleton from '../skeletonComponents/ChannelVdoCardSkeleton';

const Channel = () => {
    const { channelID } = useParams();
    const [videoData, setVideoData] = useState();
    const [channelData, setChannelData] = useState(null);
    const array = Array(12).fill(0);
    const [loading, setLoading] = useState(false);

    const [category, setCategory] = useState("videos")

    // fetching data of a channel
    const getDataFromApi = async (category) => {
        setLoading(true);
        const apiData = await fetchFromAPI(`channel/${category}?id=${channelID}`);
        setChannelData(apiData.meta);
        setVideoData(apiData.data);
        setLoading(false)
    };

    useEffect(() => {
        getDataFromApi(category);
        // eslint-disable-next-line
    }, [channelID, category]);

    return (
        <>
            <div className="w-full max-w-full max-h-full overflow-auto scrollbar-hide md:scrollbar-default">
                {/* Channel banner */}
                {channelData !== null ? (
                    <ChannelBanner channelData={channelData} />
                ) : (
                    <ChannelBannerSkeleton />
                )}




                <div className="w-full bg-white dark:bg-black mt-6 px-5 sticky top-0 z-[5] border-b border-dark-gray">

                    <button className={`text-base mx-2 p-1 pb-2 text-dark-gray dark:text-light-gray border-black dark:border-white ${category === 'videos' && 'border-b-2'}`} onClick={() => setCategory("videos")}>Videos</button>
                    <button className={`text-base mx-2 p-1 pb-2 text-dark-gray dark:text-light-gray border-black dark:border-white ${category === 'playlists' && 'border-b-2'}`} onClick={() => setCategory("playlists")}>Playlists</button>
                    <button className={`text-base mx-2 p-1 pb-2 text-dark-gray dark:text-light-gray border-black dark:border-white ${category === 'liveStreams' && 'border-b-2'}`} onClick={() => setCategory("liveStreams")}>Live Streams</button>
                    <button className={`text-base mx-2 p-1 pb-2 text-dark-gray dark:text-light-gray border-black dark:border-white ${category === 'shorts' && 'border-b-2'}`} onClick={() => setCategory("shorts")}>Shorts</button>
                </div>


                {/* Channel videos */}
                <div className="dark:bg-black bg-white p-1.5 md:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-5 my-4">
                    {videoData && !loading ? (
                        videoData.map((ele, index) => {

                            const { videoId, title, publishedTimeText, viewCount, thumbnail, lengthText } = ele;

                            if (thumbnail) {
                                return (
                                    <ChannelVdoCard key={`${videoId}-${index}`} videoId={videoId} title={title} time={publishedTimeText} views={viewCount} thumbnail={thumbnail}  lengthText={lengthText}
                                    />
                                );
                            }
                            return null;
                        })
                    )

                        :

                        <>
                            <div className='loader fixed w-full h-0.5 left-0 top-0 bg-red-600 z-[9999]' />
                            {
                                array.map((ele, i) => <ChannelVdoCardSkeleton key={i} />)
                            }
                        </>
                    }
                </div>
            </div>
        </>
    );
};

export default Channel;
