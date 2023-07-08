import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const SearchVdoCard = ({ videoId, title, channelTitle, time, views, thumbnail, description, lengthText, channelId, type }) => {
    const navigate = useNavigate();
    const [hoverPlay, setHoverPlay] = useState(false);

    const handelNavigation = (type) => {
        if (type !== 'channel') navigate(`/watch/${videoId}`);
        else if (type === 'channel') { navigate(`/channel/${channelId}`) };
    }


    return (
        <>

            <div className="sm:w-4/5 w-[97%] m-auto gap-2 flex flex-col sm:flex-row cursor-pointer" onMouseOver={() => setHoverPlay(true)} onMouseLeave={() => setHoverPlay(false)}>

                {/* Thumbnail */}
                <div className="relative h-52 sm:h-48 flex justify-center sm:w-[35%] w-full overflow-hidden 2xl:h-64 2xl:w-[35%]" onClick={() => handelNavigation(type)}>

                    {
                        hoverPlay && (type !== 'channel') ?
                            <iframe className='w-full h-full' src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&modestbranding=0&controls=0`} title='fire-vdos' frameBorder="0" allow="autoplay" ></iframe>
                            :
                            <>
                                <img className={`${type === 'channel' ? 'w-48 h-48 rounded-full' : 'w-full h-full rounded-xl'}`} src={thumbnail[thumbnail.length - 1].url} alt=""

                                    onError={(e) => {
                                        e.target.src = "https://firebasestorage.googleapis.com/v0/b/infinity-blogs.appspot.com/o/blogsImages%2Fdmd1688800551223?alt=media&token=7072e12c-c8d7-4368-b3ba-a3db4d04c884";
                                    }}

                                />

                                {lengthText && <span className='absolute rounded-sm py-0.5 px-1 text-xs bg-zinc-950/80 text-white bottom-1 right-1'>{lengthText}</span>}
                            </>
                    }


                    <div className="w-full h-full absolute top-0 left-0"></div>
                </div>

                <div className="sm:max-w-[65%]">

                    <div className="right flex flex-col gap-1 sm:gap-3 p-2">

                        {/* Title */}
                        <p className='dot-text max-w-full dark:text-white text-black text-base font-semibold tracking-wide' onClick={() => handelNavigation(type)}>{title}</p>
                        {/* Video Info */}
                        <p className='dark:text-light-gray text-dark-gray text-sm' onClick={() => { navigate(`/watch/${videoId}`) }}>
                            {views && <span>{parseInt(views).toLocaleString()} views</span>}
                            {time && <span>&nbsp;&nbsp;&#9679;&nbsp;</span>}
                            {time && <span>{time}</span>}
                        </p>

                        {/* Channel name */}
                        {channelId && <Link to={`/channel/${channelId}`} className='dark:text-light-gray text-dark-gray text-sm dark:hover:text-white hover:text-black ' href="/">{channelTitle}</Link>}

                        {description && <p className='dot-text dark:text-light-gray text-dark-gray text-sm'>{description}</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchVdoCard