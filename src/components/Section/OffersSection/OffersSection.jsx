import { 
    Typography, 
    Grid2 as Grid, 
    Box
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
import ServerError from "../../Error/ServerError/ServerError";
import axios from "axios";
import CreateOfferModal from "../../Modal/CreateOfferModal/CreateOfferModal";
import OfferCard from "../../Card/OfferCard/OfferCard";
import DataNullError from "../../Error/DataNullError/DataNullError";
import CardsSkeleton from "../../Skeleton/CardsSkeleton/CardsSkeleton";

const OfferSection = () => {
    const [offersData, setOffersData] = useState([]);
    const [existsAnError, setExistsAnError] = useState(false);
    const [isDataNull, setIsDataNull] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openModalEditOffer, setOpenModalEditOffer] =  useState(false);
    const [editSettings, setEditSettings] = useState({
        active: false,
        offerToEdit: null
    });

    const { accessToken } = useAuth();
    const { updateNotification, openNotification } = useNotification();

    const handleDeleteOffer = async (offerId) => {
        try{
            await axios.delete(`/api/companies/delete-offer/${offerId}`);
            setOffersData(offersData.filter(offer => offer.emp_ofertas_id !== offerId));
            updateNotification("Oferta eliminada con exito", "success");
            openNotification();
        } catch (error) {
            console.error("Error: ", error);
            updateNotification("No pudimos eliminar esta oferta", "error");
            openNotification();
        }
    };

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
                setOffersData(response.data);
                setExistsAnError(false);
                if (response.data.length === 0) {
                    setIsDataNull(true);
                }
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

    return (
        <Box sx={{
            height: '100%',
        }}>
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

            {isDataNull && !existsAnError && (
                <DataNullError
                    message={"No tienes ofertas en este momento"}
                />
            )}

            {isLoading && (
                <CardsSkeleton 
                    length={4}
                    height={200}
                    size={{ lg: 6, md: 6, sm: 12 }}
                />
            )}

            {offersData.length > 0 && (
                <Grid container spacing={2} mt={2}>
                    {offersData.map((offer, index) => (
                        <Grid key={index} size={{ lg: 6, md: 6, sm: 12 }}>
                            <OfferCard
                                id={offer.emp_ofertas_id}
                                name={offer.nombre}
                                state={offer.estado}
                                city={offer.mst_ciudades_id.nombre}
                                createdDate={offer.fecha_creacion}
                                workday={offer.mst_jornada_id === 1 ? "Completa" : offer.mst_jornada_id === 2 ? "Parcial" : "No especificada"}
                                sectorName={offer.mst_emp_sector_id.descripcion}
                                salary={offer.salario_anual}
                                project={offer.emp_proyectos_id.nombre}
                                handleDeleteOffer={handleDeleteOffer}
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
        </Box>
    );
};

export default OfferSection;