import React, { useContext, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import VideoAreaSkeleton from '../skeletonComponents/VideoAreaSkeleton';
import CommentArea from './CommentArea';
import DownloadBtn from './DownloadBtn';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserDataContext } from '../context/UserDataContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const VideoArea = ({ loading, videoData }) => {

    const [showMore, setShowMore] = useState(false);
    const currentUser = useContext(AuthContext);
    const userData = useContext(UserDataContext);
    const navigate = useNavigate()

    const createLinks = (text) => {
        if (text) {
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.split(urlRegex).map((part, index) => {
                if (part.match(urlRegex)) {
                    return (
                        <a className='text-blue-600' key={index} href={part} target="_blank" rel="noopener noreferrer">
                            {part}
                        </a>
                    );
                }
                return part;
            });
        }
    }

    const handleLike = async () => {
        const docRef = doc(db, "users", currentUser.uid);
        const { likedVdos } = userData;

        if (likedVdos.includes(videoData.videoId)) {
            const index = likedVdos.indexOf(currentUser.uid);
            likedVdos.splice(index, 1)
        }

        else likedVdos.push(videoData.videoId)

        await updateDoc(docRef, {
            likedVdos
        })

        // console.log(userData)

    }

    return (
        <>
            {
                !loading ?
                    <div className="w-full lg:w-[70%]">
                        <div className="gap-2 p-5 flex-col w-full">

                            {/* Youtube iframe */}
                            <div className="w-full h-60 sm:h-[75vh] mb-3">
                                <iframe height={"100%"} width={"100%"} src={`https://www.youtube.com/embed/${videoData?.videoId}?autoplay=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </div>

                            {/* title */}
                            <p className='dot-text max-w-[95%] dark:text-white text-black md:text-xl text-base font-semibold tracking-wide mb-3'>{videoData?.title}</p>


                            <div className="w-full flex flex-wrap justify-between items-center gap-4">

                                {/* Channel info */}
                                <div className='d-flex gap-3 cursor-pointer' title={videoData?.channelTitle}>
                                    <img className='w-10 h-10 rounded-full' src={videoData?.channelThumbnail[0].url} alt="" onClick={() => navigate(`/channel/${videoData?.channelId}`)} />

                                    <Link to={`/channel/${videoData?.channelId}`} className='dot-text semibold dark:text-light-gray text-dark-gray text-base dark:hover:text-white hover:text-black '>{videoData?.channelTitle}<span className="block text-sm">{videoData?.subscriberCountText}</span></Link>
                                </div>

                                {/* Liked button */}
                                {
                                    // only show like button when user is login
                                    videoData?.likeCount && currentUser &&

                                    <button className='dark:text-white bg-stone-200/80 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-[#272727]/50 px-3 py-1 rounded-3xl text-base d-flex gap-2' onClick={handleLike}>
                                        <AiOutlineLike className='text-xl' />

                                        {/* Agar user ne video ko like kara ha to 'Liked' dikhna chahiye else like counts */}
                                        <span>
                                            {
                                                userData?.likedVdos.includes(videoData?.videoId) ?
                                                    "Liked"
                                                    :
                                                    parseInt(videoData?.likeCount).toLocaleString()
                                            }
                                        </span>
                                    </button>
                                }


                                {/* Download button */}
                                <DownloadBtn videoId={videoData?.videoId} />
                            </div>

                            {/* Description */}
                            <div className='my-5'>
                                <pre className={`dark:bg-[#272727] dark:text-white text-black bg-stone-200/80 text-sm my-1 p-2 rounded-md leading-7 ${showMore ? '' : 'description'}`}>
                                    {createLinks(videoData?.description)}
                                </pre>
                                <button className='text-sm text-blue-500' onClick={() => setShowMore(!showMore)}>{showMore ? 'show less' : 'show more'}</button>
                            </div>
                        </div>

                        {/* Comments */}
                        <CommentArea videoId={videoData?.videoId} />
                    </div>

                    :

                    // Skeleton of video Area
                    <VideoAreaSkeleton />
            }
        </>
    )
}

export default VideoArea;
