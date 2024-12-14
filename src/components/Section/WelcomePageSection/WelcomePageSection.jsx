import { Box } from '@mui/material';

const WelcomePageSection = ({children}) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#e0f7fa',
                scrollSnapAlign: 'start',
            }}
        >
            {children}
        </Box>
    );
};

export default WelcomePageSection;