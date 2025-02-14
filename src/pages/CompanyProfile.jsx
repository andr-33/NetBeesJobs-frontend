import { useEffect, useState } from "react";
import { Box, Button, Grid2 as Grid, Skeleton, Typography, useTheme } from "@mui/material";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import ImageAvatar from "../components/Avatar/ImageAvatar/ImageAvatar";
import CompanySidebar from "../components/Sidebar/CompanySidebar/CompanySidebar";
import axios from "axios";
import ProjectCard from "../components/Card/ProjectCard/ProjectCard";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import CreateProjectModal from "../components/Modal/CreateProjectModal/CreateProjectModal";
import SlideUpNotification from "../components/Notification/SlideUpNotification/SlideUpNotification";

const CompanyProfilePage = () => {
    const [expanded, setExpanded] = useState(false);
    const [projectsData, setProjectsData] = useState([]);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const theme = useTheme();
    const { accessToken } = useAuth();

    const handleDeleteProject = async (projectId) => {
        try{
            const response = await axios.delete(`/api/companies/delete-project/${projectId}`);
            setNotificationMessage(response.data.message);
            setOpenNotification(true);
            setProjectsData(projectsData.filter(project => project.emp_proyectos_id !== projectId));
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        try {
            const fetchAllCompanyProjects = async () => {
                const response = await axios.get('/api/companies/all-company-projects', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setIsLoading(false);
                setProjectsData(response.data);
            };
            fetchAllCompanyProjects();
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    useEffect(() => {
        try {
            const fetchCompanyInformation = async () => {
                const response = await axios.get('/api/companies/company-information', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setCompanyInfo(response.data);
            };
            fetchCompanyInformation();
        } catch (error) {
            console.error(error.message);
        }
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
                        onClick={()=> setOpenModal(true)}
                    >
                        CREAR
                    </Button>
                </Box>
                <CreateProjectModal 
                    openModal={openModal} 
                    handleCloseModal={() => setOpenModal(false)}
                    setProjectsData={setProjectsData}
                />

                {projectsData.length > 0 && (
                    <Grid container spacing={2} mt={2}>
                        {projectsData.map((project, index) => (
                            <Grid key={index} size={{ md: 6, sm: 12 }}>
                                <ProjectCard 
                                    id={project.emp_proyectos_id}
                                    name={project.nombre}
                                    description={project.descripcion}
                                    startDate={formatDate(project.fecha_inicio)} 
                                    state={project.estado}
                                    handleDeleteProject={handleDeleteProject}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {projectsData.length === 0 && !isLoading && (
                    <Typography></Typography>
                )}

                {isLoading && (
                    <Grid container spacing={2} mt={2}>
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
                    </Grid>
                )}
            </Box>
            {/*Pensar en el Layout, fijo sidebar  */}
            {/*Lista de proyectos, pensar como hacer las cards*/}
            {/*Agregar ofertas con dialog que sube? */}
            <SlideUpNotification
                message={notificationMessage}
                type="success"
                open={openNotification}
                handleClose={() => setOpenNotification(false)}
            />
        </Box>
    );
};

export default CompanyProfilePage;