import { useEffect, useState } from "react"; 
import { Grid2 as Grid, Typography, Box } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
import ServerError from "../../Error/ServerError/ServerError";
import axios from "axios";
import CandidatureCard from "../../Card/CandidatureCard/CandidatureCard";
import DataNullError from "../../Error/DataNullError/DataNullError";

const CandidaturesSection = () => {
    const [candidaturesData, setCandidaturesData] = useState([]);
    const [existsAnError, setExistsAnError] = useState(false);
    const [isDataNull, setIsDataNull] = useState(false);
    const { accessToken } = useAuth();
    const { updateNotification, openNotification } = useNotification();

    const handleDeleteCandidature = async (candidatureId) => {
        try {
            await axios.delete(`/api/users/delete-candidature/${candidatureId}`);
            setCandidaturesData(candidaturesData.filter(candidature => candidature.can_cv_ofertas_id !== candidatureId));
            updateNotification("Candidatura eliminada con exito", "success");
            openNotification();
        } catch (error) {
            console.error("Error: ", error);
            updateNotification("No pudimos eliminar esta candidatura", "error");
            openNotification();
        }
    };

    useEffect(()=>{
        const fetchCandidatures = async () => {
            try {
                const response = await axios.get('/api/users/user-candidatures', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setCandidaturesData(response.data);
                setExistsAnError(false);
                if(response.data.length === 0) {
                    setIsDataNull(true);
                }
            } catch (error) {
                console.error('Error fetching candidatures:', error.message);
                setExistsAnError(true);
                updateNotification('No pudimos obtener tus candidaturas', 'error');
                openNotification();
            }
        };
        fetchCandidatures();
    },[]);

    return(
        <Box sx={{
            height: '100%',
        }}>
            <Typography
                variant="h5"
                sx={{
                    textDecoration: 'underline',
                }}
            >
                Tus candidaturas: 
            </Typography>

            {existsAnError && (
                <ServerError
                    message="Vaya... No pudimos obtener tus candidaturas"
                />
            )}

            {isDataNull && !existsAnError && (
                <DataNullError 
                    message="Aún no tienes candidaturas registradas"
                />
            )}

            {candidaturesData.length > 0 && (
                <Grid 
                    container 
                    spacing={2}
                    mt={2}
                >
                    {candidaturesData.map((candidature, index) => (
                        <Grid key={index} size={{ lg: 4, md: 6, sm: 12 }}>
                            <CandidatureCard 
                                candidature={candidature}
                                handleDeleteCandidature={handleDeleteCandidature}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default CandidaturesSection;