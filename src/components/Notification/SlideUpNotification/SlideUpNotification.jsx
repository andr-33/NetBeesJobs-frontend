import { Alert, Slide, Snackbar } from "@mui/material";


const SlideTransition = (props) => {
    return <Slide {...props} direction="up" />;
};

const SlideUpNotification = ({ message, type, open, handleClose }) => {

    return(
        <Snackbar 
            open={open} 
            autoHideDuration={4000} 
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                severity={type || 'success'} 
                variant="standard"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SlideUpNotification;