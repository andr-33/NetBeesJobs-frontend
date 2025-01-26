import { Box, Card, CardContent, CardHeader, Typography, useTheme} from "@mui/material";

const ProjectCard = ({name, description, startDate, state}) => {
    const theme = useTheme();
    const isActive = state === 1 ? true : false

    return(
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
                        borderRadius: 2,
                        px: 1,
                        bgcolor: isActive ? theme.palette.success.light : theme.palette.error.light
                    }}>
                        <Typography variant="caption">
                            {isActive ? "Activo" : "No activo"}
                        </Typography>
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