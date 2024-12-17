import { Box } from '@mui/material';

const WelcomePageSection = ({children}) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                scrollSnapAlign: 'start',
                justifyContent: 'center',
                alignItems: 'center',
                overflow:'hidden',
                scrollSnapAlign: 'start'
            }}
        >
            {children}
        </Box>
    );
};

export default WelcomePageSection;