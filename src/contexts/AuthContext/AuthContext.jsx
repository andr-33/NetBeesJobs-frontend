import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [isInitialized, setIsInitialized] = useState(true);

    useEffect(()=>{
        const storedToken = sessionStorage.getItem('accessToken');

        if(storedToken){
            setAccessToken(storedToken);
        }
        setIsInitialized(false);
    },[]);

    const saveToken = (token) => {
        setAccessToken(token);
        sessionStorage.setItem('accessToken', token);
    };

    const removeToken = () => {
        setAccessToken(null);
        sessionStorage.removeItem('accessToken');
    };

    return(
        <AuthContext.Provider value={{accessToken, saveToken, removeToken, isInitialized}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);