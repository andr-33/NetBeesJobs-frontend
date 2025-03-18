import React, { useState } from "react";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import { ImageProfileProvider } from "../contexts/ImageProfileContext/ImageProfileContext";
import { useParams } from "react-router-dom";
import {  NotificationProvider, useNotification } from "../contexts/NotificationContext/NotificationContext"; 
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ProfileCompanyForm from "../components/Form/ProfileCompanyForm/ProfileCompanyForm";
import ProfileUserForm from "../components/Form/ProfileUserForm/ProfileUserForm";
import PhotoPicker from "../components/Picker/PhotoPicker/PhotoPicker";
import SlideUpNotification from "../components/Notification/SlideUpNotification/SlideUpNotification";

const CrearPerfilPage = () => {
    const [isBoxVisible, setIsBoxVisible] = useState(true);
    const theme = useTheme();
    const { roleId } = useParams();
    const { notification, closeNotification } = useNotification();

    const handleSlideUp = () => {
        setIsBoxVisible(false);
    };

    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "100vh",
                    overflowY: 'scroll',
                    bgcolor: theme.palette.background.default
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        position: "absolute",
                        top: isBoxVisible ? "50%" : "-100%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        maxWidth: "600px",
                        bgcolor: theme.palette.background.paper,
                        borderRadius: 2,
                        padding: 3,
                        textAlign: "center",
                        transition: "top 0.8s ease",
                        zIndex: 1
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Antes de comenzar, nos gustaría conocer un poco más sobre ti
                    </Typography>
                    <Button
                        variant="contained"
                        endIcon={<ArrowUpwardIcon />}
                        onClick={handleSlideUp}
                        sx={{
                            marginTop: 3,
                            bgcolor: theme.palette.primary.main,
                            "&:hover": { bgcolor: theme.palette.primary.light },
                        }}
                    >
                        De acuerdo
                    </Button>
                </Paper>

                <Box
                    sx={{
                        position: "absolute",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'auto',
                        width: '100%',
                        opacity: isBoxVisible ? 0 : 1,
                        transition: "opacity 0.8s ease",
                    }}
                >
                    <Paper
                        sx={{
                            width: "400px",
                            padding: "32px",
                            borderRadius: "8px",
                            bgcolor: theme.palette.background.paper,
                            my: 2
                        }}
                        elevation={3}
                    >
                        <PhotoPicker />
                        <Box>
                            {roleId === '2' ? (
                                <ProfileCompanyForm />
                            ) : (
                                <ProfileUserForm />
                            )}
                        </Box>
                    </Paper>
                </Box>
            </Box>
            <SlideUpNotification 
                message={notification.message}
                type={notification.type}
                open={notification.open}
                handleClose={closeNotification}
            />
        </>
    );
};

export default () => (
    <NotificationProvider>
        <ImageProfileProvider>
            <CrearPerfilPage />
        </ImageProfileProvider>
    </NotificationProvider>
);
