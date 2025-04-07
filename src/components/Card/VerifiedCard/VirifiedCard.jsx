import React from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { Check } from "@mui/icons-material";

const VerifiedCard = ({ title, subtitle }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: "relative",
                height: "60px", 
                background: `linear-gradient(135deg, ${theme.palette.success.light}, ${theme.palette.success.main})`, 
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between", 
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", 
                overflow: "hidden", 
                "&::before": { 
                    content: '""',
                    position: "absolute",
                    top: "-50%",
                    left: "-50%",
                    width: "200%",
                    height: "200%",
                    background: "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)",
                },
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: "bold",
                        color: theme.palette.text.primary,
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)", 
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: theme.palette.text.secondary,
                        opacity: 0.9,
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>
            <Paper
                sx={{
                    position: "absolute",
                    top: -12,
                    right: -12,
                    backgroundColor: theme.palette.success.dark, 
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)", 
                }}
            >
                <Check sx={{ fontSize: "25px", color: "#fff" }} /> 
            </Paper>

        </Box>
    );
};

export default VerifiedCard;