import { Box, Button, useTheme, CircularProgress } from "@mui/material";
import { AlternateEmailRounded, LockRounded } from "@mui/icons-material";
import { useState } from "react";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";

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

    const handleSignup = (event) => {
        event.preventDefault();
        const { password, confirmPassword } = formSignupValues;

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setError(null); 
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            alert("Registro exitoso");
        }, 3000);
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
            {error && (
                <Box
                    sx={{
                        color: theme.palette.error.main,
                        textAlign: 'center',
                        mt: 1,
                        mb: 2,
                    }}
                >
                    {error}
                </Box>
            )}
            <Button
                sx={{
                    bgcolor: theme.palette.primary.main,
                    color: 'black',
                    borderRadius: 2,
                    display: 'block',
                    margin: 'auto',
                    transition: 'background 0.2s ease-in-out',
                    ':hover': {
                        bgcolor: theme.palette.primary.light,
                    },
                }}
                type="submit"
                variant="contained"
                disabled={loading}
            >
                {loading ? (
                    <CircularProgress size={24} sx={{ color: 'black' }} />
                ) : (
                    "Registrarse"
                )}
            </Button>
        </Box>
    );
};

export default FormSignup;
