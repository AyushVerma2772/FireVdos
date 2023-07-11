import React from 'react'
import HomeVdoCard from './HomeVdoCard';
import HomeVdoCardSkeleton from '../skeletonComponents/HomeVdoCardSkeleton';

const VideoContainer = ({ videos, loading }) => {
    const array = Array(12).fill(0);

    // console.log(videos)
    // console.log(loading)

    return (
        <>

            <div className='dark:bg-black bg-white p-1.5 md:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-5'>
                {
                    !loading && videos && videos.length !== 0 ?
                        videos.map((ele, i) => {

                            const { videoId, title, channelTitle, publishedTimeText, viewCount, channelThumbnail, thumbnail, lengthText, channelId } = ele;

                            if (thumbnail) {
                                return (<HomeVdoCard key={i} videoId={videoId} title={title} channelTitle={channelTitle} time={publishedTimeText} views={viewCount} channelPhoto={channelThumbnail ? channelThumbnail : [{ url: 'https://firebasestorage.googleapis.com/v0/b/infinity-blogs.appspot.com/o/blogsImages%2Fdmd1688800551223?alt=media&token=7072e12c-c8d7-4368-b3ba-a3db4d04c884' }]} thumbnail={thumbnail}  lengthText={lengthText} channelId={channelId} />)
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
        </>
    )
}

export default VideoContainer



