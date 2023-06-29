import React, { useContext } from 'react';
import logo from '../images/fire-vods-logo.png';
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiVideoPlus } from 'react-icons/bi';
import Search from './Search';
import { AuthContext } from '../context/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, db, gProvider } from '../firebase-config';
import { AiOutlineMenu } from 'react-icons/ai';
import { CountryCodeContext } from '../context/countryCodeContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Header = ({ setShowNav }) => {

    const currentUser = useContext(AuthContext);
    const countryCode = useContext(CountryCodeContext);

    const handleGoogleSignIn = async () => {
        try {
            const res = await signInWithPopup(auth, gProvider);
            const user = res.user;
            const { uid, displayName, photoURL, email } = user;

            const docRef = doc(db, "users", uid);
            const docSnapshot = await getDoc(docRef);

            // only create doc when there is no doc with uid
            if (!docSnapshot.exists()) {
                await setDoc(docRef, {
                    uid,
                    displayName,
                    photoURL,
                    email,
                    likedVdos: [],
                })
            }
            else console.log("doc already exists")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header className='dark:bg-black bg-white w-full d-flex justify-between px-6 sticky top-0 z-10' >
            <div className="left flex gap-3">
                <button onClick={() => setShowNav(prev => !prev)} >
                    <AiOutlineMenu className='text-2xl sm:hidden' />
                </button>

                <a href="/" className='d-flex gap-2 w-max relative' title="FireVdos" >
                    <img className='w-9 sm:w-10' src={logo} alt="" />
                    <span className='hidden font-semibold sm:block sm:text-2xl'>FireVdos</span>
                    <span className='absolute text-xs text-dark-gray dark:text-light-gray font-medium left-[110%] sm:left-[105%] bottom-[55%]' >{countryCode}</span>
                </a>
            </div>

            <Search />

            <div className="right d-flex gap-4">
                <i className='hidden sm:block text-2xl cursor-pointer dark:hover:bg-dark-gray hover:bg-gray-300/40 rounded-full p-2' title='create' >{<BiVideoPlus />}</i>
                <i className='hidden sm:block text-2xl cursor-pointer dark:hover:bg-dark-gray hover:bg-gray-300/40 rounded-full p-2' title='notification' >{<IoMdNotificationsOutline />}</i>

                <button className='h-10 w-10 rounded-full' onClick={handleGoogleSignIn} title={currentUser ? currentUser.displayName : 'Sign in'} >
                    <img className='w-10 h-10 rounded-full' src={
                        currentUser ? currentUser.photoURL : 'https://static.vecteezy.com/system/resources/previews/008/506/404/original/contact-person-red-icon-free-png.png'
                    } alt="profile-img" referrerPolicy='no-referrer' />
                </button>
            </div>



        </header>
    )
}

export default Header