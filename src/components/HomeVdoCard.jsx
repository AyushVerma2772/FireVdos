import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomeVdoCard = ({ videoId, title, channelTitle, time, views, channelPhoto, thumbnail, richThumbnail, lengthText, channelId }) => {
    const navigate = useNavigate();
    const [hoverPlay, setHoverPlay] = useState(false);
    // conMouseOver={e => { if (richThumbnail && richThumbnail !== wrongUrl) { e.target.src = richThumbnail[richThumbnail.length - 1].url } }} onMouseLeave={e => { e.target.src = thumbnail[thumbnail.length - 1].url }} 

    return (
        <>
            <div className='cursor-pointer dark:bg-black bg-white w-[97%] md:w-11/12 2xl:w-[95%] p-1' onMouseOver={() => setHoverPlay(true)} onMouseLeave={() => setHoverPlay(false)}>

                {/* Thumbnail */}
                <div className="w-full h-52 2xl:h-56 relative" onClick={() => { navigate(`/watch/${videoId}`) }}>
                    {
                        hoverPlay ?
                            <iframe className='w-full h-full' src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&modestbranding=0&controls=0`} title='fire-vdos' frameBorder="0" allow="autoplay" ></iframe>
                            :
                            <>
                                <img className='w-full h-full rounded-md' src={thumbnail[thumbnail.length - 1].url} alt="" />

                                {lengthText && <span className='absolute rounded-sm py-0.5 px-1 text-xs bg-zinc-950/80 text-white bottom-1 right-1'>{lengthText}</span>}
                            </>
                    }

                    <div className="w-full h-full absolute top-0 left-0"></div>
                </div>

                <div className="content flex w-full">
                    {/* channel photo */}
                    <div className="left w-[13%] d-flex">
                        <img className='w-10 h-10 rounded-full' src={channelPhoto[channelPhoto.length - 1].url} alt="channel-pic" title={channelTitle} onClick={() => { navigate(`/channel/${channelId}`) }} />
                    </div>

                    <div className="right w-[87%] flex-grow p-2 gap-1">
                        {/* Title */}
                        {title && <p className='max-w-full dot-text dark:text-white text-black text-base font-semibold tracking-wide' onClick={() => { navigate(`/watch/${videoId}`) }}>{title}</p>}

                        {/* Channel Name*/}
                        <Link to={`/channel/${channelId}`} className='dark:text-light-gray text-dark-gray text-sm dark:hover:text-white hover:text-black' title={channelTitle}>{channelTitle}</Link>

                        {/* Video info */}
                        <p className='dark:text-light-gray text-dark-gray text-sm'>
                            {views && <span>{parseInt(views).toLocaleString()} views</span>}
                            {time && <span>&nbsp;&nbsp;&#9679;&nbsp;</span>}
                            {time && <span>{time}</span>}
                        </p>
                    </div>


                </div>
            </div>
        </>
    )
}

export default HomeVdoCard


/*
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomeVdoCard = ({ videoId, title, channelTitle, time, views, channelPhoto, thumbnail, richThumbnail, lengthText }) => {
    const navigate = useNavigate();

    const [hoverPlay, setHoverPlay] = useState(false);


    return (
        <>
            <div className='cursor-pointer dark:bg-black bg-white w-11/12 p-1' onClick={() => { navigate(`/watch/${videoId}`) }} onMouseOver={() => setHoverPlay(true)} onMouseLeave={() => setHoverPlay(false)}>
                <div className="w-full h-52 relative">
                    {
                        hoverPlay ?
                            <iframe className='w-full h-full' src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&modestbranding=1`} title='fire-vdos' frameBorder="0" allow="autoplay" ></iframe>
                            :
                            <>
                                <img className='w-full h-full rounded-md' src={thumbnail[thumbnail.length - 1].url} alt="" />

                                <span className='absolute rounded-sm py-0.5 px-1 text-xs bg-zinc-950/80 text-white bottom-1 right-1'>{lengthText}</span>
                            </>
                    }
                </div>

                <div className="content flex w-full">

                    <div className="left w-[13%] d-flex">
                        <img className='w-10 h-10 rounded-full' src={channelPhoto[channelPhoto.length - 1].url} alt="" />
                    </div>

                    <div className="right w-[87%] flex-grow p-2 gap-1">
                        {title && <p className='max-w-full dot-text dark:text-white text-black text-base font-semibold tracking-wide' >{title}</p>}
                        <a className='dark:text-light-gray text-dark-gray text-sm dark:hover:text-white hover:text-black ' href="/">{channelTitle}</a>
                        <p className='dark:text-light-gray text-dark-gray text-sm'>
                            {views && <span>{parseInt(views).toLocaleString()} views</span>}
                            {time && <span>&nbsp;&nbsp;&#9679;&nbsp;</span>}
                            {time && <span>{time}</span>}
                        </p>
                    </div>


                </div>
            </div>
        </>
    )
}

export default HomeVdoCard;
*/
