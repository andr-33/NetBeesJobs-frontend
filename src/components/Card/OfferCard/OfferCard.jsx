import {
    Typography,
    Paper,
    IconButton,
    Box,
    useTheme
} from "@mui/material";
import { DeleteOutlineRounded, EditOutlined } from "@mui/icons-material";
import WarningModal from "../../Modal/WarningModal/WarningModal";
import { useState, useEffect } from "react";

const OfferCard = ({
    id,
    name,
    project,
    handleDeleteOffer,
    handleEditOffer
}) => {
    const [openWarningModal, setOpenWarningModal] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const theme = useTheme();

    const handleCloseWarningModal = () => {
        setOpenWarningModal(false);
        setConfirmation(false);
    };

    useEffect(()=>{
        if(confirmation){
            handleDeleteOffer(id);
            setOpenWarningModal(false);
            setConfirmation(false);
        }
    },[confirmation]);

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    height: 150,
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '100%',
                    mt: 0.5
                }}>
                    <IconButton
                        onClick={()=> setOpenWarningModal(true)} 
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
                </Box>
                <Typography
                    variant="body1"
                    sx={{
                        ml: 1
                    }}
                >
                    {name}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: '600',
                        ml: 1
                    }}
                >
                    Proyecto:
                    <Typography
                        variant="body2"
                        component={'span'}
                    >
                        &nbsp;{project}
                    </Typography>
                </Typography>
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