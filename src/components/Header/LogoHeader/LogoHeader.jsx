import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useScreenWidth } from "../../../contexts/ScreenWidthContext/ScreenWidthContext";

const LogoHeader = ({children, href, callToAction}) => {
    const navigate = useNavigate();
    const { isMobile } = useScreenWidth();

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
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
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
                {callToAction && !isMobile && (
                    <Box 
                        component={'img'}
                        src="/images/gifs/view-more-offers.gif"
                        sx={{
                            width: 200,
                            height: 200,
                            mt: 2
                        }}
                    />
                )}
            </Box>
            {children}
        </Box>
    );
};

export default LogoHeader;