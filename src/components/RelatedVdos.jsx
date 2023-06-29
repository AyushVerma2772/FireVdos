import React from 'react';
import HomeVdoCardSkeleton from '../skeletonComponents/HomeVdoCardSkeleton';
import HomeVdoCard from './HomeVdoCard';


const RelatedVdos = ({ relatedVdos, loading }) => {

    const array = Array(12).fill(0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 justify-items-center gap-5 py-5 items-center w-full lg:w-[30%] 2xl:w-[25%] 2xl:m-auto">
            {
                !loading && relatedVdos ?
                    relatedVdos.map((ele, i) => {
                        const { channelThumbnail, thumbnail, videoId, title, channelTitle, publishedTimeText, viewCount, channelId } = ele;

                        if (channelThumbnail && thumbnail) {
                            return (<HomeVdoCard key={i} videoId={videoId} title={title} channelTitle={channelTitle} time={publishedTimeText} views={viewCount} channelPhoto={channelThumbnail} thumbnail={thumbnail} channelId={channelId} />)
                        }
                        return null;
                    })

                    :

                    array.map((ele, i) => (
                        <HomeVdoCardSkeleton key={i} />
                    ))


            }

        </div>
    )
}

export default RelatedVdos