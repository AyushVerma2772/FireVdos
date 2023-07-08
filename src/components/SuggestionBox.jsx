import React from 'react'
import { AiOutlineSearch } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'

const SuggestionBox = ({ suggestedData, setSearchValue, setIsFocused, setIsHover }) => {

    const navigate = useNavigate();

    return (
        <>
            <div className={`dark:bg-[#272727] bg-white z-[100] absolute top-10 right-[3%] sm:left-0 sm:w-[85%] w-[95vw] shadow rounded-md overflow-hidden`} onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>

                {
                    suggestedData.map((ele, i) => (
                        <div key={i} className='w-full hover:dark:bg-zinc-700/50 hover:bg-stone-200/80 d-flex gap-2 cursor-pointer p-2 md:gap-1 md:py-1' onMouseOver={() => setSearchValue(ele[0])} onClick={() => {
                            setIsFocused(false);
                            navigate(`/search/${ele[0]}`)
                        }}>
                            <AiOutlineSearch className='text-xl font-extralight' />
                            <h3 className='dot-text' >{ele[0]}</h3>
                        </div>
                    ))
                }

            </div>
        </>
    )
}

export default SuggestionBox