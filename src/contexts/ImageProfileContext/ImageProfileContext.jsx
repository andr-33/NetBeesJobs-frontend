import { createContext, useContext, useState } from "react";

const ImageProfileContext =  createContext();

export const ImageProfileProvider = ({ children }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return(
        <ImageProfileContext.Provider value={{selectedImage, setSelectedImage}}>
            {children}
        </ImageProfileContext.Provider>
    );
};

export const useImageProfile = () => useContext(ImageProfileContext);