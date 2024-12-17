import { Paper, Box, Typography } from "@mui/material";

const CategoryCard = ({ imageSrc, title, subtitle }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: (theme) => theme.palette.background.paper,
                borderRadius: "10px",
                width: "200px",
                margin: "10px",
            }}
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
