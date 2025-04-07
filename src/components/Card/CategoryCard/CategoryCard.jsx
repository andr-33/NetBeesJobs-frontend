import { Paper, Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ imageSrc, title, subtitle }) => {
    const navigate = useNavigate();
       const theme = useTheme();

    return (
        <Paper
            elevation={5}
            component="div"
            sx={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: (theme) => theme.palette.background.paper,
                borderRadius: "15px",
                margin: "10px",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 8px 25px #ffd60a",
                },
            }}
            onClick={() => navigate("/pagina-principal")}
        >
            <Box
                component="img"
                src={imageSrc}
                alt={title}
                sx={{
                    width: 80,
                    height: 80,
                    filter: "drop-shadow(0px 0px 8px #ffd60a",
                }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.primary.dark }}>
                {title}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#666" }}>
                {subtitle}
            </Typography>
        </Paper>
    );
};

export default CategoryCard;
