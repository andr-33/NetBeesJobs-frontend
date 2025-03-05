import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, IconButton, Paper, Typography, Divider } from "@mui/material";
import { ContentCopyRounded } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { useScreenWidth } from "../contexts/ScreenWidthContext/ScreenWidthContext";
import LogoHeader from "../components/Header/LogoHeader/LogoHeader";
import SlideUpNotification from "../components/Notification/SlideUpNotification/SlideUpNotification";
import axios from "axios";

const OfferInfromationPage = () => {
    const [offerData, setOfferData] = useState();
    const [openNotification, setOpenNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationType, setNotificationType] = useState();
    const [existsAnError, setExistsAnError] = useState(false);
    const [callToAction, setCallToAction] = useState(true);
    const navigate = useNavigate();
    const { offerId } = useParams();
    const { accessToken } = useAuth();
    const { isMobile } = useScreenWidth();

    const handleCopyOfferUrl = async () => {
        const currentUrl = window.location.href;
        try{
            await navigator.clipboard.writeText(currentUrl);
            setNotificationMessage("URL copiada en el portapapeles!");
            setNotificationType('success');
            setOpenNotification(true);
        } catch (error) {
            setNotificationMessage("Ups! Algo salio mal al copiar la URL");
            setNotificationType('error');
            setOpenNotification(true);
        }
    };

    useEffect(()=>{
        if(accessToken){
            setCallToAction(false);
        }
    },[]);

    useEffect(()=>{
        const fetchOfferData = async() => {
            try{
                const response = await axios.get(`/api/companies/offer-information/${offerId}`);
                setOfferData(response.data[0]);
                setExistsAnError(false);
            } catch (error) {
                const { status } = error;
                if(status === 404) navigate('/pagina-no-encontrada');
                
                setExistsAnError(true);
                setNotificationMessage("Algo salió mal, vuelve a intentar...");
                setNotificationType("error");
                setOpenNotification(true);
            }
        };
        fetchOfferData();
    },[]);

    return(
        <Box>
            <LogoHeader
                href={'/pagina-principal'}
                callToAction={callToAction}
            >
                <IconButton onClick={handleCopyOfferUrl}>
                    <ContentCopyRounded />
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
                    <Typography variant="body1" sx={{fontWeight: '600'}}>Nombre del puesto:</Typography>
                    <Typography variant="body2">{offerData.nombre}</Typography>
                    <Typography variant="body1" sx={{fontWeight: '600'}}>Descripción:</Typography>
                    <Typography variant="body2">{offerData.descripcion}</Typography>
                    <Divider sx={{my: 1}}/>
                    <Typography variant="body1" sx={{fontWeight: '600'}}>
                        Ubicación: 
                        <Typography component={'span'}> {offerData.mst_ciudades_id.nombre}</Typography>
                    </Typography>
                    <Typography variant="body1" sx={{fontWeight: '600'}}>
                        Salario anual: 
                        <Typography component={'span'}> €{offerData.salario_anual}</Typography>
                    </Typography>
                </Paper>
            )}

            {existsAnError && (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Box 
                        component={'img'}
                        src="/images/illustrations/server-error.svg"
                        sx={{
                            width: isMobile ? 300 : 500,
                            height: 'auto'
                        }}
                    />
                    <Typography sx={{
                        mx: 2,
                        textAlign: 'center'
                    }}>
                        Algo salió mal al intentar obtener la información de esta oferta
                    </Typography>
                </Box>
            )}

            <SlideUpNotification 
                message={notificationMessage}
                type={notificationType}
                open={openNotification}
                handleClose={()=> setOpenNotification(false)}
            />
        </Box>
    );
};

export default OfferInfromationPage;