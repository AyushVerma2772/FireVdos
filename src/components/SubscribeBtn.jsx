import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserDataContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { AuthContext } from '../context/AuthContext';
import { BiSolidBellRing } from "react-icons/bi";
import { toast } from 'react-toastify';

const SubscribeBtn = ({ channelId, channelName, channelImgUrl, subscriberCount }) => {

    const userData = useContext(UserDataContext);
    const currentUser = useContext(AuthContext);
    const obj = { channelId, channelName, channelImgUrl, subscriberCount };

    const checkObj = (array) => {
        return array.some(channel => (channel.channelId === obj.channelId))
    }


    const handelSubscribe = async () => {

        if (currentUser) {

            const docRef = doc(db, "users", currentUser?.uid);
            const { subscribedChannels } = userData;

            if (checkObj(subscribedChannels)) {
                const index = subscribedChannels.findIndex(channel => {
                    return channel.channelId === obj.channelId;
                });

                subscribedChannels.splice(index, 1);
            }

            else {
                subscribedChannels.unshift(obj);
            }

            await updateDoc(docRef, {
                subscribedChannels
            });

            // console.log(userData);

        }

        else toast.error('You are not login 😫', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored", });
    };


    return (
        <>
            <button className='dark:text-black hover:dark:bg-stone-200 font-medium hover:bg-[#272727] text-white bg-black dark:bg-white px-3 py-1.5 md:py-2 md:px-4 rounded-3xl text-sm md:text-base d-flex gap-3 ' onClick={handelSubscribe}>
                {
                    userData && userData.subscribedChannels && checkObj(userData.subscribedChannels) ?
                        <>
                            Subscribed
                            <BiSolidBellRing className='text-xl' />
                        </>

                        :

                        "Subscribe"
                }
            </button>
        </>
    )
}

export default SubscribeBtn