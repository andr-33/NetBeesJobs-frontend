import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Paper,} from "@mui/material";
import FormLogin from "../components/Form/FormLogin/FormLogin";
import FormSignup from "../components/Form/FormSignup/FormSignup";

const AuthPage = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    return (
        <Box sx={style.container}>
            <Paper sx={style.formWrapper}>
                <Box 
                    component='img' 
                    src="./logos/netbees-logo.png" 
                    alt="Logo NetBees" 
                    sx={style.logo}
                />
                <Tabs
                    value={isLoginForm ? 0 : 1}
                    onChange={() => setIsLoginForm(!isLoginForm)}
                    centered
                    textColor="secondary"
                    sx={style.tab}
                >
                    <Tab label="Iniciar sesión"/>
                    <Tab label="Registrarse"/>
                </Tabs>
                <Box>
                    {isLoginForm ? (
                        <FormLogin />
                    ) : (
                        <FormSignup />
                    )}
                    {errorMessage && (
                        <Typography sx={style.errorMessage}>{errorMessage}</Typography>
                    )}
                </Box>
            </Paper>

            <Box 
                component={'img'} 
                src="./images/gifs/signup-message.gif"
                sx={{
                    width: 300,
                    height: 300,
                    position: 'absolute',
                    top: 400,
                    left: 100
                }}
            />
        </Box>
    );
};

const style = {
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
    },
    formWrapper: {
        width: "400px",
        padding: "32px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        borderRadius: "8px",
    },
    tab: {
        marginBottom: 3,
    },
    logo: {
        width: "100%",
        maxWidth: "250px",
        margin: "auto",
        display: "block",
    },
    textField: {
        marginBottom: 2,
    },
    button: {
        width: "100%",
        py: 1.5,
        marginTop: 2,
    },
    errorMessage: {
        color: "red",
        marginTop: 2,
        textAlign: "center",
    },
};

export default AuthPage;
