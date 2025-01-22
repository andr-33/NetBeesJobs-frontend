import { Box } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const ImageAvatar = () => {
    const [imageUrl, setImageUrl] = useState('');
    const { accessToken } = useAuth();

    useEffect(() => {
        const fetchImage = async () => {
            const response = await axios.get('/api/master/get-image', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(response.data.imageUrl);
            setImageUrl(response.data.imageUrl);
        }

        fetchImage();
    },[]);


    return(
        <Box 
            component='img' 
            src={imageUrl} 
            sx={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
            }}
        />
    );
};

export default ImageAvatar;