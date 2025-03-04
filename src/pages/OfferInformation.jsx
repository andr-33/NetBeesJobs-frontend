import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, IconButton, Paper, Typography, Divider,useTheme } from "@mui/material";
import { ContentCopyRounded } from "@mui/icons-material";
import LogoHeader from "../components/Header/LogoHeader/LogoHeader";
import SlideUpNotification from "../components/Notification/SlideUpNotification/SlideUpNotification";
import axios from "axios";

const OfferInfromationPage = () => {
    const [offerData, setOfferData] = useState();
    const [openNotification, setOpenNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const theme = useTheme();
    const {offerId} = useParams();

    const handleCopyOfferUrl = async () => {
        const currentUrl = window.location.href;
        try{
            await navigator.clipboard.writeText(currentUrl);
            setNotificationMessage("URL copiada en el portapapeles!");
            setOpenNotification(true);
        } catch (error) {
            setNotificationMessage("Ups! Algo salio mal al copiar la URL");
            setOpenNotification(true);
        }
    };

    useEffect(()=>{
        try{
            const fetchOfferData = async() => {
                const response = await axios.get(`/api/companies/offer-information/${offerId}`);
                console.log(response.data);
                setOfferData(response.data);
            };
            fetchOfferData();
        } catch (error) {
            console.error(error.message)
        }
    },[]);

    return(
        <Box>
            <LogoHeader
                href={'/pagina-principal'}
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

            <SlideUpNotification 
                message={notificationMessage}
                type="success"
                open={openNotification}
                handleClose={()=> setOpenNotification(false)}
            />
        </Box>
    );
};

export default OfferInfromationPage;