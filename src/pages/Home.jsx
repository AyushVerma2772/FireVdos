import React, { useContext, useEffect, useState } from 'react'
import Slider from '../components/Slider';
import VideoContainer from '../components/VideoContainer';
import { fetchFromAPI } from '../fetchAPI';
import { CountryCodeContext } from '../context/countryCodeContext';

const Home = () => {

    const [videos, setVideos] = useState([]);
    const [category, setCategory] = useState(null);
    const countryCode = useContext(CountryCodeContext);
    const [loading, setLoading] = useState(false);

    const getDataFromApi = async () => {

        if (countryCode) {
            setLoading(true);

            // if category is selected then fetch data related to category
            if (category) {
                const c = category[0].toLowerCase() + category.slice(1, category.length)
                const apiData = await fetchFromAPI(`hashtag?tag=${c}&geo=${countryCode}`)
                // console.log(apiData.data)
                setVideos(apiData.data)
            }

            // else fetch home data
            else {
                const apiData = await fetchFromAPI(`home?geo=${countryCode}`)
                setVideos(apiData.data)
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        getDataFromApi();

        // eslint-disable-next-line
    }, [category, countryCode])


    return (
        <>
            <div className="w-full max-w-full max-h-full overflow-auto">
                <Slider category={category} updateCategory={setCategory} />

                <VideoContainer loading={loading} videos={videos} />
            </div>
        </>
    )
}

export default Home