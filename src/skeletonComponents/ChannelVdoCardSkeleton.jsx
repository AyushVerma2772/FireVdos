import React from 'react'

const ChannelVdoCardSkeleton = () => {
    return (
        <div className=' w-11/12 p-1'>
            <div className="skeleton-loading w-full h-40 lg:h-36 mb-2 relative" />

            <p className='skeleton-loading h-8 mb-2 max-w-full' />

            <div className='w-full d-flex gap-3'>
                <div className='skeleton-loading inline-block h-5 w-16' />
                <div className='skeleton-loading inline-block h-5 w-24' />
            </div>
        </div>

    )
}

export default ChannelVdoCardSkeleton