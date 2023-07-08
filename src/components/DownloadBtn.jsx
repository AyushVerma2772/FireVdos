import React from 'react';
import { fetchFromAPI } from '../fetchAPI';

const DownloadBtn = ({ videoId }) => {
    const resObj = { '144p': 0, '360p': 1, '720p': 2 };

    const handleDownload = async (e) => {
        const res = e.target.value;
        if (res) {
            const apiData = await fetchFromAPI(`dl?id=${videoId}`);
            const { formats } = await apiData;
            const index = resObj[res];
            const vdoUrl = formats[index].url;

            window.open(vdoUrl)
        }
    };


    return (
        <>
            <select onChange={(e) => handleDownload(e)} className='cursor-pointer p-1.5 px-3 bg-stone-200 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70 outline-none rounded'
            >
                <option className='bg-stone-200/80 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70' value=''>Download</option>
                <option className='bg-stone-200/80 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70' value='144p'>144p</option>
                <option className='bg-stone-200/80 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70' value='360p'>360p</option>
                <option className='bg-stone-200/80 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70' value='720p'>720p</option>
            </select>
        </>
    );
};

export default DownloadBtn;