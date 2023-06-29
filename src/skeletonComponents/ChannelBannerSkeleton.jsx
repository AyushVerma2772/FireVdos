import React from 'react';
import { BiSolidUserCircle } from 'react-icons/bi';

const ChannelBannerSkeleton = () => {
    return (
        <div className="w-full mb-5 flex gap-5 lg:gap-6 flex-col">

            <div className="skeleton-loading h-32" />

            <div className="flex sm:flex-row flex-col justify-center items-center md:px-8 gap-2 sm:gap-5">
                <BiSolidUserCircle className="animate-pulse text-[#e4dede] dark:text-[#3c3c3c]  w-20 h-20 lg:w-32 lg:h-32 sm:w-24 sm:h-24 rounded-full" />


                <div className="w-full flex flex-col items-center sm:items-start">
                    <div className="skeleton-loading h-7 w-60 max-w-full" />

                    <div className="my-2 flex gap-4 flex-wrap justify-center">
                        <div className="skeleton-loading h-4 w-40 max-w-full" />
                        <div className="skeleton-loading h-4 w-40 max-w-full" />
                        <div className="skeleton-loading h-4 w-40 max-w-full" />
                    </div>

                    <div className="skeleton-loading h-12 w-[70vh]" />
                </div>
            </div>
        </div>
    );
};

export default ChannelBannerSkeleton;
