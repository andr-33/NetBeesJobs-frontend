import { Box, useTheme, Typography } from "@mui/material";
import { AlternateEmailRounded, LockRounded } from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import axios from "axios";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import LoaderButton from "../../Button/LoaderButton/LoaderButton";

const INITIAL_VALUES = {
    email: '',
    password: '',
    confirmPassword: '',
};

const FormSignup = () => {
    const [formSignupValues, setFormSignupValues] = useState(INITIAL_VALUES);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const { saveToken } = useAuth();

    const handleSignup = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const { password, confirmPassword } = formSignupValues;

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('api/auth/signup', formSignupValues);
            const { message, session } = response.data;
            saveToken(session);
            console.log(message);
        } catch (error) {
            console.error('Error during signup: ', error);
            setError(error.response?.data?.error || 'Ups...algo ha salido mal, intentalo nuevamente');
        } finally {
            setLoading(false);
        }
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormSignupValues((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Box
            component="form"
            onSubmit={handleSignup}
        >
            <CustomTextFieldWithIcon
                label="Correo electrónico"
                name="email"
                type="email"
                value={formSignupValues.email}
                onChange={handleOnChange}
                required
                icon={AlternateEmailRounded}
            />
            <CustomTextFieldWithIcon
                label="Contraseña"
                name="password"
                type="password"
                value={formSignupValues.password}
                onChange={handleOnChange}
                required
                icon={LockRounded}
            />
            <CustomTextFieldWithIcon
                label="Confirmar Contraseña"
                name="confirmPassword"
                type="password"
                value={formSignupValues.confirmPassword}
                onChange={handleOnChange}
                required
                icon={LockRounded}
            />
            <LoaderButton 
                text='Registrarse'
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
};

export default FormSignup;
