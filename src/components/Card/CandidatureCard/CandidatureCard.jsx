import { Typography, Paper, IconButton, Box, useTheme, Grid2 as Grid, Chip, Divider } from "@mui/material";
import { DeleteOutlineRounded, EditOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PlaceIcon from '@mui/icons-material/Place';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WarningModal from "../../Modal/WarningModal/WarningModal";

const CandidatureCard = ({
    candidature,
    handleDeleteCandidature,
}) => {
    const [openWarningModal, setOpenWarningModal] = useState(false);
    const [confirmation, setConfirmation] = useState(false);

    const theme = useTheme();

    const handleCloseWarningModal = () => {
        setOpenWarningModal(false);
        setConfirmation(false);
    };

    const getDaysDifference = (dateString) => {
        const givenDate = new Date(dateString);
        const today = new Date();

        const differenceInTime = today.getTime() - givenDate.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

        return differenceInDays;
    };

    useEffect(() => {
        if (confirmation) {
            handleDeleteCandidature(candidature.can_cv_ofertas_id);
            setOpenWarningModal(false);
            setConfirmation(false);
        }
    }, [confirmation]);

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    p: 1
                }}
            >
                <Grid container
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 1,
                        pt: 1
                    }}
                >
                    <Grid>
                        <Chip
                            size="small"
                            variant="contained"
                            sx={{ mr: 2 }}
                            label={candidature.estado === 1 ? "Activo" : "No activo"}
                            color={candidature.estado === 1 ? "success" : "error"}
                        />
                        <Chip
                            icon={<AccountTreeIcon />}
                            size="small"
                            label={`Sector: ${candidature.emp_ofertas_id.mst_emp_sector_id.descripcion}`}
                        />
                    </Grid>
                    <Grid>
                        <IconButton
                            onClick={() => setOpenWarningModal(true)}
                            sx={{
                                ":hover": {
                                    color: theme.palette.error.main
                                }
                            }}
                        >
                            <DeleteOutlineRounded />
                        </IconButton>
                    </Grid>
                </Grid>

                <Box px={1}></Box>
                <Box p={1}>
                    <Typography
                        variant="body1"
                        sx={{
                            ml: 1
                        }}
                    >
                        {candidature.emp_ofertas_id.nombre}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#555", ml: 1 }}>
                        Empresa: {candidature.emp_ofertas_id.emp_proyectos_id.emp_empresas_id.nombre}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Box display="flex" alignItems="center" pl={1} mt={1}>
                        <CalendarTodayIcon sx={{ width: 14, color: "gray" }} />
                        <Typography variant="body2" sx={{ fontWeight: "600", ml: 1 }}>
                            Creado hace:
                            <Typography variant="body2" component="span" sx={{ fontWeight: "300", color: "#555" }}>
                                &nbsp;{getDaysDifference(candidature.fecha_creacion)} día/s
                            </Typography>
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" pl={1} mt={1}>
                        <PlaceIcon sx={{ width: 15, color: "gray" }} />
                        <Typography variant="body2" sx={{ fontWeight: "600", ml: 1 }}>
                            Lugar:
                            <Typography variant="body2" component="span" sx={{ fontWeight: "300", color: "#555" }}>
                                &nbsp;{candidature.emp_ofertas_id.mst_ciudades_id.nombre}
                            </Typography>
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <WarningModal
                openModal={openWarningModal}
                handleCloseModal={handleCloseWarningModal}
                setConfirmation={setConfirmation}
                warningQuestion={'¿Seguro que quieres dar de baja esta candidatura?'}
                message={'Se eliminará esta candidatura y no podrás recuperarla.'}
            />
        </>
    );
};

export default CandidatureCard;
