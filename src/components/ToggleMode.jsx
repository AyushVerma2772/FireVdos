import React, { useState, useEffect } from 'react';
import { MdDarkMode, MdLightMode } from "react-icons/md";


const ToggleMode = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    )

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }
    return (
        <>
            <button className='w-[90%] d-flex justify-start sm:flex-col gap-3 sm:gap-1 py-3 px-2.5 dark:hover:bg-dark-gray/50 hover:bg-gray-300/40 rounded-md sm:w-16' onClick={toggleTheme} title={`${theme === 'light' ? 'Dark' : 'Light'} mode`}>
                {
                    theme === 'light' ? <MdDarkMode /> : <MdLightMode />
                }
                <span className='font-light text-base sm:text-xs' >{theme === 'light' ? 'Dark' : 'Light'} mode</span>
            </button>
        </>
    )
}

export default ToggleMode