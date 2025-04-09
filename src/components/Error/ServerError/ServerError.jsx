import { Box, Typography } from "@mui/material";
import { useScreenWidth } from "../../../contexts/ScreenWidthContext/ScreenWidthContext";

const ServerError = ({ message }) => {
    const { isMobile } = useScreenWidth();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100%'
        }}>
            <Box
                component={'img'}
                src="/images/server_error.webp"
                sx={{
                    width: isMobile ? 180 : 300,
                    height: 'auto'
                }}
            />
            <Typography 
                variant="body1"
                sx={{
                    mx: 2,
                    textAlign: 'center'
                }}
            >
                {message}
            </Typography>
        </Box>
    );
};

export default ServerError;