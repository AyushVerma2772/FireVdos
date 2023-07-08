import React, { useState } from 'react'
import CommentCard from './CommentCard'
import { fetchFromAPI } from '../fetchAPI';

const CommentArea = ({ videoId }) => {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const getDataFromApi = async () => {
        setShowComments(!showComments);

        // if comments are not available then fetch rthe comments
        if (!showComments && comments.length === 0) {
            setLoading(true);
            const apiData = await fetchFromAPI(`comments?id=${videoId}`)
            setComments(apiData.data)
            setLoading(false);
        }
    }


    return (
        <>
            <div className="w-full px-5">
                <div><h2 className='mb-4 inline-block '>Comments</h2> <button className='inline-block ml-4 text-blue-500 text-base' onClick={getDataFromApi}>{
                    showComments ? 'Hide comments' : 'Load comments'
                }</button></div>

                {
                    showComments && <div className='flex flex-col gap-8'>
                        {
                            loading ? <div className="flex w-full justify-center"><img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="" className='w-9 h-9 rounded-full' /> </div> :

                                comments.map((ele) => (
                                    <CommentCard key={ele.commentId} authorText={ele.authorText} textDisplay={ele.textDisplay} publishedTimeText={ele.publishedTimeText} likesCount={ele.likesCount} authorThumbnail={ele.authorThumbnail} />
                                ))
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default CommentArea