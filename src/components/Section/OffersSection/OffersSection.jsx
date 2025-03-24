import { 
    Typography, 
    Grid2 as Grid, 
    useTheme
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
import ServerError from "../../Error/ServerError/ServerError";
import axios from "axios";
import CreateOfferModal from "../../Modal/CreateOfferModal/CreateOfferModal";
import OfferCard from "../../Card/OfferCard/OfferCard";

const OfferSection = () => {
    const [offersData, setOffersData] = useState([]);
    const [existsAnError, setExistsAnError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openModalEditOffer, setOpenModalEditOffer] =  useState(false);
    const [editSettings, setEditSettings] = useState({
        active: false,
        offerToEdit: null
    });
    const theme = useTheme();
    const { accessToken } = useAuth();
    const { updateNotification, openNotification } = useNotification();

    const handleEditOffer = (offerId) => {
        setOpenModalEditOffer(true);
        setEditSettings({
            ...editSettings,
            active: true,
            offerToEdit: offerId
        });
    };
    
    useEffect(() => {
        const fetchAllCompanyOffers = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('/api/companies/all-company-offers', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log(response.data);
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
                            <OfferCard
                                name={offer.nombre}
                                project={offer.emp_proyectos_id.nombre}
                                handleEditOffer={()=> handleEditOffer(offer.emp_ofertas_id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
            <CreateOfferModal
                openModal={openModalEditOffer}
                handleCloseModal={()=> setOpenModalEditOffer(false)}
                editSettings={editSettings}
                setOffersData={setOffersData}
            />
        </>
    );
};

export default OfferSection;