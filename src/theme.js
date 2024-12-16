import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffd60a', // Color principal 
            light: '#ffee4a', // Variación clara del primario
            dark: '#c7a500', // Variación oscura del primario
        },
        secondary: {
            main: '#8d8d8d', // Color secundario (rosa)
            light: '#bdbdbd',
            dark: '#616161',
        },
        background: {
            default: '#fafbfa', // Fondo general de la app
            paper: '#ffffff', // Fondo de los contenedores (como tarjetas)
        },
        text: {
            primary: '#333333', // Texto principal
            secondary: '#8d8d8d', // Texto secundario
            disabled: '#bdbdbd'
        },
        warning: {
            main: '#ffa726', // Naranja para advertencias
            light: '#ffd95b',
            dark: '#c77800',
        },
        error: {
            main: '#d32f2f', // Rojo para errores
            light: '#ff6659',
            dark: '#9a0007',
        },
        success: {
            main: '#49b74f', // Verde para éxito
            light: '#76cb7a',
            dark: '#2d7c32', 
        },
    },
    typography: {
        fontFamily: 'Poppins, "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '3rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none', // Desactiva las mayúsculas en botones
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Bordes redondeados en todos los botones
                    padding: '8px 16px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)', // Sombra personalizada
                    borderRadius: 12,
                },
            },
        },
    },
});

export default theme;