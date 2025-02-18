import { useEffect, useState } from "react";
import { Box, Card, CardContent, CardHeader, IconButton, Typography, useTheme } from "@mui/material";
import { DeleteOutlineRounded, AddCircleRounded } from "@mui/icons-material";
import CreateOfferModal from "../../Modal/CreateOfferModal/CreateOfferModal";
import WarningModal from "../../Modal/WarningModal/WarningModal";

const ProjectCard = ({ id, name, description, startDate, state, handleDeleteProject  }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openWarningModal, setOpenWarningModal] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const theme = useTheme();
    const isActive = state === 1 ? true : false;

    const handleCloseWarningModal = () => {
        setOpenWarningModal(false);
        setConfirmation(false);
    };

    useEffect(() => {
        if(confirmation){
            handleDeleteProject(id);
            setOpenWarningModal(false);
            setConfirmation(false);
        }
    },[confirmation]);

    return (
        <Card
            elevation={3}
            sx={{
                width: '100%',
                height: '100%'
            }}
        >
            <CardHeader
                title={name}
                subheader={`Fecha de inicio: ${startDate}`}
                action={
                    <Box sx={{
                        display: 'flex',
                        flexDirection:'row',    
                        alignItems: 'center',
                    }}>
                        <IconButton 
                            sx={{p: 0.5}}
                            onClick={()=> setOpenWarningModal(true)}
                        >
                            <DeleteOutlineRounded />
                        </IconButton>
                        <Box sx={{
                            borderRadius: 2,
                            px: 1,
                            bgcolor: isActive ? theme.palette.success.light : theme.palette.error.light
                        }}>
                            <Typography variant="caption">
                                {isActive ? "Activo" : "No activo"}
                            </Typography>
                        </Box>
                    </Box>
                }
            />
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="body1" >{description}</Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}>
                        <IconButton
                            size="large" 
                            onClick={()=>setOpenModal(true)}
                        >
                            <AddCircleRounded sx={{
                                color: theme.palette.primary.main
                            }}/>
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
            <CreateOfferModal
                openModal={openModal}
                handleCloseModal={() => setOpenModal(false)}
            />
            <WarningModal
                openModal={openWarningModal}
                handleCloseModal={handleCloseWarningModal}
                setConfirmation={setConfirmation}
                warningQuestion={'¿Seguro que quieres eliminar este proyecto?'}
                message={'Se eliminaran todas las ofertas asociadas a este proyecto'}
            />
        </Card>
    );
};

export default ProjectCard;