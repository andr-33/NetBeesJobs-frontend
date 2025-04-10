import { useEffect, useState } from "react";
import { Box, IconButton, Skeleton, Typography, useTheme } from "@mui/material";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { NotificationProvider, useNotification } from "../contexts/NotificationContext/NotificationContext";
import { EditRounded } from "@mui/icons-material";
import axios from "axios";
import SlideUpNotification from "../components/Notification/SlideUpNotification/SlideUpNotification";
import UserSideBar from "../components/Sidebar/UserSidebar/UserSidebar";
import ImageAvatar from "../components/Avatar/ImageAvatar/ImageAvatar";
import CandidaturesSection from "../components/Section/CandidaturesSection/CandidaturesSection";
import EditUserProfileModal from "../components/Modal/EditUserProfileModal/EditUserProfileModal";

const InformationLoadingSkeletons = () => {
    return (
        <>
            {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                    key={index}
                    variant="text"
                    sx={{
                        fontSize: index === 0 ? '1.25rem' : '1rem',
                        width: index === 0 ? '200px' : '150px'
                    }}
                />
            ))}
        </>
    );
};

const UserProfilePage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [activeSection, setActiveSection] = useState('registers');
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
    const theme = useTheme();
    const { accessToken } = useAuth();
    const { notification, closeNotification, updateNotification, openNotification } = useNotification();

    const sectionComponents = {
        registers: <CandidaturesSection />,
    };

    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const response = await axios.get('/api/users/user-information', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching candidatutres data: ', error.message);
                updateNotification("No pudimos obtener tu información", 'error');
                openNotification();
            }
        };
        fetchUserInformation();
    }, []);

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.background.default,
                position: 'relative',
                pl: '50px',
                overflow: 'hidden',
                height: '100vh',
            }}>
                <UserSideBar
                    expanded={expanded}
                    setExpanded={setExpanded}
                    setActiveSection={setActiveSection}
                />

                <Box sx={{ 
                    flexGrow: 1,
                    p: 3, 
                    display: 'flex',
                    flexDirection: 'column' 
                }}>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        <ImageAvatar roleId={1} />
                        {userInfo ? (
                            <Box>
                                <Box sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}>
                                    <IconButton 
                                        size="small"
                                        onClick={()=> setOpenEditProfileModal(true)}
                                        sx={{
                                            ":hover": {
                                                color: theme.palette.success.main
                                            }
                                        }}
                                    >
                                        <EditRounded />
                                    </IconButton>
                                </Box>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: '600',
                                        fontSize: 30
                                    }}
                                >
                                    {userInfo.nombre}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: '600',
                                        fontSize: 30
                                    }}
                                >
                                    {userInfo.primer_apellido} {userInfo.segundo_apellido}
                                </Typography>
                                <Typography variant="body2" fontWeight={'600'}>En:
                                    <Typography component={'span'}> {userInfo.mst_ciudades_id?.nombre}</Typography>
                                </Typography>
                                <Typography variant="body2" fontWeight={'600'}>Contacto:
                                    <Typography component={'span'}> {userInfo.telefono_movil}</Typography>
                                </Typography>
                            </Box>
                        ) : (
                            <Box>
                                <InformationLoadingSkeletons />
                            </Box>
                        )}
                    </Box>

                    <Box 
                        component='main' 
                        sx={{ 
                            mt: 2, 
                            flexGrow: 1,
                        }}
                    >
                        {sectionComponents[activeSection]}
                    </Box>
                </Box>
            </Box>

            <EditUserProfileModal 
                openModal={openEditProfileModal}
                handleCloseModal={()=> setOpenEditProfileModal(false)}
            />

            <SlideUpNotification
                message={notification.message}
                open={notification.open}
                type={notification.type}
                handleClose={closeNotification}
            />
        </>
    );
};

export default () => (
    <NotificationProvider>
        <UserProfilePage />
    </NotificationProvider>
);