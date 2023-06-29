import React from 'react';
import { AiFillHome } from "react-icons/ai";
import {BiSolidLike} from 'react-icons/bi'
import { ImSwitch } from 'react-icons/im';
import { FaFire } from "react-icons/fa";
import ToggleMode from './ToggleMode';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

const Navbar = ({ showNav, setShowNav }) => {

    const handleSignOut = () => {
        signOut(auth);
    }

    return (
        <>
            <nav className={
                `absolute z-20 w-1/2 sm:w-auto flex flex-col h-full sm:sticky sm:left-0 dark:bg-black bg-white items-start sm:justify-start py-5 px-2 gap-5 sm:gap-2 ${showNav ? 'left-0' : 'left-[-100%]'}`
            } onClick={() => setShowNav(prev => !prev)} >

                <Link to='/' className='w-[90%] d-flex justify-start sm:flex-col gap-3 sm:gap-1 py-3 px-2.5 dark:hover:bg-dark-gray/50 hover:bg-gray-300/40 rounded-md sm:w-16' title='Home'>
                    <AiFillHome className='text-xl' />
                    <span className='font-light text-base sm:text-xs'>Home</span>
                </Link>

                <Link to='/trending' className='w-[90%] d-flex justify-start sm:flex-col gap-3 sm:gap-1 py-3 px-2.5 dark:hover:bg-dark-gray/50 hover:bg-gray-300/40 rounded-md sm:w-16' title='Trending'>
                    <FaFire className='text-xl' />
                    <span className='font-light text-base sm:text-xs' >Trending</span>
                </Link>

                <Link to='/like' className='w-[90%] d-flex justify-start sm:flex-col gap-3 sm:gap-1 py-3 px-2.5 dark:hover:bg-dark-gray/50 hover:bg-gray-300/40 rounded-md sm:w-16' title='Liked videos'>
                    <BiSolidLike className='text-xl' />
                    <span className='font-light text-base sm:text-xs' >Liked</span>
                </Link>

                <ToggleMode />

                <button className='w-[90%] d-flex justify-start sm:flex-col gap-3 sm:gap-1 py-3 px-2.5 dark:hover:bg-dark-gray/50 hover:bg-gray-300/40 rounded-md sm:w-16' onClick={handleSignOut} title='Logout'>
                    <ImSwitch className='text-xl' />
                    <span className='font-light text-base sm:text-xs'>Logout</span>
                </button>

            </nav>
        </>
    )
}

export default Navbar