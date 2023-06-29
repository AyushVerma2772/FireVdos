import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../fetchAPI';
import { CountryCodeContext } from '../context/countryCodeContext';
import SearchVdoCard from '../components/SearchVdoCard';
import SearchVdoCardSkeleton from '../skeletonComponents/SearchVdoCardSkeleton';
import { SearchDataContext } from '../context/SearchDataContext';

const SearchPage = () => {
    const { searchValue } = useParams();
    const countryCode = useContext(CountryCodeContext);
    const { searchData, updateSearchData } = useContext(SearchDataContext);
    const [loading, setLoading] = useState(false);
    const array = Array(12).fill(0);
    const [videos, setVideos] = useState([]);

    const getDataFromApi = async () => {
        setLoading(true);

        // first check that search query is present in our context or not
        const cachedData = searchData[searchValue];

        // if yes then no need to fetch again
        if (cachedData) {
            setVideos(cachedData);
            setLoading(false);
        }

        // else fetch new data
        else {
            const apiData = await fetchFromAPI(`search?query=${searchValue}&geo=${countryCode}`);
            setVideos(apiData.data);
            setLoading(false);
            updateSearchData(searchValue, apiData.data);
        }
    };

    useEffect(() => {
        getDataFromApi();

        // eslint-disable-next-line
    }, [searchValue, countryCode]);

    return (
        <>
            <div className="w-full max-w-full max-h-full overflow-auto">
                <h2 className="dark:text-white text-black m-4 text-2xl md:text-3xl">
                    Search result for <span className="text-red-600">{searchValue}</span>
                </h2>
                <div className="dark:bg-black bg-white p-4 d-flex flex-col gap-6">
                    {
                        !loading && videos ?
                            videos.map((ele, i) => {
                                const {
                                    videoId, title, channelTitle, publishedTimeText, viewCount, thumbnail, description, richThumbnail, lengthText, channelId, type,
                                } = ele;

                                if (thumbnail) {
                                    return (
                                        <SearchVdoCard key={i} videoId={videoId} title={title} channelTitle={channelTitle} time={publishedTimeText} views={viewCount} thumbnail={thumbnail} description={description} richThumbnail={richThumbnail} lengthText={lengthText} channelId={channelId} type={type}
                                        />
                                    );
                                }
                                return null;
                            })
                            :
                            array.map((ele, i) => <SearchVdoCardSkeleton key={i} />)

                    }
                </div>
            </div>
        </>
    );
};

export default SearchPage;
