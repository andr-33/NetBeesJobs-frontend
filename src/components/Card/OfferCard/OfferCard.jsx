import {
    Typography,
    Paper,
    IconButton,
    Box,
    useTheme,
    Grid2 as Grid,
    Chip,
    Divider
} from "@mui/material";
import { DeleteOutlineRounded, EditOutlined, PlaceOutlined } from "@mui/icons-material";
import WarningModal from "../../Modal/WarningModal/WarningModal";
import { useState, useEffect } from "react";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaidIcon from '@mui/icons-material/Paid';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import PlaceIcon from '@mui/icons-material/Place';

const OfferCard = ({
    id,
    name,
    project,
    handleDeleteOffer,
    state,
    salary,
    workday,
    city,
    sectorName,
    createdDate,
    handleEditOffer
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
            handleDeleteOffer(id);
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
                            label={state === 1 ? "Activo" : "No activo"}
                            color={state === 1 ? "success" : "error"}
                        />
                        <Chip
                            icon={<AccountTreeIcon />}
                            size="small"
                            label={`Sector: ${sectorName}`}

                        />

                    </Grid>
                    <Grid >
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
                        <IconButton
                            onClick={handleEditOffer}
                            sx={{
                                ":hover": {
                                    color: theme.palette.success.main
                                }
                            }}
                        >
                            <EditOutlined />
                        </IconButton>
                    </Grid>

                </Grid>
                <Box px={1}>

                </Box>
                <Box p={1}>
                    <Typography
                        variant="body1"
                        sx={{
                            ml: 1
                        }}
                    >
                        {name}
                    </Typography>
                    <Divider sx={{my:1}}/>
                    <Box display="flex" alignItems="center" pl={1} mt={1}>
                        <CalendarTodayIcon sx={{ width: 14, color: "gray" }} />
                        <Typography variant="body2" sx={{ fontWeight: "600", ml: 1 }}>
                            Creado hace:
                            <Typography variant="body2" component="span" sx={{ fontWeight: "300", color: "#555" }}>
                                &nbsp;{getDaysDifference(createdDate)} día/s
                            </Typography>
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" pl={1} mt={1}>
                        <WorkHistoryIcon sx={{ width: 15, color: "gray" }} />
                        <Typography variant="body2" sx={{ fontWeight: "600", ml: 1 }}>
                            Jornada: 
                            <Typography variant="body2" component="span" sx={{ fontWeight: "300", color: "#555" }}>
                            &nbsp;{workday} 
                            </Typography>
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" pl={1} mt={1}>
                        <PlaceIcon sx={{ width: 15, color: "gray" }} />
                        <Typography variant="body2" sx={{ fontWeight: "600", ml: 1 }}>
                            Lugar
                            <Typography variant="body2" component="span" sx={{ fontWeight: "300", color: "#555" }}>
                            &nbsp;{city} 
                            </Typography>
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" pl={1} mt={1}>
                        <PaidIcon sx={{ width: 15, color: "gray" }} />
                        <Typography variant="body2" sx={{ fontWeight: "600", ml: 1 }}>
                            Salario
                            <Typography variant="body2" component="span" sx={{ fontWeight: "300", color: "#555" }}>
                            &nbsp;{salary} €
                            </Typography>
                        </Typography>
                    </Box>
                         

                </Box>

            </Paper>

            <WarningModal
                openModal={openWarningModal}
                handleCloseModal={handleCloseWarningModal}
                setConfirmation={setConfirmation}
                warningQuestion={'¿Seguro que quieres eliminar esta oferta?'}
                message={'Se eliminaran todas las candidaturas asociadas a esta oferta'}
            />
        </>
    );
}

export default OfferCard;