import { Box, Typography, useTheme } from "@mui/material";
import { AlternateEmailRounded, LockRounded } from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import axios from "axios";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import LoaderButton from "../../Button/LoaderButton/LoaderButton";

const INITIAL_VALUES = {
    email: '',
    password: ''
}

const FormLogin = () => {
    const [formLoginValues, setFormLoginValues] = useState(INITIAL_VALUES);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const { saveToken } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('api/auth/login', formLoginValues);
            const { message, session } = response.data;
            saveToken(session);
            console.log(message);
        } catch (error) {
            console.error('Error during login: ', error);
            setError(error.response?.data?.error || 'Ups... algo ha salido mal, intentalo nuevamente');
        } finally {
            setLoading(false);
        }
    }

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormLoginValues(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Box
            component='form'
            onSubmit={handleLogin}
        >
            <CustomTextFieldWithIcon
                label='Correo electronico'
                name='email'
                type='email'
                value={formLoginValues.email}
                onChange={handleOnChange}
                required
                icon={AlternateEmailRounded}
            />
            <CustomTextFieldWithIcon
                label='Contraseña'
                name='password'
                type='password'
                value={formLoginValues.password}
                onChange={handleOnChange}
                required
                icon={LockRounded}
            />
            <LoaderButton
                text='Iniciar sesión'
                loading={loading}
            />

            {error && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 1,
                    }}
                >
                    <Typography
                        variant="body1"
                        maxWidth={250}
                        textAlign='center'
                        sx={{
                            color: theme.palette.error.main,
                        }}
                    >
                        {error}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

export default FormLogin;