import React from 'react'
import HomeVdoCard from './HomeVdoCard';
import HomeVdoCardSkeleton from '../skeletonComponents/HomeVdoCardSkeleton';

const VideoContainer = ({ videos, loading }) => {
    const array = Array(12).fill(0);

    // console.log(videos)
    // console.log(loading)

    return (
        <>

            <div className='dark:bg-black bg-white p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-5'>
                {
                    !loading && videos && videos.length !== 0 ?
                        videos.map((ele, i) => {

                            const { videoId, title, channelTitle, publishedTimeText, viewCount, channelThumbnail, thumbnail, richThumbnail, lengthText, channelId } = ele;

                            if (thumbnail) {
                                return (<HomeVdoCard key={i} videoId={videoId} title={title} channelTitle={channelTitle} time={publishedTimeText} views={viewCount} channelPhoto={channelThumbnail ? channelThumbnail : [{url: 'https://static.vecteezy.com/system/resources/previews/008/506/404/original/contact-person-red-icon-free-png.png'}]} thumbnail={thumbnail} richThumbnail={richThumbnail} lengthText={lengthText} channelId={channelId} />)
                            }
                            
                            return null;
                            
                        })

                        :

                        array.map((ele, i) => (
                            <HomeVdoCardSkeleton key={i} />
                        ))
                }

            </div>
        </>
    )
}

export default VideoContainer



