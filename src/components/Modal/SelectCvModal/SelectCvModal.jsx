import {
    Modal,
    Box,
    Typography,
    List,
    Button,
    useTheme,
    IconButton
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
import { useScreenWidth } from "../../../contexts/ScreenWidthContext/ScreenWidthContext";
import FilePicker from "../../Picker/FilePicker/FilePicker";
import CvFileItem from "../../ListItem/CvFileItem/CvFileItem";
import axios from "axios";

const SelectCvModal = ({
    openModal,
    handleCloseModal,
    cvFilesData,
    isLoading,
    availableToUpload,
    setAvailableToUpload,
    offerId
}) => {
    const [file, setFile] = useState();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const theme = useTheme();
    const { accessToken } = useAuth();
    const { updateNotification, openNotification } = useNotification();
    const { isMobile } = useScreenWidth();

    const handleUploadFile = async () => {
        try {
                await axios.post('/api/users/upload-cv-file', {
                "name": file.file.name,
                "file": file.dataURL
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setAvailableToUpload(false);
            updateNotification('CV subido con exito!', 'success');
            openNotification();            
        } catch (error) {
            console.error("Error uploading file:", error);
            updateNotification('Uy... no se puedo subir el archivo', 'error');
            openNotification();
        }
    };

    const handleRegisterIntoOffer = async () => {
        const cvSelected = cvFilesData[selectedIndex];        
        try {
            const response = await axios.post('/api/users/register-into-offer', {
                "offerId": offerId,
                "cvId": cvSelected.can_cv_id
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            updateNotification(response.data.message, 'success');
            openNotification();
        } catch (error) {
            console.error("Error registering into offer:", error);
            updateNotification('No se pudo hacer el registro en la oferta', 'error');
            openNotification();
        } 
    };

    const formatDate = (dateISO) => {
        const newDate = new Date(dateISO);
        const opciones = {
            day: "numeric",
            month: "short",
            year: "numeric",
        };
        const formatter = new Intl.DateTimeFormat("es-ES", opciones);
        return formatter.format(newDate).replace(".", "");
    };

    return (
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
                    width: isMobile ? 300 : 700,
                    minHeight: 300,
                    bgcolor: theme.palette.background.paper,
                    px: 2,
                    pt: 1,
                    pb: 2,
                    borderRadius: 2,
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'end',
                }}>
                    <IconButton
                        size="small"
                        onClick={() => {
                            handleCloseModal();
                            setFile(null);
                        }}
                    >
                        <CloseRounded />
                    </IconButton>
                </Box>
                <Typography id="cv-modal-title" variant="h6" sx={{ mb: 2 }}>
                    Selecciona tu CV
                </Typography>

                {isLoading && (
                    <Typography>Cargando CVs...</Typography>
                )}

                {cvFilesData.length > 0 && !availableToUpload && (
                    <List sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}>
                        {cvFilesData.map((cv, index) => (
                            <CvFileItem
                                key={index}
                                fileName={cv.nombre}
                                uploadDate={formatDate(cv.fecha)}
                                isSelected={selectedIndex === index}
                                onSelect={() => setSelectedIndex(index)}
                            />
                        ))}
                    </List>
                )}

                {availableToUpload && (
                    <FilePicker
                        file={file}
                        setFile={setFile}
                    />
                )}

                <Box sx={{ mt: 2 }}>
                    {availableToUpload ? (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}>
                            <Button
                                variant="contained"
                                onClick={() => setAvailableToUpload(false)}
                                color="error"
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleUploadFile}
                                disabled={!file}
                            >
                                Subir este archivo
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%'
                        }}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleRegisterIntoOffer}
                            >
                                <Typography
                                    variant="button"
                                    color="white"
                                >
                                    Aplicar
                                </Typography>
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => setAvailableToUpload(true)}
                            >
                                Subir CV
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export default SelectCvModal;