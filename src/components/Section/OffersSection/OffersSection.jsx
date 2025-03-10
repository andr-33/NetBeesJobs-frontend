import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
import ServerError from "../../Error/ServerError/ServerError";
import axios from "axios";

const OfferSection = () => {
    const [offersData, setOffersData] = useState([]);
    const [existsAnError, setExistsAnError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        </>
    );
};

export default OfferSection;