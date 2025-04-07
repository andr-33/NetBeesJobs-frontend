import { Box, Typography, useTheme } from "@mui/material";


const CompanyStepsCard = ({ number, text, sx }) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                height: { xs: 100, sm: 150, md: 240, lg: 330 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 5,
                backgroundColor: '#efefef',
                boxShadow: '5px 5px 5px rgba(255, 214, 10, 0.45)',
                p: 3,
                ...sx
            }}
        >
            <Typography
                sx={{
                    fontSize: { xs: 30, sm: 30, md: 50, lg: 50 },
                    fontWeight: 'bold',
                    color: theme.palette.text.primary,
                    lineHeight: 1,
                }}
            >
                {number}
            </Typography>

            <Typography
                sx={{
                    fontSize: 20,
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    mt: 1,
                    px: 2,
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export default CompanyStepsCard;