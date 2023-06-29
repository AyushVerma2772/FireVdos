import React, { useContext, useEffect, useState } from 'react'
import Slider from '../components/Slider';
import VideoContainer from '../components/VideoContainer';
import { fetchFromAPI } from '../fetchAPI';
import { CountryCodeContext } from '../context/countryCodeContext';
import { HomeVdoContext } from '../context/HomeVdoContext';

const Home = () => {

    const [category, setCategory] = useState(null);
    const countryCode = useContext(CountryCodeContext);
    const [loading, setLoading] = useState(false);
    const homeVdos = useContext(HomeVdoContext);
    const [videos, setVideos] = useState([]);

    const getDataFromApi = async () => {

        setLoading(true);

        // if category is selected then fetch data related to category
        if (category) {
            const c = category[0].toLowerCase() + category.slice(1, category.length)
            const apiData = await fetchFromAPI(`hashtag?tag=${c}&geo=${countryCode}`)
            // console.log(apiData.data)
            setVideos(apiData.data)
        }

        // else fetch home data
        else setVideos(homeVdos)


        setLoading(false)
    }

    useEffect(() => {
        getDataFromApi();

        // eslint-disable-next-line
    }, [category, countryCode, homeVdos])


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