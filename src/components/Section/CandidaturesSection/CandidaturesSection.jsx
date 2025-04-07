import { useEffect, useState } from "react"; 
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
import ServerError from "../../Error/ServerError/ServerError";
import axios from "axios";
import CandidatureCard from "../../Card/CandidatureCard/CandidatureCard";

const CandidaturesSection = () => {
    const [candidaturesData, setcandidaturesData] = useState([]);
    const [existsAnError, setExistsAnError] = useState(false);
    const { accessToken } = useAuth();
    const { updateNotification, openNotification } = useNotification();

    useEffect(()=>{
        const fetchCandidatures = async () => {
            try {
                const response = await axios.get('/api/users/user-candidatures', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log(response.data);
                setcandidaturesData(response.data);
                setExistsAnError(false);
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
        <>
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
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
}

export default CandidaturesSection;