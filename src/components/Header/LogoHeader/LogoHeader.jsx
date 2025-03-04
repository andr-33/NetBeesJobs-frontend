import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogoHeader = ({children, href}) => {
    const navigate = useNavigate();

    return (
        <Box
            component='div'
            sx={{
                height: 80,
                overflowY: 'hidden',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                mx: 3
            }}
        >
            <Box
                component={'img'}
                src="/logos/netbees-logo.png"
                sx={{
                    width: 152,
                    height: 121,
                    cursor: 'pointer'
                }}
                onClick={() => navigate(href)}
            />
            {children}
        </Box>
    );
};

export default LogoHeader;