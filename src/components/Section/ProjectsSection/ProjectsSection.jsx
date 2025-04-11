import {
    Box,
    Button,
    Typography,
    Grid2 as Grid,
    Skeleton,
} from '@mui/material';
import { AddCircleOutlineRounded } from '@mui/icons-material';
import { useScreenWidth } from '../../../contexts/ScreenWidthContext/ScreenWidthContext';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';
import { useNotification } from '../../../contexts/NotificationContext/NotificationContext';
import ServerError from '../../Error/ServerError/ServerError';
import CreateProjectModal from '../../Modal/CreateProjectModal/CreateProjectModal';
import ProjectCard from '../../Card/ProjectCard/ProjectCard';
import DataNullError from '../../Error/DataNullError/DataNullError';
import axios from 'axios';
import CardsSkeleton from '../../Skeleton/CardsSkeleton/CardsSkeleton';

const CompanyProjectsSection = () => {
    const [projectsData, setProjectsData] = useState([]);
    const [existsAnError, setExistsAnError] = useState(false);
    const [isDataNull, setIsDataNull] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openModalAddProject, setOpenModalAddProject] = useState(false);
    const [editSettings, setEditSettings] = useState({
        active: false,
        projectToEdit: null
    }); 
    const { isMobile } = useScreenWidth();
    const { accessToken } = useAuth();
    const { updateNotification, openNotification } = useNotification();

    const handleDeleteProject = async (projectId) => {
        try {
            await axios.delete(`/api/companies/delete-project/${projectId}`);
            setProjectsData(projectsData.filter(project => project.emp_proyectos_id !== projectId));
            updateNotification("Proyecto eliminada con exito","success");
            openNotification();
        } catch (error) {
            console.error("Error: ", error.message);
            updateNotification("No pudimos eliminar tu proyecto", 'error');
            openNotification();
        }
    };

    const handleEditProject = (projectId) => {
        setOpenModalAddProject(true);
        setEditSettings({
            ...editSettings,
            active: true,
            projectToEdit: projectId
        });
    };

    const handleAddProject = async () => {
        setOpenModalAddProject(true);
        setEditSettings({
            ...editSettings,
            active: false,
            projectToEdit: null
        });
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
                if(response.data.length === 0) {
                    setIsDataNull(true);
                }
            } catch (error) {
                console.error('Error: ', error.message);
                setExistsAnError(true);
                updateNotification("No pudimos obtener tus proyectos", 'error');
                openNotification();
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllCompanyProjects();
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
            height: '100%',
        }}>
            <Box sx={{
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
                    onClick={handleAddProject}
                >
                    {isMobile ? '' : 'Crear proyecto'}
                </Button>
            </Box>

            {existsAnError && (
                <ServerError
                    message={"Vaya... No pudimos obtener tus proyectos"}
                />
            )}

            {isDataNull && !existsAnError && (
                <DataNullError
                    message={"Aún no tienes proyectos registrados"}
                />
            )}

            {isLoading && (
                <CardsSkeleton 
                    length={4}
                    height={250}
                    size={{ lg: 6, md: 6, sm: 12 }}
                />
            )}

            {projectsData.length > 0 && (
                <Grid container spacing={2} mt={2}>
                    {projectsData.map((project, index) => (
                        <Grid key={index} size={{ lg: 6, md: 6, sm: 12 }}>
                            <ProjectCard
                                id={project.emp_proyectos_id}
                                name={project.nombre}
                                description={project.descripcion}
                                startDate={formatDate(project.fecha_inicio)}
                                endDate={formatDate(project.fecha_fin)}
                                state={project.estado}
                                handleDeleteProject={handleDeleteProject}
                                handleEditProject={()=> handleEditProject(project.emp_proyectos_id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            <CreateProjectModal
                openModal={openModalAddProject}
                handleCloseModal={() => setOpenModalAddProject(false)}
                setProjectsData={setProjectsData}
                editSettings={editSettings}
            />
        </Box>
    );
};

export default CompanyProjectsSection;
