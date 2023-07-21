import React, { useContext, useEffect, useState } from 'react';
import { fetchFromAPI } from '../fetchAPI';
import HomeVdoCardSkeleton from '../skeletonComponents/HomeVdoCardSkeleton';
import HomeVdoCard from '../components/HomeVdoCard';
import Sort from '../components/Sort';
import { useQuery } from 'react-query';
import { CurrentUserContext } from '../context/CurrentUserContext';

const LikedVideos = () => {
    const [videos, setVideos] = useState();
    const { currentUserData } = useContext(CurrentUserContext);
    const array = Array(12).fill(0);


    const getDataFromApi = async () => {
        const videoIds = currentUserData?.likedVdos?.join(",") || "";

        if (videoIds) {
            const apiData = await fetchFromAPI(`video/info?id=${videoIds}`);

            if (currentUserData?.likedVdos?.length === 1) return [apiData];
            else return apiData.data;
        }

        return null;
    };

    const { isLoading, data, refetch } = useQuery("likedVideos", getDataFromApi);

    useEffect(() => {
        if (currentUserData && !data) refetch();

        // eslint-disable-next-line
    }, [currentUserData])

    useEffect(() => {
        if (data) setVideos(data);
    }, [data]);



    return (
        <div className="w-full max-w-full max-h-full overflow-auto scrollbar-hide md:scrollbar-default">
            <h2 className="dark:text-white text-black m-4 text-2xl md:text-3xl">Liked videos</h2>

            <div className='w-full d-flex gap-3 md:gap-4 dark:text-white text-black my-4 px-4 '>
                <h4 className='text-lg'>Sort</h4>
                <Sort setVideos={setVideos} videos={videos} />

            </div>

            <div className='dark:bg-black bg-white p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-5'>

                {
                    !isLoading && videos ?
                        videos.map((ele, i) => {

                            const { id, title, channelTitle, publishedTimeText, viewCount, channelThumbnail, thumbnail, lengthText, channelId } = ele;

                            if (thumbnail) {
                                return (<HomeVdoCard key={i} videoId={id} title={title} channelTitle={channelTitle} time={publishedTimeText} views={viewCount} channelPhoto={channelThumbnail ? channelThumbnail : [{ url: 'https://static.vecteezy.com/system/resources/previews/008/506/404/original/contact-person-red-icon-free-png.png' }]} thumbnail={thumbnail} lengthText={lengthText} channelId={channelId} />)
                            }

                            return null;

                        })

                        :

                        <>
                            <div className='loader fixed w-full h-0.5 left-0 top-0 bg-red-600 z-[9999]' />
                            {
                                array.map((ele, i) => (
                                    <HomeVdoCardSkeleton key={i} />
                                ))
                            }
                        </>
                }

            </div>
        </div>
    );
};

export default LikedVideos;
