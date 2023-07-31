import React from 'react'
import { FaMicrophone } from 'react-icons/fa'

const ListeningModal = ({ searchValue, stopListening }) => {
    return (
        <div className='w-screen inset-0 h-screen fixed top-0 left-0 bg-black/70 z-[999] d-flex justify-center' onClick={stopListening} >

            {/* inner container */}
            <div className='w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] 2xl:w-[25%] p-3 py-5 bg-stone-200 dark:bg-[#272727] rounded-md d-flex flex-col justify-center' onClick={e => e.stopPropagation()} >
                <p className='text-lg md:text-xl opacity-80' >Listening...</p>

                <div className="mic z-0 relative w-20 h-20 md:w-24 md:h-24 m-12 md:m-16 d-flex justify-center rounded-full bg-red-600">
                    <FaMicrophone className='z-0 text-2xl md:text-3xl text-white' />
                </div>



                <p className='text-base md:text-lg h-6'>{searchValue}</p>
            </div>
        </div>
    )
}

export default ListeningModal