import React from 'react';

const SearchVdoCardSkeleton = () => {
    return (
        <>
            <div className="w-4/5 gap-2 flex flex-col sm:flex-row cursor-pointer">
                <div className="h-48 sm:w-[35%] w-full">
                    <div className="skeleton-loading w-full h-full rounded-xl" />
                </div>

                <div className="w-full sm:w-[65%]">
                    <div className="right w-full flex flex-col gap-1 sm:gap-3 p-2">
                        <div className='skeleton-loading h-5 w-full sm:w-full'  />
                        <div className='skeleton-loading h-5 w-full sm:w-1/2'  />
                        <div className='skeleton-loading h-5 w-full sm:w-3/12'  />
                        <div className='skeleton-loading h-10 w-full sm:w-[80%]'  />
                    </div>
                    
                </div>
            </div>

        </>
    )
}

export default SearchVdoCardSkeleton