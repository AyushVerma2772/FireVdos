import React from 'react';
import { BiSolidUserCircle } from 'react-icons/bi';

const HomeVdoCardSkeleton = () => {

    return (
        <>
            <div className='w-11/12 2xl:w-[95%] z-0'>
                <div className='skeleton-loading w-full h-52 2xl:h-56 rounded-md' />

                <div className="content flex w-full">

                    <div className="left w-[13%] d-flex">
                        <BiSolidUserCircle className='animate-pulse text-[#e4dede] dark:text-[#3c3c3c] w-12 h-12 rounded-full' />
                    </div>

                    <div className="right w-[87%] flex flex-col flex-grow p-2 gap-1">
                        <div className='skeleton-loading h-7 rounded-md max-w-full'></div>
                        <div className='skeleton-loading h-5 rounded-md w-1/2'></div>
                        <div className='skeleton-loading h-5 rounded-md w-4/5'></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HomeVdoCardSkeleton