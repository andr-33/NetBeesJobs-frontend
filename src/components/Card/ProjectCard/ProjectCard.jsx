import { useEffect, useState } from "react";
import { Box, IconButton, Button, Paper, Typography, useTheme } from "@mui/material";
import { DeleteOutlineRounded, AddCircleOutlineRounded, EditOutlined } from "@mui/icons-material";
import { useScreenWidth } from "../../../contexts/ScreenWidthContext/ScreenWidthContext";
import CreateOfferModal from "../../Modal/CreateOfferModal/CreateOfferModal";
import WarningModal from "../../Modal/WarningModal/WarningModal";
import SlideUpNotification from "../../Notification/SlideUpNotification/SlideUpNotification";

const TextDate = ({ text, date }) => {
    const theme = useTheme();
    return (
        <Typography
            variant="body2"
            sx={{
                color: theme.palette.secondary.main,
                ml: 0.75,
                fontSize: '14px',
                fontWeight: '600'
            }}
        >
            {text}
            <Typography
                component={'span'}
                sx={{
                    color: 'inherit',
                    fontSize: '14px',
                }}
            >
                {date}
            </Typography>
        </Typography>
    );
};

const ProjectCard = ({ id, name, description, startDate, endDate, state, handleDeleteProject }) => {
    const [openModalAddOffer, setOpenModalAddOffer] = useState(false);
    const [openWarningModal, setOpenWarningModal] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('success');
    const theme = useTheme();
    const isActive = state === 1 ? true : false;
    const { isMobile } = useScreenWidth();

    const handleCloseWarningModal = () => {
        setOpenWarningModal(false);
        setConfirmation(false);
    };

    useEffect(() => {
        if (confirmation) {
            handleDeleteProject(id);
            setOpenWarningModal(false);
            setConfirmation(false);
        }
    }, [confirmation]);

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    height: 300,
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1.5,
                    flexGrow: 1
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Box sx={{
                            borderRadius: 2,
                            px: 1,
                            bgcolor: isActive ? theme.palette.success.light : theme.palette.error.light
                        }}>
                            <Typography variant="caption">
                                {isActive ? "Activo" : "No activo"}
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                        }}>
                            <IconButton
                                sx={{
                                    p: 0.5,
                                    ":hover": {
                                        color: theme.palette.error.main
                                    }
                                }}
                                onClick={() => setOpenWarningModal(true)}
                            >
                                <DeleteOutlineRounded />
                            </IconButton>
                            <IconButton
                                sx={{
                                    p: 0.5,
                                    ":hover": {
                                        color: theme.palette.success.main
                                    }
                                }}
                            >
                                <EditOutlined />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h6">{name}</Typography>
                        <TextDate text={"Fecha de inicio: "} date={startDate} />
                        <TextDate text={"Fecha de fin: "} date={endDate} />
                    </Box>
                    <Typography sx={{
                        display: 'flex',
                        flexGrow: 1,
                        my: 1,
                        textAlign: 'justify'
                    }}>
                        {description}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>
                        <Button
                            variant="contained"
                            disabled={!isActive}
                            onClick={() => setOpenModalAddOffer(true)}
                            endIcon={
                                <AddCircleOutlineRounded/>
                            }
                        >
                            {isMobile ? '' : 'Crear oferta'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <CreateOfferModal
                openModal={openModalAddOffer}
                handleCloseModal={() => setOpenModalAddOffer(false)}
                proyectId={id}
                setNotification={setOpenNotification}
                setMessage={setNotificationMessage}
                setNotificationType={setNotificationType}
            />
            <WarningModal
                openModal={openWarningModal}
                handleCloseModal={handleCloseWarningModal}
                setConfirmation={setConfirmation}
                warningQuestion={'¿Seguro que quieres eliminar este proyecto?'}
                message={'Se eliminaran todas las ofertas asociadas a este proyecto'}
            />
            <SlideUpNotification
                open={openNotification}
                handleClose={() => setOpenNotification(false)}
                message={notificationMessage}
                type={notificationType}
            />
        </>
    );
};

export default ProjectCard;