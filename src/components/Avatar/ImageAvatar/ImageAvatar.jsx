import { Avatar, useTheme } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiveRounded } from "@mui/icons-material";

const ImageAvatar = ({roleId}) => {
    const [imageUrl, setImageUrl] = useState(null);
    const theme = useTheme();
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
        <>
            {imageUrl ? (
                <Avatar 
                alt="Logo empresa"
                src={imageUrl}
                sx={{ 
                    width: 200, 
                    height: 200,
                    border: `1px solid ${theme.palette.grey[400]}` 
                }}
            />
            ):(
                <Avatar sx={{
                    width: 200,
                    height: 200,
                    bgcolor: theme.palette.primary.light,
                    border: `1px solid ${theme.palette.grey[400]}`
                }}>
                    <HiveRounded sx={{
                        color: theme.palette.primary.dark,
                        fontSize: 100
                    }}/>
                </Avatar>
            )}
        </>
    );
};

export default ImageAvatar;