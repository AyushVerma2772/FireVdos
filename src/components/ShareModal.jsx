import React, { useState } from 'react';
import { AiFillLinkedin } from 'react-icons/ai';
import { BsFacebook, BsReddit, BsTwitter } from 'react-icons/bs';
import { IoLogoWhatsapp } from 'react-icons/io';
import { PiShareFatFill } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { toast } from 'react-toastify';

const ShareModal = ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentUrl = window.location.href;

    const handleOuterContainerClick = () => {
        setIsOpen(false);
    };


    return (
        <>
            <button className='dark:text-white bg-stone-200 hover:bg-stone-300/80 dark:bg-[#272727] dark:hover:bg-zinc-700/70 px-3 py-1 rounded text-base d-flex gap-2' onClick={() => setIsOpen(true)} title='Share' >Share <PiShareFatFill />
            </button>

            {isOpen && (
                /* outer container */
                <div className='w-screen inset-0 h-screen fixed top-0 left-0 bg-black/70 z-[999] d-flex justify-center' onClick={handleOuterContainerClick} >

                    {/* inner container */}
                    <div className='w-[90%] md:w-[40%] 2xl:w-[25%] p-3 bg-stone-200 dark:bg-[#272727] rounded-md flex flex-col' onClick={e => e.stopPropagation()} >
                        <div className="mb-3 w-full float-right">
                            <button className='w-full flex justify-end' onClick={() => setIsOpen(false)}><RxCross1 className='text-2xl' /></button>
                        </div>

                        <div className='w-full flex justify-between'>
                            <input type='text' readOnly={true} className='w-[80%] bg-white/75 border outline-none p-1 px-2 border-black dark:bg-black/60 dark:border-white' value={currentUrl} />
                            <button className='bg-purple-700 text-white px-3 py-1 rounded-md text-base d-flex gap-2' onClick={() => {
                                toast.success('Link copied 🤘🏻', { position: "top-center", autoClose: 1000, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: true, theme: "colored",}); navigator.clipboard.writeText(currentUrl)
                            }} >Copy</button>
                        </div>

                        <div className='mt-4 w-full d-flex justify-around'>
                            <a target='_blank' rel='noreferrer' href={`https://wa.me/?text=${currentUrl}`}>
                                <IoLogoWhatsapp className='text-3xl text-[#25D366]' />
                            </a>
                            <a target='_blank' rel='noreferrer' href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&quote=${title}`}>
                                <BsFacebook className='text-3xl text-[#4267B2]' />
                            </a>
                            <a target='_blank' rel='noreferrer' href={`https://twitter.com/intent/tweet?text=${title}&url=${currentUrl}`}>
                                <BsTwitter className='text-3xl text-[#1DA1F2]' />
                            </a>
                            <a target='_blank' rel='noreferrer' href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}>
                                <AiFillLinkedin className='text-3xl text-[#0077b5]' />
                            </a>
                            <a target='_blank' rel='noreferrer' href={`https://www.reddit.com/submit?url=${currentUrl}&title=${title}`}>
                                <BsReddit className='text-3xl text-[#ff4500]' />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShareModal;
