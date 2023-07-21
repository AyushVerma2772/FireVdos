import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../fetchAPI';
import { CountryCodeContext } from '../context/countryCodeContext';
import SearchVdoCard from '../components/SearchVdoCard';
import SearchVdoCardSkeleton from '../skeletonComponents/SearchVdoCardSkeleton';
import { useQuery } from 'react-query';

const SearchPage = () => {
    const { searchValue } = useParams();
    const countryCode = useContext(CountryCodeContext);
    const array = Array(12).fill(0);

    const getDataFromApi = async () => {
        const { data } = await fetchFromAPI(`search?query=${searchValue}&geo=${countryCode}`);
        return data;
    }
    
    const { isLoading, data } = useQuery(searchValue, getDataFromApi, { cacheTime: 1800000, staleTime: 1800000 });

    return (
        <>
            <div className="w-full max-w-full max-h-full overflow-auto scrollbar-hide md:scrollbar-default">
                <h2 className="dark:text-white text-black m-4 text-2xl md:text-3xl">
                    Search result for <span className="text-red-600">{searchValue}</span>
                </h2>
                <div className="dark:bg-black bg-white p-1.5 md:p-4 d-flex flex-col gap-6">
                    {
                        !isLoading && data ?
                            data.map((ele, i) => {
                                const {
                                    videoId, title, channelTitle, publishedTimeText, viewCount, thumbnail, description, lengthText, channelId, type,
                                } = ele;

                                if (thumbnail) {
                                    return (
                                        <SearchVdoCard key={i} videoId={videoId} title={title} channelTitle={channelTitle} time={publishedTimeText} views={viewCount} thumbnail={thumbnail} description={description} lengthText={lengthText} channelId={channelId} type={type}
                                        />
                                    );
                                }
                                return null;
                            })
                            :

                            <>
                                <div className='loader fixed w-full h-0.5 left-0 top-0 bg-red-600 z-[9999]' />
                                {array.map((ele, i) => <SearchVdoCardSkeleton key={i} />)}
                            </>

                    }
                </div>
            </div>
        </>
    );
};

export default SearchPage;
