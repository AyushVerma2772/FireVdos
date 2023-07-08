import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import VideoAreaSkeleton from '../skeletonComponents/VideoAreaSkeleton';
import CommentArea from './CommentArea';
import DownloadBtn from './DownloadBtn';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserDataContext } from '../context/UserDataContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import SubscribeBtn from './SubscribeBtn';
import { toast } from 'react-toastify';
import ShareModal from './ShareModal';

const VideoArea = ({ loading, videoData }) => {

    const [showMore, setShowMore] = useState(false);
    const currentUser = useContext(AuthContext);
    const userData = useContext(UserDataContext);
    const navigate = useNavigate();

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
        if (currentUser && userData) {
            const docRef = doc(db, "users", currentUser.uid);
            const { likedVdos } = userData;

            if (likedVdos.includes(videoData.videoId)) {
                const index = likedVdos.indexOf(videoData.videoId);
                likedVdos.splice(index, 1)
            }

            else likedVdos.unshift(videoData.videoId)

            await updateDoc(docRef, {
                likedVdos
            })
        }

        else toast.error('You are not login 😫', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored", });

        // console.log(userData)

    }


    const checkHistory = async () => {
        if (currentUser && userData && userData.history && videoData) {
            const docRef = doc(db, "users", currentUser.uid);
            const { history } = userData;

            if (!history.includes(videoData.videoId)) {
                history.unshift(videoData.videoId)
            }

            await updateDoc(docRef, {
                history
            })
        }

        // console.log(userData);

    }

    useEffect(() => {
        checkHistory();

        // eslint-disable-next-line
    }, [currentUser, userData, videoData])


    return (
        <>
            {
                !loading ?
                    <div className="w-full lg:w-[70%]">
                        <div className="gap-2 p-5 flex-col w-full">

                            {/* Youtube iframe */}
                            <div className="w-full h-64 sm:h-[45vh] md:h-[55vh] xl:h-[75vh] mb-3">
                                <iframe height={"100%"} width={"100%"} src={`https://www.youtube.com/embed/${videoData?.videoId}?autoplay=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </div>

                            {/* title */}
                            <p className='dot-text max-w-[95%] dark:text-white text-black md:text-xl text-base font-semibold tracking-wide mb-3'>{videoData?.title}</p>


                            <div className="my-5 w-full flex flex-wrap justify-between items-center gap-4">

                                {/* Channel info */}
                                <div className="d-flex flex-wrap gap-10 sm:w-auto w-full justify-between">
                                    <div className='d-flex gap-3 cursor-pointer' title={videoData?.channelTitle}>
                                        <img className='w-10 h-10 rounded-full' src={videoData?.channelThumbnail[videoData?.channelThumbnail.length - 1].url} alt="" onClick={() => navigate(`/channel/${videoData?.channelId}`)} />

                                        <Link to={`/channel/${videoData?.channelId}`} className='dot-text semibold dark:text-light-gray text-dark-gray text-base dark:hover:text-white hover:text-black '>{videoData?.channelTitle}<span className="block text-sm">{videoData?.subscriberCountText}</span></Link>
                                    </div>

                                    <SubscribeBtn channelId={videoData?.channelId} channelName={videoData?.channelTitle} channelImgUrl={videoData?.channelThumbnail[videoData?.channelThumbnail.length - 1].url} subscriberCount={videoData?.subscriberCountText} />
                                </div>

                                <div className="d-flex gap-5 md:gap-8 lg:gap-10 2xl:gap-12 flex-wrap w-full md:w-auto justify-between">
                                    {/* Liked button */}
                                    {
                                        videoData?.likeCount && <button className='dark:text-white bg-stone-200 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70 px-3 rounded-3xl text-base d-flex gap-2' onClick={handleLike}>
                                            <AiOutlineLike className='py-1 pr-2 border-r border-dark-gray text-3xl' />

                                            {/* Agar user ne video ko like kara ha to 'Liked' dikhna chahiye else like counts */}
                                            <span>
                                                {
                                                    userData && userData.likedVdos && userData.likedVdos.includes(videoData?.videoId) ?
                                                        "Liked"
                                                        :
                                                        parseInt(videoData?.likeCount).toLocaleString()
                                                }
                                            </span>

                                        </button>
                                    }

                                    {/* Share Button */}
                                    <ShareModal title={videoData?.title} />


                                    {/* Download button */}
                                    <DownloadBtn videoId={videoData?.videoId} />
                                </div>

                            </div>

                            {/* Description */}
                            {videoData?.description && <div className='my-5'>
                                <pre className={`dark:bg-[#272727] dark:text-white text-black bg-stone-200 text-sm my-1 p-2 rounded-md leading-7 ${showMore ? '' : 'description'}`}>
                                    {createLinks(videoData?.description)}
                                </pre>
                                <button className='text-sm text-blue-500' onClick={() => setShowMore(!showMore)}>{showMore ? 'show less' : 'show more'}</button>
                            </div>}
                        </div>

                        {/* Comments */}
                        <CommentArea videoId={videoData?.videoId} />
                    </div>

                    :

                    // Skeleton of video Area
                    <>
                        <div className='loader fixed w-full h-0.5 left-0 top-0 bg-[#FF0000] z-[9999]' />
                        <VideoAreaSkeleton />
                    </>
            }
        </>
    )
}

export default VideoArea;
