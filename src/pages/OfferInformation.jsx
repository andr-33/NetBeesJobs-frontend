import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, IconButton, Paper, Typography, Divider, Button } from "@mui/material";
import { ShareRounded } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { NotificationProvider, useNotification } from "../contexts/NotificationContext/NotificationContext";
import LogoHeader from "../components/Header/LogoHeader/LogoHeader";
import SlideUpNotification from "../components/Notification/SlideUpNotification/SlideUpNotification";
import axios from "axios";
import ServerError from "../components/Error/ServerError/ServerError";
import ShareOfferModal from "../components/Modal/ShareOfferModal/ShareOfferModal";
import SelectCvModal from "../components/Modal/SelectCvModal/SelectCvModal";

const OfferInfromationPage = () => {
    const [offerData, setOfferData] = useState();
    const [openShareModal, setOpenShareModal] = useState(false);
    const [openCvModal, setOpenCvModal] = useState(false);
    const [availableToUpload, setAvailableToUpload] = useState(false);
    const [cvFiles, setCvFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [existsAnError, setExistsAnError] = useState(false);
    const [callToAction, setCallToAction] = useState(true);
    const navigate = useNavigate();
    const { offerId } = useParams();
    const { accessToken } = useAuth();
    const { notification, closeNotification, updateNotification, openNotification } = useNotification();

    const handleCloseModal = () => {
        setOpenCvModal(false);
        setAvailableToUpload(false);
    };

    useEffect(() => {
        if (accessToken) {
            setCallToAction(false);
        }
    }, []);

    useEffect(() => {
        const fetchOfferData = async () => {
            try {
                const response = await axios.get(`/api/companies/offer-information/${offerId}`);
                setOfferData(response.data[0]);
                setExistsAnError(false);
            } catch (error) {
                const { status } = error;
                if (status === 404) navigate('/pagina-no-encontrada');

                setExistsAnError(true);
                updateNotification("Algo salió mal al intentar obtener la información de esta oferta", 'error');
                openNotification();
            }
        };
        fetchOfferData();
    }, []);

    useEffect(() => {
        const fetchCvsData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    '/api/users/get-cvs-info',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }
                );

                if (response.data.length === 0) {
                    setAvailableToUpload(true);
                } else {
                    console.log(response.data)
                    setCvFiles(response.data);
                }
            } catch (error) {
                console.error("Error al cargar los CVs:", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (accessToken) fetchCvsData();
    }, [availableToUpload, openCvModal]);

    return (
        <Box sx={{
            position: 'relative',
            height: '100vh',
            overflow: 'hidden'
        }}>
            <LogoHeader
                href={'/pagina-principal'}
                callToAction={callToAction}
            >
                <IconButton onClick={() => setOpenShareModal(true)}>
                    <ShareRounded />
                </IconButton>
            </LogoHeader>
            {offerData && (
                <Paper
                    elevation={3}
                    sx={{
                        mx: 4,
                        p: 2,
                        borderRadius: 4,
                        overflowY: 'auto'
                    }}
                >
                    <Typography variant="body1" sx={{ fontWeight: '600' }}>Nombre del puesto:</Typography>
                    <Typography variant="body2">{offerData.nombre}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '600' }}>Descripción:</Typography>
                    <Typography variant="body2">{offerData.descripcion}</Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body1" sx={{ fontWeight: '600' }}>
                        Ubicación:
                        <Typography component={'span'}> {offerData.mst_ciudades_id.nombre}</Typography>
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: '600' }}>
                        Salario anual:
                        <Typography component={'span'}> €{offerData.salario_anual}</Typography>
                    </Typography>
                </Paper>
            )}

            {existsAnError && (
                <ServerError
                    message='Algo salió mal al intentar obtener la información de esta oferta'
                />
            )}

            <Box sx={{
                position: 'absolute',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                bottom: 0
            }}>
                {accessToken && (
                    <Button
                        variant="contained"
                        sx={{
                            mr: 4,
                            mb: 4
                        }}
                        onClick={() => setOpenCvModal(true)}
                    >
                        APLICAR
                    </Button>
                )}
            </Box>

            <ShareOfferModal
                openModal={openShareModal}
                handleCloseModal={() => setOpenShareModal(false)}
            />

            <SelectCvModal
                openModal={openCvModal}
                handleCloseModal={handleCloseModal}
                isLoading={isLoading}
                cvFilesData={cvFiles}
                availableToUpload={availableToUpload}
                setAvailableToUpload={setAvailableToUpload}
                offerId={offerId}
            />

            <SlideUpNotification
                message={notification.message}
                type={notification.type}
                open={notification.open}
                handleClose={closeNotification}
            />
        </Box>
    );
};

export default () => (
    <NotificationProvider>
        <OfferInfromationPage />
    </NotificationProvider>
);