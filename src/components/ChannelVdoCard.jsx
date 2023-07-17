import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ChannelVdoCard = ({ videoId, title, time, views, thumbnail, richThumbnail, lengthText }) => {

    const navigate = useNavigate();
    const [hoverPlay, setHoverPlay] = useState(false);

    // onMouseOver={e => { if (richThumbnail) { e.target.src = richThumbnail[richThumbnail.length - 1].url } }} onMouseLeave={e => { e.target.src = thumbnail[thumbnail.length - 1].url }}

    return (
        <>
            <div className='cursor-pointer dark:bg-black bg-white w-[97%] md:w-11/12 2xl:w-[95%] p-1' onMouseOver={() => setHoverPlay(true)} onMouseLeave={() => setHoverPlay(false)}>

                {/* Thumbnail */}
                <div className="w-full h-52 lg:h-36 relative" onClick={() => { navigate(`/watch/${videoId}`)}}>
                    {
                        hoverPlay ?
                            <iframe className='w-full h-full ' src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&modestbranding=0&controls=0`} title='fire-vdos' frameBorder="0" allow="autoplay" ></iframe>
                            :
                            <>
                                <img className='w-full object-contain h-full rounded-md' src={thumbnail[thumbnail.length - 1].url} alt="" />

                                {lengthText && <span className='absolute rounded-sm py-0.5 px-1 text-xs bg-zinc-950/80 text-white bottom-1 right-1'>{lengthText}</span>}
                            </>
                    }

                    <div className="w-full h-full absolute top-0 left-0" ></div>
                </div>

                <div className="w-full flex-grow p-2 gap-1.5">
                    {/* Title */}
                    {title && <p className='max-w-full dot-text dark:text-white text-black text-sm font-semibold tracking-wide' onClick={() => navigate(`/watch/${videoId}`)}>{title}</p>}

                    {/* .Video Info */}
                    <p className='dark:text-light-gray text-dark-gray mt-1.5 text-xs'>
                        {views && <span>{parseInt(views).toLocaleString()} views</span>}
                        {time && <span>&nbsp;&nbsp;&#9679;&nbsp;</span>}
                        {time && <span>{time}</span>}
                    </p>
                </div>

            </div>
        </>
    )
}

export default ChannelVdoCard