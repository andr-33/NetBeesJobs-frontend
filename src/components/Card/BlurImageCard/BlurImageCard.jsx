import {
    Box, 
    Typography,
    useTheme
} from "@mui/material";
import { useState } from "react";

const BlurImageCard = ({imgSrc, text}) => {
    const [hover, setHover] = useState(false);
    const theme = useTheme();
    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
        }}>
            <Box
                sx={{
                    position: 'absolute',
                    backgroundImage: `url(${imgSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    inset: 0,
                    transition: 'scale 0.3s ease',
                    scale: hover ? 1 : 1.2,
                }}
            />
            <Box
                component='div'
                onMouseEnter={()=>setHover(true)}
                onMouseLeave={()=>setHover(false)}
                sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    ':hover':{
                        bgcolor: `${theme.palette.primary.main}66`
                    },
                    m: 3,
                    borderRadius: 2
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        color: theme.palette.background.paper,
                        ml: 2
                    }}
                >
                    {text}
                </Typography>
            </Box>
        </Box>
    );
};

export default BlurImageCard;