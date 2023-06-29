import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoArea from '../components/VideoArea';
import RelatedVdos from '../components/RelatedVdos';
import { CountryCodeContext } from '../context/countryCodeContext';
import { fetchFromAPI } from '../fetchAPI';

const Watch = () => {
    const { videoID } = useParams();
    const countryCode = useContext(CountryCodeContext);
    const [videoData, setVideoData] = useState();
    const [loading, setLoading] = useState(false);
    const [relatedVdos, setRelatedVdos] = useState([])


    const getDataFromApi = async () => {
        setLoading(true);
        const apiData = await fetchFromAPI(`related?id=${videoID}&geo=${countryCode}`);
        setVideoData(apiData.meta);
        setRelatedVdos(apiData.data);

        setLoading(false);
    }

    useEffect(() => {
        getDataFromApi();

        // eslint-disable-next-line
    }, [videoID])



    return (
        <>

            <div className="lg:flex w-full max-w-full max-h-full overflow-auto">
                <VideoArea loading={loading} videoData={videoData} />

                <RelatedVdos loading={loading} relatedVdos={relatedVdos} />
            </div>

        </>
    )
}

export default Watch