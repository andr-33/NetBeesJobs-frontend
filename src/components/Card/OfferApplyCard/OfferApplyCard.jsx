import React, { useState, useEffect } from "react";
import { Paper, Box, Typography, Avatar, Button, Modal, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const OfferApplyCard = ({ item }) => {
    const [openModal, setOpenModal] = useState(false);
    const [cvFiles, setCvFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleOpenModal = async () => {
        setOpenModal(true);
        setLoading(true);

        try {
            const response = await axios.get("/user/cv-files");
            setCvFiles(response.data); // Asume que los CVs vienen como un array de objetos con una propiedad `name`
        } catch (error) {
            console.error("Error al cargar los CVs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
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
                        //onClick={handleOpenModal}
                    >
                        Aplicar
                    </Button>
                </Box>
            </Paper>

            {/* Modal */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="cv-modal-title"
                aria-describedby="cv-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="cv-modal-title" variant="h6" sx={{ mb: 2 }}>
                        Selecciona tu CV
                    </Typography>
                    {loading ? (
                        <Typography>Cargando CVs...</Typography>
                    ) : cvFiles.length > 0 ? (
                        <List>
                            {cvFiles.map((cv, index) => (
                                <ListItem key={index} sx={{ py: 1 }}>
                                    <ListItemText primary={cv.name} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography>No se encontraron CVs disponibles.</Typography>
                    )}
                    <Button
                        variant="outlined"
                        sx={{ mt: 2 }}
                        onClick={handleCloseModal}
                    >
                        Cerrar
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default OfferApplyCard;