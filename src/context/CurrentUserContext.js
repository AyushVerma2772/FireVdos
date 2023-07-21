import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";

// Creating context
export const CurrentUserContext = createContext();

// CurrentUserContextProvider
export const CurrentUserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [currentUserData, setCurrentUserData] = useState([]);

    useEffect(() => {
        // Set up onAuthStateChanged to listen for authentication state changes
        const unsubAuth = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => {
            unsubAuth();
        };
    }, []);

    useEffect(() => {
        if (currentUser && currentUser.uid) {
            const docRef = doc(db, "users", currentUser.uid);
            const unsubData = onSnapshot(docRef, (doc) => {
                setCurrentUserData(doc.data());
            });

            return () => {
                unsubData();
            };
        }
    }, [currentUser]);

    return (
        <CurrentUserContext.Provider value={{ currentUser, currentUserData }}>
            {children}
        </CurrentUserContext.Provider>
    );
};
