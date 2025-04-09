import { Box } from '@mui/material';

const WelcomePageSection = ({ children, sx }) => {
    return (
        <Box my={6}>
            <Box
                sx={{
                    minHeight: '83vh',
                    display: 'flex',
                    borderRadius: 25,
                    alignItems: 'center',
                    ...sx
                }}
            >
                {children}
            </Box>

        </Box>
    );
};

export default WelcomePageSection;