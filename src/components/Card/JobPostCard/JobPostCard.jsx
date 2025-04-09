import React from 'react';
import { Box, Typography, Button, Grid2 as Grid, Chip, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';




const JobPostCard = ({ imageUrl }) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                borderRadius: 5,
                boxShadow: 1,

            }}
        >
            <Grid container>
                <Grid size={12}>
                    <Box position="relative">
                        <Box position="relative">
                            <Box
                                component="img"
                                src={imageUrl}
                                alt="Latte Art"
                                sx={{
                                    width: '100%',
                                    height: 160,
                                    objectFit: 'cover',
                                    borderRadius: 5,
                                    mb: 2,
                                }}
                            />

                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    display: 'block',  
                                    gap: 1,
                                }}
                            >
                                <Chip label="Chip 1" size="small" color="primary" />
                                <Chip label="Chip 2" size="small" color="secondary" />
                            </Box>
                        </Box>


                        <Box
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                display: 'flex',
                                gap: 1,
                            }}
                        >
                            <Chip label="Chip 1" size="small" color="primary" />
                            <Chip label="Chip 2" size="small" color="secondary" />
                        </Box>
                    </Box>
                </Grid>
                <Grid size={12} sx={{px: 2, mb: 1}}>

                    <Typography variant="h6" color={theme.palette.primary.dark} sx={{ fontWeight: 'bold', mb: 1 }}>
                        €1.250 mensual
                    </Typography>

                </Grid>
                <Grid size={12} sx={{px: 2, mb: 1}}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: 'black' }} >
                        Desarrollador
                    </Typography>
                </Grid>
                <Grid size={12} sx={{px: 2, mb: 1}}>

                    <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 1 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </Typography>

                </Grid>
                <Grid size={12} sx={{px: 2, mb: 3}}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Se busca Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </Typography>
                </Grid>
                <Grid size={12} sx={{px: 2, mb: 1}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationOnIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="textSecondary">
                            Madrid
                        </Typography>
                    </Box>

                </Grid>
            </Grid>

        </Box>

    );
};

export default JobPostCard;