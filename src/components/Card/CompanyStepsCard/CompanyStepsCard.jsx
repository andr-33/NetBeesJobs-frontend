import { Box, Typography, useTheme } from "@mui/material";


const CompanyStepsCard = ({ img, text, sx }) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                height: { xs: 200, sm: 200, md: 330, lg: 330 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 5,
                backgroundColor: '#efefef',

                p: 3,
                ...sx
            }}
        >

            <Box component='img' src={img} height={90} />
            <Typography
                sx={{
                    fontSize: 20,
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    mt: 3,
                    px: 2,
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export default CompanyStepsCard;