import React from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { Check } from "@mui/icons-material";

const VerifiedCard = ({ title, subtitle }) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                position: "relative",
                height: "50px",
                backgroundColor: theme.palette.success.light, 
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Typography
                variant="subtitle1"
                sx={{ 
                    fontWeight: "bold", 
                    color: theme.palette.text.primary, 
                }}
            >
                {title}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#000" }}>
                {subtitle}
            </Typography>
            <Paper
                sx={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    backgroundColor: theme.palette.success.main,
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Check sx={{ fontSize: "20px", color: theme.palette.text.primary }} />
            </Paper>
        </Box>
    );
};

export default VerifiedCard;
