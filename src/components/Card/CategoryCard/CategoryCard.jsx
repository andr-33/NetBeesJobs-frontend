import { Paper, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"

const CategoryCard = ({ imageSrc, title, subtitle }) => {
    const navigate = useNavigate();

    return (
        <Paper
            elevation={3}
            component={'div'}
            sx={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: (theme) => theme.palette.background.paper,
                borderRadius: "10px",
                width: "200px",
                margin: "10px",
                cursor: "pointer"
            }}
            onClick={()=> navigate('/pagina-principal')}
        >
            <Box
                component="img"
                src={imageSrc}
                alt={title}
                sx={{
                    width: 80,
                    height: 80,
                }}
            />
            <Typography variant="h6">{title}</Typography>
            <Typography variant="subtitle2">{subtitle}</Typography>
        </Paper>
    );
};

export default CategoryCard;
