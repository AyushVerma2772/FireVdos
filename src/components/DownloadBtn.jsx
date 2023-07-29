import React from 'react';
import { fetchFromAPI } from '../fetchAPI';
import axios from 'axios';

const DownloadBtn = ({ videoId }) => {
    const resObj = { '144p': 0, '360p': 1, '720p': 2 };

    const options = {
        headers: {
            'X-RapidAPI-Key': 'fa9a9e1cefmshdc5532c189e8abap157f45jsn52a6d3895f74',
            'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
    };


    const handleDownload = async (e) => {
        const res = e.target.value;
        if (res) {
            if (res === "mp3") {
                const { data } = await axios.get(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, options);
                window.open(data?.link)
            }

            else {
                const apiData = await fetchFromAPI(`dl?id=${videoId}`);
                const { formats } = await apiData;
                const index = resObj[res];
                const vdoUrl = formats[index].url;

                window.open(vdoUrl)
            }
            e.target.value = "";
        }
    };


    return (
        <>
            <select onChange={(e) => handleDownload(e)} className='cursor-pointer p-1.5 px-3 bg-stone-200 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70 outline-none rounded'
            >
                <option className='bg-stone-200/80 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70' value=''>Download</option>
                <option className='bg-stone-200/80 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70' value='mp3'>mp3</option>
                <option className='bg-stone-200/80 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70' value='144p'>144p</option>
                <option className='bg-stone-200/80 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70' value='360p'>360p</option>
                <option className='bg-stone-200/80 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70' value='720p'>720p</option>
            </select>
        </>
    );
};

export default DownloadBtn;