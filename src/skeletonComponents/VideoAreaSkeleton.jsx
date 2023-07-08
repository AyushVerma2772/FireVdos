import React from 'react';
import { BiSolidUserCircle } from "react-icons/bi";

const VideoAreaSkeleton = () => {
    return (
        <div className="w-full lg:w-[70%]">
            <div className="flex gap-1 p-5 flex-col w-full">
                <div className="skeleton-loading flex justify-center items-center w-full h-64 sm:h-[45vh] md:h-[55vh] xl:h-[75vh] mb-3">
                    <svg className="w-12 h-12 text-stone-400/50 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 384 512"><path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" /></svg>
                </div>

                <div className="skeleton-loading h-6 max-w-[95%]" />

                <div className="w-full flex justify-between items-center">
                    <div className='d-flex gap-3'>

                        <BiSolidUserCircle className='animate-pulse text-[#e4dede] dark:text-[#3c3c3c] w-12 h-12 rounded-full' />


                        <div className='skeleton-loading w-52 h-6' />

                    </div>
                    <div className="skeleton-loading h-6 w-20 py-1 px-2" />
                </div>

                <pre className="dark:bg-neutral-800 bg-stone-200/50 my-5 p-2 rounded-md overflow-hidden">
                    <div className="skeleton-loading h-4 mb-1" />
                    <div className="skeleton-loading h-4 mb-1" />
                    <div className="skeleton-loading h-4 mb-1" />
                    <div className="skeleton-loading h-4 mb-1" />
                </pre>
            </div>
        </div>
    )
}

export default VideoAreaSkeleton