import { useState, useEffect } from "react";
import { Modal, Typography, Box, IconButton, useTheme } from "@mui/material";
import { ContentCopyRounded, WhatsApp, LinkedIn } from "@mui/icons-material";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
import { useScreenWidth } from "../../../contexts/ScreenWidthContext/ScreenWidthContext";

const ShareOfferModal = ({ openModal, handleCloseModal }) => {
    const [currentUrl, setCurrentUrl] = useState(window.location.href);
    const theme = useTheme();
    const { openNotification, updateNotification } = useNotification();
    const { isMobile } = useScreenWidth();

    const handleCopyOfferUrl = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            updateNotification("URL copiada en el portapapeles!", 'success');
            openNotification();
        } catch (error) {
            updateNotification("No pudimos copiar la URL", 'error');
            openNotification();
        }
    };

    const handleShareWhatsApp = () => {
        const whatsappMessage = encodeURIComponent(`Mira esta oferta: ${currentUrl}`);
        const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleShareLinkedIn = () => {
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        window.open(linkedInUrl, '_blank');
    };

    useEffect(()=>{
        setCurrentUrl(window.location.href);
    },[]);

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
                    width: isMobile ? 300 : 600,
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
                        {currentUrl}
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