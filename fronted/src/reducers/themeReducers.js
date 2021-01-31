import { UPDATE_THEME_COLORS } from "../constants/themeConstants";

export const themeReducer=(state={isDark:false},action)=>{
    switch (action.type) {
        case UPDATE_THEME_COLORS:
        localStorage.setItem('theme', JSON.stringify({isDark:action.payload}))

           return {isDark:action.payload} 
        default:
            return state;
    }
} 