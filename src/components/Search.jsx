import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const searchText = e.target[0].value;

        if (searchText) {
            navigate(`/search/${searchText}`)
            e.target[0].value = "";
        }

        else {
            e.target[0].classList.toggle('invisible');
            e.target[1].classList.toggle('rounded-full');
        }
    }
    return (
        <form onSubmit={handleSearch} className="sm:w-[50%] w-[57%] d-flex h-9 rounded-3xl overflow-hidden">

            <input className='h-full dark:bg-stone-800/80 w-[82%] sm:w-[90%] focus:border focus:border-blue-700 outline-0 text-base py-1 px-3 sm:px-4 invisible sm:visible border-2 dark:border-0 border-r-0 dark:focus:border dark:focus:border-blue-700' type="search" name="" id="" placeholder='Search' />

            <button className='h-full d-flex justify-center w-[18%] sm:w-[10%] bg-gray-200/60 hover:bg-gray-300/40 dark:bg-stone-700 dark:hover:bg-stone-700 rounded-full sm:rounded-none border-2 dark:border-0 border-l-0' title='search' >
                <BsSearch className='text-lg sm:text-xl' />
            </button>

        </form>
    )
}

export default Search