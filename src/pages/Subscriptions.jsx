import React, { useContext } from 'react';
import SubscribeCard from '../components/SubscribeCard';
import { CurrentUserContext } from '../context/CurrentUserContext';

const Subscriptions = () => {

    const { currentUserData } = useContext(CurrentUserContext);

    // console.log(userData.subscribedChannels)


    return (
        <>
            <div className="w-full max-w-full max-h-full overflow-auto scrollbar-hide md:scrollbar-default">
                <h2 className="dark:text-white text-black m-4 text-2xl md:text-3xl">Subscribed Channels</h2>

                <div className="p-5 md:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 xl:gap-12 justify-items-center">
                    {
                        currentUserData && currentUserData.subscribedChannels ?

                            currentUserData.subscribedChannels.map((ele, i) => (<SubscribeCard key={i} channelId={ele.channelId} channelName={ele.channelName} channelImgUrl={ele.channelImgUrl} subscriberCount={ele.subscriberCount} />))

                            :

                            <div className='loader fixed w-full h-0.5 left-0 top-0 bg-[#FF0000] z-[9999]' />
                    }
                </div>
            </div>
        </>
    )
}

export default Subscriptions