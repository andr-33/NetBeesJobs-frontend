import { useEffect, useState } from "react";
import { Box, Button, Grid2 as Grid, Skeleton, Typography, useTheme } from "@mui/material";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import { useScreenWidth } from "../contexts/ScreenWidthContext/ScreenWidthContext";
import { NotificationProvider, useNotification } from "../contexts/NotificationContext/NotificationContext"; 
import ImageAvatar from "../components/Avatar/ImageAvatar/ImageAvatar";
import CompanySidebar from "../components/Sidebar/CompanySidebar/CompanySidebar";
import axios from "axios";
import ProjectCard from "../components/Card/ProjectCard/ProjectCard";
import CreateProjectModal from "../components/Modal/CreateProjectModal/CreateProjectModal";
import SlideUpNotification from "../components/Notification/SlideUpNotification/SlideUpNotification";
import ServerError from "../components/Error/ServerError/ServerError";

const ProjectsLoadingSkeletons = () => {
    return (
        <>
            {Array.from({ length: 4 }).map((_, index) => (
                <Grid key={index} size={{ md: 6, sm: 12 }}>
                    <Skeleton
                        variant="rectangular"
                        height={150}
                        sx={{
                            borderRadius: '16px'
                        }}
                    />
                </Grid>
            ))}
        </>
    );
};

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
    const [projectsData, setProjectsData] = useState([]);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [openModalAddProject, setOpenModalAddProject] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationType, setNotificationType] = useState();
    const [existsAnError, setExistsAnError] = useState(false);
    const theme = useTheme();
    const { accessToken } = useAuth();
    const { isMobile } = useScreenWidth();
    const { notification, closeNotification } = useNotification();

    const handleDeleteProject = async (projectId) => {
        try {
            const response = await axios.delete(`/api/companies/delete-project/${projectId}`);
            setNotificationMessage(response.data.message);
            setNotificationType('success');
            setOpenNotification(true);
            setProjectsData(projectsData.filter(project => project.emp_proyectos_id !== projectId));
        } catch (error) {
            console.error("Error: ", error.message);
            setNotificationMessage('Hubo un problema al eliminar este proyecto');
            setNotificationType('error');
            setOpenNotification(true);
        }
    };

    useEffect(() => {
        const fetchAllCompanyProjects = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('/api/companies/all-company-projects', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setProjectsData(response.data);
                setExistsAnError(false);
            } catch (error) {
                console.error('Error: ', error.message);
                setExistsAnError(true);
                setNotificationMessage('No pudimos obtener tus proyectos');
                setNotificationType('error');
                setOpenNotification(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllCompanyProjects();
    }, []);

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
                <CompanySidebar expanded={expanded} setExpanded={setExpanded} />
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
                    <Box sx={{
                        mt: 2,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography
                            variant="h5"
                            sx={{
                                textDecoration: 'underline'
                            }}
                        >
                            Tus proyectos
                        </Typography>
                        <Button
                            variant="contained"
                            endIcon={<AddCircleOutlineRounded />}
                            onClick={() => setOpenModalAddProject(true)}
                        >
                            {isMobile ? '' : 'Crear proyecto'}
                        </Button>
                    </Box>

                    {projectsData.length > 0 && (
                        <Grid container spacing={2} mt={2}>
                            {projectsData.map((project, index) => (
                                <Grid key={index} size={{ md: 6, sm: 12 }}>
                                    <ProjectCard
                                        id={project.emp_proyectos_id}
                                        name={project.nombre}
                                        description={project.descripcion}
                                        startDate={formatDate(project.fecha_inicio)}
                                        endDate={formatDate(project.fecha_fin)}
                                        state={project.estado}
                                        handleDeleteProject={handleDeleteProject}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {existsAnError && (
                        <ServerError
                            message={"Vaya... No pudimos obtener tus proyectos"}
                        />
                    )}

                    {isLoading && (
                        <Grid container spacing={2} mt={2}>
                            <ProjectsLoadingSkeletons />
                        </Grid>
                    )}
                </Box>
            </Box>
            <CreateProjectModal
                openModal={openModalAddProject}
                handleCloseModal={() => setOpenModalAddProject(false)}
                setProjectsData={setProjectsData}
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