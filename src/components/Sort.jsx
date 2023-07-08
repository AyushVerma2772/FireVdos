import React, { useState } from 'react';

const Sort = ({ videos, setVideos }) => {
    const [prevOp, setPrevOp] = useState("newest");

    const handleSort = (e) => {
        const currOp = e.target.value;

        if (currOp.length) {
            if (currOp !== prevOp) {
                if (currOp === "a-z") {
                    const arr = [...videos].sort((a, b) => a.title.localeCompare(b.title));
                    setVideos(arr);
                    setPrevOp(currOp);

                }

                else {
                    const arr = [...videos].reverse();
                    setVideos(arr);
                    setPrevOp(currOp);
                }

            }
        }
        
    };

    return (
        <select
            className='cursor-pointer p-2 px-3 bg-stone-200 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70 outline-none rounded m-4'
            onChange={handleSort}
        >
            <option className='bg-stone-200/80 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70' value=''>
                Sort By
            </option>
            <option className='bg-stone-200/80 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70' value='newest'>
                Newest
            </option>
            <option className='bg-stone-200/80 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70' value='oldest'>
                Oldest
            </option>
            <option className='bg-stone-200/80 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70' value='a-z'>
                A-Z
            </option>
        </select>
    );
};

export default Sort;
