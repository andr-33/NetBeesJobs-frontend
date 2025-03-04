import { useState } from "react";
import { Paper, Box, Typography, Avatar, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import axios from "axios";
import SelectCvModal from "../../Modal/SelectCvModal/SelectCvModal";
import dayjs from "dayjs";

const OfferApplyCard = ({ item }) => {
    const [openModal, setOpenModal] = useState(false);
    const [cvFiles, setCvFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [availableToUpload, setAvailableToUpload] = useState(false);
    const { accessToken } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    console.log(item)
    const handleOpenModal = async () => {
        setOpenModal(true);

        if (!accessToken) {
            navigate('/autenticacion');
            return;
        }

        if (cvFiles.length !== 0) {
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

    const PostDate = ({createdAtDate}) => {
        const difference = dayjs().diff(dayjs(createdAtDate), 'days');
        return (
            <Typography 
                variant="caption"
                sx={{
                    color: theme.palette.secondary.main
                }}
            >
                Hace {difference} {difference === 1 ? 'día':'días'}
            </Typography>
        )
    };

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    mb: 1,
                    height: '430px',
                    maxHeight: '430px',
                    borderRadius: 2,
                    bgcolor: theme.palette.background.paper,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in',
                    ":hover": {
                        boxShadow: 6,
                        transform: 'translateY(-0.25rem)'
                    }
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%'
                }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 1,
                            mb: 0.5,
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
                                    border: `1px solid ${theme.palette.secondary.main}`,

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
                        <Typography 
                            variant="h6"
                            noWrap
                            sx={{
                                maxWidth: '60%',
                                overflow: 'hidden',
                                textOverflow: "ellipsis",   
                            }}
                        >
                            {item.emp_proyectos_id.emp_empresas_id.nombre}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexGrow: 1,
                            justifyContent: 'flex-end'
                        }}>
                            <PostDate createdAtDate={item.fecha_creacion} />
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexGrow: 1,
                        flexDirection: 'column',
                        overflowY: 'hidden',
                    }}>
                        <Box sx={{
                            width: '100%',
                            height: '200px',
                            borderRadius: 4,
                            overflow: 'hidden'
                        }}>
                            <Box 
                                component={'img'}
                                src={item.mst_emp_sector_id.link_imagen || "https://img.freepik.com/vector-gratis/fondo-hexagonal-degradado_23-2148956844.jpg?t=st=1741080551~exp=1741084151~hmac=9ee6a64e078fb23821181eef8afd6aee20b248d88f12f1abfcde3fc5308e89fb&w=1060"}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}
                            />
                        </Box>
                        <Typography 
                            variant="body1"
                            noWrap
                            sx={{
                                fontWeight: '600',
                                mt: 2,
                                mb: 0.5,
                                maxWidth: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {item.nombre}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis", 
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 3,
                            }}
                        >
                            {item.descripcion}
                        </Typography>
                    </Box>
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
                                    bgcolor: theme.palette.primary.light,
                                },
                            }}
                            onClick={handleOpenModal}
                        >
                            Aplicar
                        </Button>
                    </Box>
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
