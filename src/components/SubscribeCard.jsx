import React from 'react'
import SubscribeBtn from './SubscribeBtn'
import { Link } from 'react-router-dom'

const SubscribeCard = ({ channelId, channelName, channelImgUrl, subscriberCount }) => {
    return (
        <>
            <div className="flex flex-col gap-3 justify-center items-center bg-stone-200/80 dark:bg-[#272727] shadow-md py-4 rounded-md w-full">
                <img className="w-20 h-20 lg:w-24 lg:h-24 sm:w-20 sm:h-20 rounded-full" src={channelImgUrl} alt="" />

                <Link to={`/channel/${channelId}`} className='font-medium text-base xl:text-lg'>{channelName}</Link>

                <p className='text-dark-gray dark:text-light-gray'>{subscriberCount}</p>

                <SubscribeBtn channelId={channelId} channelName={channelName} channelImgUrl={channelImgUrl} subscriberCount={subscriberCount} />
            </div>
        </>
    )
}

export default SubscribeCard