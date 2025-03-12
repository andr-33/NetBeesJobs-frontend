import { useState, useEffect } from 'react';
import { Typography, Box, Button, Paper, Grid2 as Grid } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';
import { useNotification } from '../../../contexts/NotificationContext/NotificationContext';
import { CallRounded, PlaceRounded, DownloadRounded } from '@mui/icons-material';
import axios from 'axios';
import ServerError from '../../Error/ServerError/ServerError';
import DownloadButton from '../../Button/DowndloadButton/DownloadButton';

const Tag = ({ icon, text }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            alignItems: 'center',
            bgcolor: 'secondary.light',
            px: 1,
            py: 0.5,
            borderRadius: 3,
            width: 'fit-content'
        }}>
            {icon}
            <Typography color='secondary.dark' variant='caption'>
                {text}
            </Typography>
        </Box>
    );
};

const CandidatesSection = () => {
    const [candidatesData, setCandidatesData] = useState([]);
    const [existsAnError, setExistsAnError] = useState(false);
    const { accessToken } = useAuth();
    const { updateNotification, openNotification } = useNotification();

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get('/api/companies/all-company-candidates', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setCandidatesData(response.data);
                setExistsAnError(false);
            } catch (error) {
                console.error("Error: ", error.message);
                setExistsAnError(true);
                updateNotification('No pudimos obtener a tus candidatos', 'error');
                openNotification();
            }
        };
        fetchCandidates();
    }, []);

    return (
        <>
            <Typography
                variant="h5"
                sx={{
                    textDecoration: 'underline'
                }}
            >
                Tus candidatos
            </Typography>

            {existsAnError && (
                <ServerError
                    message="Ups... no hemos podido obtener tus candidatos"
                />
            )}

            {candidatesData.length > 0 && (
                <Grid container spacing={2} mt={2}>
                    {candidatesData.map(({ 
                        nb_usuarios_id : candidate, 
                        emp_ofertas_id : offer,
                        can_cv_id : cv
                    }, index) => (
                        <Grid key={index} size={{ lg: 3, sm: 12 }}>
                            <Paper 
                            key={index}
                            elevation={3}
                            sx={{
                                p: 2,
                                borderRadius: 2
                            }}
                        >
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    mb: 1
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '125px',
                                        height: '125px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        marginRight: '1rem'
                                    }}
                                >
                                    <Box
                                        component={'img'}
                                        src={candidate.foto_link || 'https://st2.depositphotos.com/11576988/43815/v/950/depositphotos_438158404-stock-illustration-cute-bee-character-cartoon-flying.jpg'}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    gap: 1
                                }}>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontWeight: 'bold',
                                            maxWidth:'100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {candidate.nombre} {candidate.primer_apellido}
                                    </Typography>
                                    <Tag
                                        icon={<PlaceRounded color='secondary' />}
                                        text={candidate.nombre_ciudad}
                                    />
                                    <Tag
                                        icon={<CallRounded color='secondary' />}
                                        text={candidate.telefono_movil}
                                    />
                                </Box>
                            </Box>
                            <Typography
                                variant='body2'
                                sx={{
                                    fontWeight: 'bold',
                                    mt: 2,
                                    mb: 1
                                }}
                            >
                                Oferta: <Typography variant='body2' component={'span'}>{offer.nombre}</Typography>
                            </Typography>
                            <DownloadButton 
                                text={'Descargar CV'}
                                fileName={cv.nombre}
                                fileUrl={cv.cv_link}
                            />
                        </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default CandidatesSection;