import { useState } from "react";
import { Paper, Box, Typography, Avatar, Button, useTheme} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import axios from "axios";
import SelectCvModal from "../../Modal/SelectCvModal/SelectCvModal";

const OfferApplyCard = ({ item }) => {
    const [openModal, setOpenModal] = useState(false);
    const [cvFiles, setCvFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [availableToUpload, setAvailableToUpload] = useState(false);
    const { accessToken } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();

    const handleOpenModal = async () => {
        setOpenModal(true);

        if(!accessToken){
            navigate('/autenticacion');
            return; 
        }

        if(cvFiles.length !== 0){
            return
        }

        setIsLoading(true);
        try {
            const response = await axios.get(
                'api/users/get-cvs-info',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );

            if (response.data.length === 0) {
                setAvailableToUpload(true);
            } else {
                setCvFiles(response.data);
            }
        } catch (error) {
            console.error("Error al cargar los CVs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setAvailableToUpload(false);
    };

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: theme.palette.background.paper,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                    }}
                >
                    {item.emp_proyectos_id.emp_empresas_id.logo_link ? (
                        <Box
                            component="img"
                            src={item.emp_proyectos_id.emp_empresas_id.logo_link}
                            alt={item.emp_proyectos_id.emp_empresas_id.nombre}
                            sx={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                            }}
                        />
                    ) : (
                        <Avatar
                            sx={{
                                width: "50px",
                                height: "50px",
                                fontSize: "18px",
                                bgcolor: "primary.main",
                            }}
                        >
                            {item.emp_proyectos_id.emp_empresas_id.nombre
                                .charAt(0)
                                .toUpperCase()}
                        </Avatar>
                    )}
                    <Typography variant="h6">
                        {item.nombre} ({item.emp_proyectos_id.emp_empresas_id.nombre})
                    </Typography>
                </Box>
                <Typography variant="body1">{item.descripcion}</Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1,
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                px: 1,
                                borderRadius: 2,
                                bgcolor: "#D680F8",
                                color: "#7E10C7",
                            }}
                        >
                            {item.mst_ciudades_id.nombre}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                px: 1,
                                borderRadius: 2,
                                bgcolor: "#96FDD0",
                                color: "#16BF58",
                            }}
                        >
                            {item.mst_puestos_id.nombre}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                px: 1,
                                borderRadius: 2,
                                bgcolor: "#9A8AF7",
                                color: "#2520BD",
                            }}
                        >
                            {item.mst_emp_sector_id.descripcion}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            color: "black",
                            borderRadius: 2,
                            ":hover": {
                                bgcolor: "primary.light",
                            },
                        }}
                        onClick={handleOpenModal}
                    >
                        Aplicar
                    </Button>
                </Box>
            </Paper>

            <SelectCvModal 
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                cvFilesData={cvFiles}
                isLoading={isLoading}
                availableToUpload={availableToUpload}
                setAvailableToUpload={setAvailableToUpload}
            />
        </>
    );
};

export default OfferApplyCard;
