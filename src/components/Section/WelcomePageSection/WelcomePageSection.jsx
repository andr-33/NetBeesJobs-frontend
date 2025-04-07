import { Box } from '@mui/material';

const WelcomePageSection = ({children, sx}) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                ...sx
            }}
        >
            {children}
        </Box>
    );
};

export default WelcomePageSection;