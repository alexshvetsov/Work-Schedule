import React, { useState, useEffect } from 'react'
import { UPDATE_THEME_COLORS } from '../constants/themeConstants'
import { useDispatch, useSelector } from 'react-redux';

const ThemeModeButton = () => {

    const dispatch = useDispatch()

    const theme = useSelector(state => state.theme);
    const { isDark } = theme;

    const toggleTheme = () => {
        dispatch({type:UPDATE_THEME_COLORS, payload:!isDark})
    }

    
    useEffect(() => {
    }, [dispatch, isDark])


    return (
        <div className='theme_toggle_container' onClick={toggleTheme}> 
            <i className='sun-icon fas fa-sun '></i>
            <i className='moon-icon fas fa-moon '></i>
            <div className={isDark ? 'theme_toggle_button toggle_theme_button' : 'theme_toggle_button'} ></div>
        </div>
    )
}

export default ThemeModeButton 
