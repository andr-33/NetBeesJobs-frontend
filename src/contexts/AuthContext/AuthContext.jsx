import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(()=>{
        const storedToken = sessionStorage.getItem('accessToken');

        if(storedToken){
            setAccessToken(storedToken);
        }
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
        <AuthContext.Provider value={{accessToken, saveToken, removeToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);