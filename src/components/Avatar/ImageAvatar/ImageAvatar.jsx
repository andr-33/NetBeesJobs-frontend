import { Box } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const ImageAvatar = ({roleId}) => {
    const [imageUrl, setImageUrl] = useState('');
    const { accessToken } = useAuth();
    const route = roleId === 2 ? '/api/companies/get-logo-image' : '/api/users/'

    useEffect(() => {
        const fetchImage = async () => {
            const response = await axios.get(route, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setImageUrl(response.data.imgUrl);
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