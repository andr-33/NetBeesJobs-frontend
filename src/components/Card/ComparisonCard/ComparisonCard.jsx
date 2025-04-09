import { Box, Button, Grid2 as Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const ComparisonCards = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const FeatureItem = ({ hasFeature, text }) => (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            my: 1,
            color: hasFeature ? theme.palette.text.primary : theme.palette.grey[700]
        }}>
            {hasFeature ? (
                <CheckIcon sx={{ mr: 2 }} />
            ) : (
                <CloseIcon sx={{ mr: 2 }} />
            )}
            <Typography sx={{ fontSize: 15 }}>{text}</Typography>
        </Box>
    );

    const features = [
        "Resultados poco claros o poco confiables.",
        "Proceso largo y tedioso",
        "Interfaz complicada y difícil de usar.",
        "Sin soporte dedicado o personalizado."
    ];

    const netBeesFeatures = [
        "Proceso fácil y rápido",
        "Soporte personalizado",
        "Plataforma intuitiva",
        "Resultados garantizados"
    ];

    return (
        <Grid container  sx={{  alignItems: 'center' }}>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 5 }}>
                <Box sx={{
                    background: '#8d8d8d08',
                    border: `3px solid ${theme.palette.grey[400]}`,
                    borderRadius: 4,
                    p: 2,
                    scale : '0.95',
                }}>
                    <Typography sx={{
                        color: theme.palette.grey[500],
                        fontSize: 30,
                        fontWeight: 'bolder',
                        mb: 2
                    }}>
                        Otras Plataformas
                    </Typography>
                    {features.map((text, index) => (
                        <FeatureItem key={index} hasFeature={false} text={text} />
                    ))}
                </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 7 }}>
                <Box sx={{
                    background: 'rgba(255, 214, 10, 0.5)',
                    border: `3px solid ${theme.palette.primary.main}`,
                    borderRadius: 4,
                    p: 2,
                }}>
                    <Typography sx={{
                        color: theme.palette.primary.main,
                        fontSize: 40,
                        fontWeight: 'bolder',
                        mb: 2,
                        textShadow: `2px 2px 2px ${theme.palette.grey[900]}`
                    }}>
                        NetBees Jobs
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            py: 1.4,
                            backgroundColor: theme.palette.primary.main,
                            color: 'black',
                            fontSize: 15,
                            borderRadius: 5,
                            mb: 3,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark
                            }
                        }}
                        onClick={() => navigate('/perfil-empresa')}
                        fullWidth
                    >
                        Regístrate como empresa
                    </Button>
                    {netBeesFeatures.map((text, index) => (
                        <FeatureItem key={index} hasFeature={true} text={text} />
                    ))}
                </Box>
            </Grid>
        </Grid>
    );
};

export default ComparisonCards;