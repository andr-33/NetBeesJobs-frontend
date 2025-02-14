import { Box, Card, CardContent, CardHeader, IconButton, Typography, useTheme } from "@mui/material";
import { DeleteOutlineRounded, EditOutlined } from "@mui/icons-material";

const ProjectCard = ({ id, name, description, startDate, state, handleDeleteProject  }) => {
    const theme = useTheme();
    const isActive = state === 1 ? true : false;

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
                            onClick={()=>handleDeleteProject(id)}
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
                <Typography variant="body1" >{description}</Typography>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;