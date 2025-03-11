import { Modal, Typography, Box, IconButton, useTheme } from "@mui/material";
import { ContentCopyRounded, WhatsApp, LinkedIn } from "@mui/icons-material";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";

const CURRENT_URL = window.location.href;

const ShareOfferModal = ({ openModal, handleCloseModal }) => {
    const theme = useTheme();
    const { openNotification, updateNotification } = useNotification();

    const handleCopyOfferUrl = async () => {
        try {
            await navigator.clipboard.writeText(CURRENT_URL);
            updateNotification("URL copiada en el portapapeles!", 'success');
            openNotification();
        } catch (error) {
            updateNotification("No pudimos copiar la URL", 'error');
            openNotification();
        }
    };

    const handleShareWhatsApp = () => {
        const whatsappMessage = encodeURIComponent(`Mira esta oferta: ${CURRENT_URL}`);
        const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleShareLinkedIn = () => {
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(CURRENT_URL)}`;
        window.open(linkedInUrl, '_blank');
    };

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    bgcolor: theme.palette.background.paper,
                    p: 2, 
                    borderRadius: 3,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Typography 
                        sx={{ 
                            wordBreak: 'break-all',
                            textAlign: 'center',
                            bgcolor: theme.palette.secondary.light,
                            p:1,
                            borderRadius: 3
                        }}
                    >
                        {CURRENT_URL}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2
                        }}
                    >
                        <IconButton 
                            onClick={handleCopyOfferUrl}
                            title="Copiar URL"
                        >
                            <ContentCopyRounded />
                        </IconButton>
                        <IconButton 
                            onClick={handleShareWhatsApp}
                            title="Compartir en WhatsApp"
                            sx={{ color: '#25D366' }}
                        >
                            <WhatsApp />
                        </IconButton>
                        <IconButton 
                            onClick={handleShareLinkedIn}
                            title="Compartir en LinkedIn"
                            sx={{ color: '#0A66C2' }}
                        >
                            <LinkedIn />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default ShareOfferModal;