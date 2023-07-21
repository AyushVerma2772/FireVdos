import React, { useContext, useEffect, useState } from 'react'
import { fetchFromAPI } from '../fetchAPI';
import HomeVdoCard from '../components/HomeVdoCard';
import HomeVdoCardSkeleton from '../skeletonComponents/HomeVdoCardSkeleton';
import { MdAutoDelete, MdDelete } from "react-icons/md";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import Sort from '../components/Sort';
import { useQuery } from 'react-query';
import { CurrentUserContext } from '../context/CurrentUserContext';

const History = () => {

    const { currentUser, currentUserData } = useContext(CurrentUserContext);
    const [videos, setVideos] = useState();
    const array = Array(12).fill(0);


    const getDataFromApi = async () => {
        const videoIds = currentUserData?.history?.join(",") || "";

        if (videoIds) {
            const apiData = await fetchFromAPI(`video/info?id=${videoIds}`);

            if (currentUserData?.history?.length === 1) return [apiData];
            else return apiData.data;
        }

        return null;
    };

    const { isLoading, data, refetch } = useQuery("history", getDataFromApi);

    useEffect(() => {
        if (currentUserData && !data) refetch();

        // eslint-disable-next-line
    }, [currentUserData])

    useEffect(() => {
        if (data) setVideos(data);
    }, [data])


    const clearHistory = async () => {

        if (currentUser && currentUserData) {
            const docRef = doc(db, "users", currentUser.uid);

            await updateDoc(docRef, {
                history: []
            })

            setVideos([])
        }

    }


    const handleDelete = async (id) => {
        const { history } = currentUserData;
        const docRef = doc(db, "users", currentUser.uid);
        const index = history.indexOf(id);
        history.splice(index, 1);

        await updateDoc(docRef, {
            history
        })

        setVideos(videos.filter(ele => ele.id !== id));
    }

    return (
        <>
            <div className="w-full max-w-full max-h-full overflow-auto scrollbar-hide md:scrollbar-default">
                <div className='w-full d-flex justify-between dark:text-white text-black my-4 px-4 '>
                    <h2 className="text-2xl md:text-3xl">History</h2>

                    <button className="dark:text-white bg-stone-200 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70 px-3 rounded-3xl text-base py-1.5 d-flex gap-2" onClick={clearHistory}>Clear <MdAutoDelete className='text-xl' /></button>
                </div>
                <div className='w-full d-flex gap-3 md:gap-4 dark:text-white text-black my-4 px-4 '>
                    <h4 className='text-lg'>Sort</h4>
                    <Sort setVideos={setVideos} videos={videos} />
                </div>

                <div className='dark:bg-black bg-white p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-5'>
                    {
                        !isLoading && videos  ?
                            videos.map((ele, i) => {

                                const { id, title, channelTitle, publishedTimeText, viewCount, channelThumbnail, thumbnail, lengthText, channelId } = ele;

                                if (thumbnail) {
                                    return (
                                        <div className="relative" key={i}>
                                            <HomeVdoCard videoId={id} title={title} channelTitle={channelTitle} time={publishedTimeText} views={viewCount} channelPhoto={channelThumbnail ? channelThumbnail : [{ url: 'https://static.vecteezy.com/system/resources/previews/008/506/404/original/contact-person-red-icon-free-png.png' }]} thumbnail={thumbnail} lengthText={lengthText} channelId={channelId} />

                                            <button className='absolute left-[88%] top-[88%]' onClick={() => handleDelete(id)}><MdDelete className='text-2xl dark:text-white text-black' /></button>
                                        </div>
                                    )
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
        </>
    )
}

export default History