import React, { useEffect, useState } from 'react';
import ChannelBanner from '../components/ChannelBanner';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../fetchAPI';
import ChannelVdoCard from '../components/ChannelVdoCard';
import HomeVdoCardSkeleton from '../skeletonComponents/HomeVdoCardSkeleton';
import ChannelBannerSkeleton from '../skeletonComponents/ChannelBannerSkeleton';

const Channel = () => {
    const { channelID } = useParams();
    const [videoData, setVideoData] = useState();
    const [channelData, setChannelData] = useState(null);
    const array = Array(12).fill(0);

    // fetching data of a channel
    const getDataFromApi = async () => {
        const apiData = await fetchFromAPI(`channel/videos?id=${channelID}`);
        setChannelData(apiData.meta);
        setVideoData(apiData.data);
    };

    useEffect(() => {
        getDataFromApi();
        // eslint-disable-next-line
    }, [channelID]);

    return (
        <>
            <div className="w-full max-w-full max-h-full overflow-auto">
                {/* Channel banner */}
                {channelData !== null ? (
                    <ChannelBanner channelData={channelData} />
                ) : (
                    <ChannelBannerSkeleton />
                )}


                {/* Channel videos */}
                <div className="dark:bg-black bg-white p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-5 my-6">
                    {videoData ? (
                        videoData.map(ele => {

                            const { videoId, title, publishedTimeText, viewCount, thumbnail, richThumbnail, lengthText } = ele;

                            if (thumbnail) {
                                return (
                                    <ChannelVdoCard key={videoId} videoId={videoId} title={title} time={publishedTimeText} views={viewCount} thumbnail={thumbnail} richThumbnail={richThumbnail} lengthText={lengthText}
                                    />
                                );
                            }
                            return null;
                        })
                    ) : (
                        array.map((ele, i) => <HomeVdoCardSkeleton key={i} />)
                    )}
                </div>
            </div>
        </>
    );
};

export default Channel;
