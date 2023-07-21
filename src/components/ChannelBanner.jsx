import React from 'react';
import SubscribeBtn from "../components/SubscribeBtn"
import ChannelBannerSkeleton from '../skeletonComponents/ChannelBannerSkeleton';

const ChannelBanner = ({ channelData }) => {
  return (
    <>
      {
        channelData ?
          <div className="w-full flex gap-5 lg:gap-6 flex-col">
            {channelData.banner?.length > 0 && (
              <img
                src={channelData.banner[channelData.banner.length - 1].url}
                alt="channel banner"
                className="h-32 sm:h-auto object-cover"
              />
            )}

            <div className="flex sm:flex-row flex-col justify-center items-center md:px-8 sm:px-6 px-4 gap-2 sm:gap-5">
              {channelData.avatar?.length > 0 && (
                <img
                  className="w-20 h-20 lg:w-32 lg:h-32 sm:w-24 sm:h-24 rounded-full"
                  src={channelData.avatar[channelData.avatar.length - 1].url}
                  alt=""
                />
              )}

              <div className="w-full flex flex-col items-center sm:items-start ">

                <div className="w-full flex flex-col sm:flex-row justify-center items-center sm:justify-start pr-5 gap-2 sm:gap-16 my-2">
                  <p className="max-w-full dot-text dark:text-white text-black text-lg sm:text-xl font-semibold sm:font-medium tracking-wide">
                    {channelData?.title}
                  </p>

                  <SubscribeBtn channelId={channelData?.channelId} channelName={channelData?.title} channelImgUrl={channelData.avatar[channelData.avatar.length - 1].url} subscriberCount={channelData?.subscriberCountText + " subscribers"} />
                </div>

                <div className="dark:text-light-gray font-medium text-dark-gray text-sm 2xl:text-base my-2 flex gap-4 flex-wrap justify-center">
                  <p>{channelData?.channelHandle}</p>
                  <p>{channelData?.subscriberCountText} subscribers</p>
                  <p>{channelData?.videosCountText} videos</p>
                </div>

                <p className="max-w-full dot-text dark:text-white/80 text-black 2xl:text-base text-sm text-center sm:text-start">
                  {channelData?.description}
                </p>
              </div>
            </div>
          </div>

          :

          <ChannelBannerSkeleton />
      }
    </>
  );
};

export default ChannelBanner;
