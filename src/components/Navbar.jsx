import React, { useContext } from 'react';
import { AiFillHome } from "react-icons/ai";
import { BiSolidLike } from 'react-icons/bi'
import { ImSwitch, ImUsers } from 'react-icons/im';
import { MdHistory } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import ToggleMode from './ToggleMode';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { handleGoogleSignIn } from './Header';
import { toast } from 'react-toastify';
import { CurrentUserContext } from '../context/CurrentUserContext';

const Navbar = ({ showNav, setShowNav }) => {

    const handleSignOut = () => {
        signOut(auth);
        toast.success('Log out successful 🤘🏻 ', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored", });
    }

    const { currentUser } = useContext(CurrentUserContext);

    return (
        <>
            <nav className={`absolute z-[9] w-3/5 sm:w-auto flex flex-col h-full sm:sticky sm:left-0 dark:bg-black bg-white items-start sm:justify-start py-5 px-2 gap-3 sm:gap-2 md:gap-0 ${showNav ? 'left-0' : 'left-[-100%]'} overflow-auto scrollbar-hide`} onClick={() => setShowNav(prev => !prev)} >

                <Link to='/' className='nav-link' title='Home'>
                    <AiFillHome className='text-xl md:text-lg 2xl:text-2xl' />
                    <span className='font-light text-base sm:text-xs'>Home</span>
                </Link>

                <Link to='/trending' className='nav-link' title='Trending'>
                    <FaFire className='text-xl md:text-lg 2xl:text-2xl' />
                    <span className='font-light text-base sm:text-xs' >Trending</span>
                </Link>

                <Link to='/liked' className='nav-link' title='Liked videos'>
                    <BiSolidLike className='text-xl md:text-lg 2xl:text-2xl' />
                    <span className='font-light text-base sm:text-xs' >Liked</span>
                </Link>

                <Link to='/subscriptions' className='nav-link' title='Subscriptions'>
                    <ImUsers className='text-xl md:text-lg 2xl:text-2xl' />
                    <span className='font-light text-base sm:text-xs' >Subscriptions</span>
                </Link>

                <Link to='/history' className='nav-link' title='History'>
                    <MdHistory className='text-xl md:text-lg 2xl:text-2xl' />
                    <span className='font-light text-base sm:text-xs' >History</span>
                </Link>

                <ToggleMode />

                {
                    currentUser ?
                        <button className='nav-link' onClick={handleSignOut} title='Logout'>
                            <ImSwitch className='text-xl md:text-lg 2xl:text-2xl' />
                            <span className='font-light text-base sm:text-xs'>Log out</span>
                        </button>

                        :

                        <button className='nav-link' onClick={handleGoogleSignIn} title='Logout'>
                            <ImSwitch className='text-xl md:text-lg 2xl:text-2xl' />
                            <span className='font-light text-base sm:text-xs'>Login</span>
                        </button>

                }

                {/* <a href='https://www.ayushverma.live/' rel="noreferrer" target='_blank' className='nav-link' title='Ayush Verma'>
                    <BiCodeAlt className='text-2xl md:text-lg 2xl:text-2xl' />
                    <span className='font-light text-base sm:text-xs' >Ayush</span>
                </a> */}

            </nav>
        </>
    )
}

export default Navbar