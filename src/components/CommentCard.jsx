import React from 'react';
import { BiLike } from 'react-icons/bi'

const CommentCard = ({ authorText, textDisplay, publishedTimeText, likesCount, authorThumbnail }) => {
    return (
        <>
            <div className="w-[95%] md:w-[90%] flex gap-4">
                <img src={authorThumbnail[0].url} alt="" className='w-10 h-10 rounded-full' />
                <div className="text-sm text-black dark:text-white">
                    <p className='semibold' >{authorText} <span className='ml-2 text-dark-gray dark:text-light-gray'>{publishedTimeText}</span></p>
                    <p className='my-2 break-words'>{textDisplay}</p>
                    <div className='flex gap-2'><BiLike className='text-xl' /><p className='text-dark-gray dark:text-light-gray'>{likesCount}</p></div>
                </div>
            </div>
        </>
    )
}

export default CommentCard