import { Box, Button, useTheme, CircularProgress } from "@mui/material";
import { AlternateEmailRounded, LockRounded } from "@mui/icons-material";
import { useState } from "react";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";

const INITIAL_VALUES = {
    email: '',
    password: ''
}

const FormLogin = () => {
    const [formLoginValues, setFormLoginValues] = useState(INITIAL_VALUES);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    const handleLogin = (event) =>{
        event.preventDefault();
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        },3000);
    }

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormLoginValues(prev => ({...prev, [name]: value}));
    }

    return(
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
            <Button
                sx={{
                    bgcolor: theme.palette.primary.main,
                    color: 'black',
                    borderRadius: 2,
                    display: 'block',
                    margin: 'auto',
                    transition: 'background width 0.2s ease-in-out',
                    ':hover': {
                        bgcolor: theme.palette.primary.light
                    },
                }}
                type="submit"
                variant="contained"
                disabled={loading}
            >
                {loading ? (
                    <CircularProgress size={24} sx={{
                        alignSelf: 'center',
                        justifySelf: 'center',
                        display: 'block'
                    }} />
                ) : (
                    'Iniciar sesión'
                )}
            </Button>
        </Box>
    );
}

export default FormLogin;