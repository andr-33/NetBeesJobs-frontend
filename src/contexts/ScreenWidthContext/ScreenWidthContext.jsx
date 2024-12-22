import { createContext, useContext, useEffect, useState } from 'react';

const ScreenWidthContext = createContext();

const SCREENS = {
    mobile: 600,
    small: 960,
};

export const ScreenWidthProvider = ({ children }) => {
    const getScreenWidth = ()=>{
        const width = window.innerWidth;
        return {
            width,
            isMobile: width <= SCREENS.mobile,
            isSmall: width > SCREENS.mobile && width <= SCREENS.small,
            isLarge: width > SCREENS.small
        }
    };

    const [screenWidth, setScreenWidth] = useState(getScreenWidth());

    useEffect(()=>{
        const handleResize = () => {
            setScreenWidth(getScreenWidth());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }

    },[]);

    return(
        <ScreenWidthContext.Provider value={screenWidth}>
            {children}
        </ScreenWidthContext.Provider>
    );
};

export const useScreenWidth = () => {
    return useContext(ScreenWidthContext);
};