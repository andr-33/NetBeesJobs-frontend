import { Box, Card, CardContent, CardHeader, Typography, useTheme} from "@mui/material";

const ProjectCard = ({project}) => {
    const theme = useTheme();
    return(
        <Card sx={{
            width: '100%',
            height: '100%'
        }}>
            <CardHeader 
                title={project.nombre}
                subheader={project.fecha_inicio}
                action={
                    <Box sx={{
                        borderRadius: 2,
                        px: 1,
                        bgcolor: theme.palette.success.light
                    }}>
                        <Typography variant="caption">
                            {project.estado === 1 ? "Activo" : "Desactivado"}
                        </Typography>
                    </Box>
                }
            />
            <CardContent>
                <Typography variant="body1" >{project.descripcion}</Typography>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;