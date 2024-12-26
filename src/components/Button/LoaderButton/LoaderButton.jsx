import { Button, CircularProgress ,Typography,useTheme } from "@mui/material";

const LoaderButton = ({loading, text, type}) => {
    const theme = useTheme();
    return (
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
            type={type || 'submit'}
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
                <Typography variant="button">{text}</Typography>
            )}
        </Button>
    );
};

export default LoaderButton;