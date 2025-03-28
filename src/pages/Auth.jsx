import React, { useState } from "react";
import { Box, Tabs, Tab, Paper, Grid2 as Grid, Fade, useTheme } from "@mui/material";
import { useScreenWidth } from "../contexts/ScreenWidthContext/ScreenWidthContext";
import { useNavigate } from "react-router-dom";
import FormLogin from "../components/Form/LoginForm/LoginForm";
import FormSignup from "../components/Form/SignupForm/SignupForm";

const AuthPage = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const theme = useTheme();
    const navigate = useNavigate();
    const { isMobile } = useScreenWidth();

    return (
        <Grid
            container
            direction='row'
            alignItems='center'
            sx={{minHeight: '100vh', bgcolor: theme.palette.background.default}}
        >
            {!isLoginForm && !isMobile && (
                <Grid 
                    size={4}
                    display='flex'
                    justifyContent='end'
                    marginTop={40}
                >
                    <Fade 
                        in={!isLoginForm} 
                        easing={{
                            enter: 'ease-in',
                        }}
                    >
                        <Box
                            component='img'
                            src="./images/gifs/signup-message.gif"
                            sx={{
                                width: 300,
                                height: 300,
                            }}
                        />
                    </Fade>
                </Grid>
            )}

            <Grid 
                size={(isLoginForm || isMobile ) ? 12 : 4}
                justifyItems='center'
            >
                <Paper
                    sx={{ 
                        width: isMobile ? "320px" : "400px",
                        padding: isMobile ? "16px" : "32px",
                        borderRadius: "8px",
                        bgcolor: theme.palette.background.paper 
                    }}
                    elevation={3}
                >
                    <Box sx={{
                        width: '200px',
                        height: '120px',
                        display: 'block',
                        margin: 'auto',
                        overflow: 'hidden'
                    }}>
                        <Box
                            component='img'
                            src="./logos/netbees-logo.png"
                            alt="Logo NetBees"
                            sx={{
                                width: "100%",
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                cursor: 'pointer'
                            }}
                            onClick={()=> navigate('/')}
                        />
                    </Box>
                    <Tabs
                        value={isLoginForm ? 0 : 1}
                        onChange={() => setIsLoginForm(!isLoginForm)}
                        centered
                        textColor="secondary"
                        sx={style.tab}
                    >
                        <Tab label="Iniciar sesión" />
                        <Tab label="Registrarse" />
                    </Tabs>
                    <Box>
                        {isLoginForm ? (
                            <FormLogin />
                        ) : (
                            <FormSignup />
                        )}
                    </Box>
                </Paper>
            </Grid>

            {!isLoginForm && !isMobile && (
                <Grid size={4} />
            )}
        </Grid>
    );
};

const style = {
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    tab: {
        marginBottom: 3,
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
