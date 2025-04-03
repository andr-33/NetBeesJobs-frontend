import { useEffect, useState } from "react";
import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { NotificationProvider, useNotification } from "../contexts/NotificationContext/NotificationContext";
import axios from "axios";
import SlideUpNotification from "../components/Notification/SlideUpNotification/SlideUpNotification";
import UserSideBar from "../components/Sidebar/UserSidebar/UserSidebar";
import ImageAvatar from "../components/Avatar/ImageAvatar/ImageAvatar";
import RegistersSection from "../components/Section/RegistersSection/RegistersSection";

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
    const theme = useTheme();
    const { accessToken } = useAuth();
    const { notification, closeNotification, updateNotification, openNotification } = useNotification();

    const sectionComponents = {
        registers: <RegistersSection />,
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
                console.log(response.data);
            } catch (error) {
                console.error('Error: ', error.message);
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
                backgroundColor: theme.palette.background.default,
                position: 'relative',
                pl: '70px'
            }}>
                <UserSideBar
                    expanded={expanded}
                    setExpanded={setExpanded}
                    setActiveSection={setActiveSection}
                />

                <Box sx={{ flexGrow: 1, p: 3 }}>
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
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: '600',
                                        fontSize: 30
                                    }}
                                >
                                    {userInfo.nombre} {userInfo.primer_apellido}
                                </Typography>
                                {/*<Typography variant="body2" fontWeight={'600'}>Fecha de alta:
                                    <Typography component={'span'}> {formatDate(userInfo.fecha_alta)}</Typography>
                                </Typography>*/}
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

                    <Box component='main' sx={{ mt: 2 }}>
                        {sectionComponents[activeSection]}
                    </Box>
                </Box>
            </Box>

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