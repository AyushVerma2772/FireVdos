import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../context/UserDataContext';
import { fetchFromAPI } from '../fetchAPI';
import HomeVdoCardSkeleton from '../skeletonComponents/HomeVdoCardSkeleton';
import HomeVdoCard from '../components/HomeVdoCard';

const LikedVideos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const userData = useContext(UserDataContext);
    const array = Array(12).fill(0);

    // console.log(userData)

    useEffect(() => {
        const getDataFromApi = async () => {
            setLoading(true);

            if (userData && userData.likedVdos && userData.likedVdos.length) {
                const videoIds = userData.likedVdos.join(",");
                const apiData = await fetchFromAPI(`video/info?id=${videoIds}`);

                if (userData.likedVdos.length === 1) {
                    setVideos([apiData]);
                } else {
                    setVideos(apiData.data);
                }
            }

            setLoading(false);
        };


        getDataFromApi();

        // eslint-disable-next-line
    }, [userData]);



    return (
        <div className="w-full max-w-full max-h-full overflow-auto">
            <h2 className="dark:text-white text-black m-4 text-2xl md:text-3xl">Liked videos</h2>
            <div className='dark:bg-black bg-white p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-5'>

                {
                    !loading && (videos) ?
                        videos.map((ele, i) => {

                            const { id, title, channelTitle, publishedTimeText, viewCount, channelThumbnail, thumbnail, richThumbnail, lengthText, channelId } = ele;

                            if (thumbnail) {
                                return (<HomeVdoCard key={i} videoId={id} title={title} channelTitle={channelTitle} time={publishedTimeText} views={viewCount} channelPhoto={channelThumbnail ? channelThumbnail : [{ url: 'https://static.vecteezy.com/system/resources/previews/008/506/404/original/contact-person-red-icon-free-png.png' }]} thumbnail={thumbnail} richThumbnail={richThumbnail} lengthText={lengthText} channelId={channelId} />)
                            }

                            return null;

                        })

                        :

                        array.map((ele, i) => (
                            <HomeVdoCardSkeleton key={i} />
                        ))
                }

            </div>
        </div>
    );
};

export default LikedVideos;
