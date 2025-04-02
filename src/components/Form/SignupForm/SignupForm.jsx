import { Box } from "@mui/material";
import { AlternateEmailRounded, LockRounded } from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../contexts/NotificationContext/NotificationContext";
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
    const navigate = useNavigate();
    const { saveToken } = useAuth();
    const { updateNotification, openNotification } = useNotification();

    const handleSignup = async (event) => {
        event.preventDefault();
        setLoading(true);

        const { password, confirmPassword } = formSignupValues;

        if (password !== confirmPassword) {
            updateNotification('Las contraseñas no coinciden', 'error');
            openNotification();
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('api/auth/signup', formSignupValues);
            const { session } = response.data;
            saveToken(session);
            navigate('/seleccion-rol');
        } catch (error) {
            console.error('Error during signup: ', error);
            updateNotification('No pudimos registrarte, intenta luego', 'error');
            openNotification();
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
        </Box>
    );
};

export default FormSignup;
