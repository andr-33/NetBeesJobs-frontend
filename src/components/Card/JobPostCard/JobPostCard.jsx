import React from 'react';
import { Box, Typography, Button, Grid2 as Grid, Chip, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';




const JobPostCard = ({ imageUrl, salary, city, title, description, sector }) => {
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
                                <Chip label={sector} size="small" color="primary" />
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
                            <Chip label={sector} size="small" color="primary"  />
                        </Box>
                    </Box>
                </Grid>
                <Grid size={12} sx={{ px: 2, mb: 1 }}>

                    <Typography variant="h6" color={theme.palette.primary.dark} sx={{ fontWeight: 'bold', mb: 1 }}>
                        € {salary} anuales
                    </Typography>

                </Grid>
                <Grid size={12} sx={{ px: 2, mb: 1 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            color: 'black',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2, 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',  
                            height: '2.7em', 
                        }}
                    >
                        {title}
                    </Typography>
                </Grid>


                <Grid size={12} sx={{ px: 2, mb: 1 }}>
                    <Typography
                        vvariant="subtitle1" 
                        color="textSecondary" 
           
                        sx={{
                
                            mb: 1,
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,  
                            overflow: 'hidden',  
                            textOverflow: 'ellipsis',  
                            height: '4.7em', 
                        }}
                    >
                        {description}
                    </Typography>
                </Grid>

                <Grid size={12} sx={{ px: 2, mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationOnIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="textSecondary">
                            {city}
                        </Typography>
                    </Box>

                </Grid>
            </Grid>

        </Box>

    );
};

export default JobPostCard;