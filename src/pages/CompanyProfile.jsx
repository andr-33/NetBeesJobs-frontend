import { useEffect, useState } from "react";
import { Box, IconButton, Skeleton, Typography, useTheme } from "@mui/material";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { NotificationProvider, useNotification } from "../contexts/NotificationContext/NotificationContext"; 
import ImageAvatar from "../components/Avatar/ImageAvatar/ImageAvatar";
import CompanySidebar from "../components/Sidebar/CompanySidebar/CompanySidebar";
import axios from "axios";
import SlideUpNotification from "../components/Notification/SlideUpNotification/SlideUpNotification";
import ProjectsSection from "../components/Section/ProjectsSection/ProjectsSection";
import CandidatesSection from "../components/Section/CandidatesSection/CandidatesSection";
import OfferSection from "../components/Section/OffersSection/OffersSection";
import { EditRounded } from "@mui/icons-material";
import EditCompanyProfileModal from "../components/Modal/EditCompanyProfileModal/EditCompanyProfile";

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

const CompanyProfilePage = () => {
    const [expanded, setExpanded] = useState(false);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [activeSection, setActiveSection] = useState('projects');
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
    const theme = useTheme();
    const { accessToken } = useAuth();
    const { notification, closeNotification, updateNotification, openNotification } = useNotification();

    const sectionComponents = {
        projects: <ProjectsSection />,
        candidates: <CandidatesSection />,
        offers: <OfferSection />
    };

    useEffect(() => {
        const fetchCompanyInformation = async () => {
            try {
                const response = await axios.get('/api/companies/company-information', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setCompanyInfo(response.data);
            } catch (error) {
                console.error('Error: ',error.message);
                updateNotification("No pudimos obtener tu información", 'error');
                openNotification();
            }
        };
        fetchCompanyInformation();
    }, []);

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
        <>
            <Box sx={{
                display: 'flex',
                backgroundColor: theme.palette.background.default,
                position: 'relative',
                pl: '70px'
            }}>
                <CompanySidebar 
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
                        <ImageAvatar roleId={2} />
                        {companyInfo ? (
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
                                    {companyInfo.nombre} ({companyInfo.acronimo})
                                </Typography>
                                <Typography variant="body2" fontWeight={'600'}>Fecha de alta:
                                    <Typography component={'span'}> {formatDate(companyInfo.fecha_alta)}</Typography>
                                </Typography>
                                <Typography variant="body2" fontWeight={'600'}>En:
                                    <Typography component={'span'}> {companyInfo.mst_ciudades_id.nombre}</Typography>
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

            <EditCompanyProfileModal 
                openModal={openEditProfileModal}
                handleCloseModal={() => setOpenEditProfileModal(false)}
            />
            
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
        <CompanyProfilePage />
    </NotificationProvider>
);