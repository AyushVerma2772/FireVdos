import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import VideoArea from '../components/VideoArea';
import RelatedVdos from '../components/RelatedVdos';
import { CountryCodeContext } from '../context/countryCodeContext';
import { fetchFromAPI } from '../fetchAPI';
import { useQuery } from 'react-query';

const Watch = () => {
    const { videoID } = useParams();
    const countryCode = useContext(CountryCodeContext);

    const getDataFromApi = async () => {
        const apiData = await fetchFromAPI(`related?id=${videoID}&geo=${countryCode}`);
        return apiData;
    };

    const { isLoading, data } = useQuery(videoID, getDataFromApi, { cacheTime: 1800000, staleTime: 1800000 });

    return (
        <>
            <div className="lg:flex w-full max-w-full max-h-full overflow-auto scrollbar-hide md:scrollbar-default">
                <VideoArea loading={isLoading} videoData={data?.meta} nextVideoID={data?.data[0]?.videoId} />
                <RelatedVdos loading={isLoading} relatedVdos={data?.data} />
            </div>
        </>
    );
};

export default Watch;
