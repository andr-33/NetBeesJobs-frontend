import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, Tabs, Tab, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LOGIN_FIELDS = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Contraseña", type: "password" },
];

const SIGNUP_FIELDS = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Contraseña", type: "password" },
    { name: "confirmPassword", label: "Confirma tu contraseña", type: "password" },
];

const AuthPage = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [formValues, setFormValues] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const initialFields = isLoginForm ? LOGIN_FIELDS : SIGNUP_FIELDS;
        const initialValues = Object.fromEntries(initialFields.map((field) => [field.name, ""]));
        setFormValues(initialValues);
    }, [isLoginForm]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        } catch (error) {
        }
    };

    return (
        <>
            <Box sx={style.container}>
                <Paper sx={style.formWrapper}>
                    <img src="./images/LOGONETBEES.png" alt="Logo" style={style.logo} />
                    <Tabs
                        value={isLoginForm ? 0 : 1}
                        onChange={() => setIsLoginForm(!isLoginForm)}
                        centered
                        sx={style.tab}
                    >
                        <Tab label="Iniciar sesión" />
                        <Tab label="Registrarse" />
                    </Tabs>
                    <form onSubmit={handleSubmit}>
                        {(isLoginForm ? LOGIN_FIELDS : SIGNUP_FIELDS).map((field) => (
                            <TextField
                                key={field.name}
                                name={field.name}
                                label={field.label}
                                type={field.type}
                                variant="outlined"
                                fullWidth
                                sx={style.textField}
                                value={formValues[field.name] || ""}
                                onChange={handleInputChange}
                            />
                        ))}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={style.button}
                        >
                            {isLoginForm ? "Iniciar sesión" : "Crear cuenta"}
                        </Button>
                        {errorMessage && (
                            <Typography sx={style.errorMessage}>{errorMessage}</Typography>
                        )}
                    </form>
                </Paper>
            </Box>
        </>
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
        margin: "0 auto 0 auto",
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
