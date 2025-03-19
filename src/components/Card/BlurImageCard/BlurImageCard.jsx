import {
    Box, 
    Typography,
    useTheme
} from "@mui/material";
import { useState } from "react";
import { useScreenWidth } from "../../../contexts/ScreenWidthContext/ScreenWidthContext";

const BlurImageCard = ({imgSrc, text, sx}) => {
    const [hover, setHover] = useState(false);
    const theme = useTheme();
    const { isMobile } = useScreenWidth();

    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            ...sx
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
                    backdropFilter: 'blur(3px)',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    ':hover':{
                        bgcolor: `${theme.palette.primary.main}66`
                    },
                    m:  { xs: 2, sm: 1,  md: 0 },
                }}
            >
                <Typography
                    variant={ isMobile ? "h4" : "h3"}
                    sx={{
                        color: theme.palette.background.paper,
                        ml: 4
                    }}
                >
                    {text}
                </Typography>
            </Box>
        </Box>
    );
};

export default BlurImageCard;