import React from 'react';
import { AiFillHome } from "react-icons/ai";
import {BiSolidLike, BiCodeAlt} from 'react-icons/bi'
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

                <Link to='/' className='nav-link' title='Home'>
                    <AiFillHome className='text-xl' />
                    <span className='font-light text-base sm:text-xs'>Home</span>
                </Link>

                <Link to='/trending' className='nav-link' title='Trending'>
                    <FaFire className='text-xl' />
                    <span className='font-light text-base sm:text-xs' >Trending</span>
                </Link>

                <Link to='/liked' className='nav-link' title='Liked videos'>
                    <BiSolidLike className='text-xl' />
                    <span className='font-light text-base sm:text-xs' >Liked</span>
                </Link>

                <ToggleMode />

                <button className='nav-link' onClick={handleSignOut} title='Logout'>
                    <ImSwitch className='text-xl' />
                    <span className='font-light text-base sm:text-xs'>Logout</span>
                </button>

                <a href='https://www.ayushverma.live/' rel="noreferrer" target='_blank' className='nav-link' title='Ayush Verma'>
                    <BiCodeAlt className='text-xl' />
                    <span className='font-light text-base sm:text-xs' >Ayush</span>
                </a>

            </nav>
        </>
    )
}

export default Navbar