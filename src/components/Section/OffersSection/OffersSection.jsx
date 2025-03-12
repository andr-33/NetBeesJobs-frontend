import { 
    Typography, 
    Grid2 as Grid, 
    Paper,
    IconButton,
    Box,
    useTheme
} from "@mui/material";
import { DeleteOutlineRounded, EditOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
import ServerError from "../../Error/ServerError/ServerError";
import axios from "axios";

const OfferSection = () => {
    const [offersData, setOffersData] = useState([]);
    const [existsAnError, setExistsAnError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();
    const { accessToken } = useAuth();
    const { updateNotification, openNotification } = useNotification();
    
    useEffect(() => {
        const fetchAllCompanyOffers = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('/api/companies/all-company-offers', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setOffersData(response.data);
                setExistsAnError(false);
            } catch (error) {
                console.error("Error: ", error.message);
                setExistsAnError(true);
                updateNotification("No pudimos obtener tus ofertas", 'error');
                openNotification();
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllCompanyOffers();
    }, []);

    const formatDate = (dateISO) => {
        const newDate = new Date(dateISO);
        const opciones = {
            day: "numeric",
            month: "short",
            year: "numeric",
        };
        const formatter = new Intl.DateTimeFormat("es-ES", opciones);
        return formatter.format(newDate).replace(".", "");
    };

    return (
        <>
            <Typography
                variant="h5"
                sx={{
                    textDecoration: 'underline'
                }}
            >
                Tus ofertas
            </Typography>

            {existsAnError && (
                <ServerError
                    message={"Vaya... No pudimos obtener tus ofertas"}
                />
            )}

            {offersData.length > 0 && (
                <Grid container spacing={2} mt={2}>
                    {offersData.map((offer, index) => (
                        <Grid key={index} size={{ lg: 4, md: 6, sm: 12 }}>
                            <Paper
                                elevation={3}
                                sx={{
                                    height: 150,
                                    borderRadius: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'hidden',
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    width: '100%',
                                    mt: 0.5
                                }}>
                                    <IconButton sx={{
                                        ":hover":{
                                            color: theme.palette.error.main
                                        }
                                    }}>
                                        <DeleteOutlineRounded/>
                                    </IconButton>
                                    <IconButton sx={{
                                        ":hover":{
                                            color: theme.palette.success.main
                                        }
                                    }}>
                                        <EditOutlined />
                                    </IconButton>
                                </Box>
                                <Typography 
                                    variant="body1"
                                    sx={{
                                        ml: 1
                                    }}
                                >
                                    {offer.nombre}
                                </Typography>
                                <Typography 
                                    variant="body2"
                                    sx={{
                                        fontWeight: '600',
                                        ml: 1
                                    }}
                                >
                                    Proyecto: 
                                    <Typography 
                                        variant="body2"
                                        component={'span'}
                                    >
                                        &nbsp;{offer.emp_proyectos_id?.nombre}
                                    </Typography>
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default OfferSection;