import { useEffect, useState } from "react";
import { Box, Grid2 as Grid, Typography, useTheme } from "@mui/material";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import ImageAvatar from "../components/Avatar/ImageAvatar/ImageAvatar";
import CompanySidebar from "../components/Sidebar/CompanySidebar/CompanySidebar";
import axios from "axios";
import ProjectCard from "../components/Card/ProjectCard/ProjectCard";

const CompanyProfilePage = () => {
    const [expanded, setExpanded] = useState(false);
    const [projectsData, setProjectsData] = useState([]);
    const theme = useTheme();
    const { accessToken } = useAuth();

    useEffect(() => {
        try {
            const fetchAllCompanyProjects = async () => {
                const response = await axios.get('/api/companies/all-company-projects', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log(response.data)
                setProjectsData(response.data);
            };
            fetchAllCompanyProjects();
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    return (
        <Box sx={{
            display: 'flex',
            backgroundColor: theme.palette.background.default,
            position: 'relative',
            pl: '70px'
        }}>
            <CompanySidebar expanded={expanded} setExpanded={setExpanded} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <ImageAvatar roleId={2} />

                {projectsData.length > 0 && (
                    <Grid container spacing={2}>
                        {projectsData.map((project, index) => (
                            <Grid key={index} size={{md: 6, sm: 12}}>
                                <ProjectCard project={project} />
                            </Grid>
                    ))}

                    </Grid>
                )}
            </Box>
            {/*Pensar en el Layout, fijo sidebar  */}
            {/*Lista de proyectos, pensar como hacer las cards*/}
            {/*Agregar ofertas con dialog que sube? */}
        </Box>
    );
};

export default CompanyProfilePage;