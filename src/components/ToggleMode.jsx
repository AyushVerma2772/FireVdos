import React, { useState, useEffect } from 'react';
import { MdDarkMode, MdLightMode } from "react-icons/md";


const ToggleMode = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'dark'
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
            <button className='nav-link' onClick={toggleTheme} title={`${theme === 'light' ? 'Dark' : 'Light'} mode`}>
                {
                    theme === 'light' ? <MdDarkMode className='text-xl' /> : <MdLightMode className='text-xl' />
                }
                <span className='font-light text-base sm:text-xs' >{theme === 'light' ? 'Dark' : 'Light'} mode</span>
            </button>
        </>
    )
}

export default ToggleMode