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
        }}>
            <Box
                component={'img'}
                src="/images/illustrations/server-error.svg"
                sx={{
                    width: isMobile ? 300 : 500,
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