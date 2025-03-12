import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useTheme } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useScreenWidth } from "../../../contexts/ScreenWidthContext/ScreenWidthContext";

const WelcomePageNavBar = () => {
    const [isVibrating, setIsVibrating] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const { isMobile } = useScreenWidth();

    useState(() => {
        const interval = setInterval(() => {
            setIsVibrating(true);
            setTimeout(() => setIsVibrating(false), 700);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <AppBar position="fixed" component='nav' sx={{ bgcolor: theme.palette.background.paper, height: 80 }}>
            <Toolbar>
                <Box component='img' src="./logos/netbees-logo.png" sx={{ width: 152, height: 121 }} />
                <Box sx={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row', gap: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                        <Button
                            variant="outlined"
                            sx={{
                                bgcolor: 'transparent',
                                color: 'black',
                                borderColor: 'black',
                                borderRadius: isMobile ? 2 : 3,
                                padding: isMobile ? '6px 12px' : '10px 20px', 
                                minWidth: isMobile ? 'auto' : '150px',
                                fontSize: isMobile ? '0.8rem' : '1rem',
                                transition: 'transform 0.1s ease-in-out',
                                ':hover': { transform: 'scale(1.02)' }
                            }
                            }
                            onClick={() => navigate('/perfil-empresa')}
                        >
                            Publicar oferta
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: theme.palette.primary.main,
                                color: 'black',
                                borderRadius: isMobile ? 2 : 3,
                                padding: isMobile ? '6px 12px' : '10px 20px', 
                                minWidth: isMobile ? 'auto' : '150px',
                                fontSize: isMobile ? '0.8rem' : '1rem',
                                transition: 'transform 0.1s ease-in-out',
                                ':hover': { transform: 'scale(1.02)' },
                                animation: isVibrating ? 'vibration 0.4s ease-in-out' : 'none',
                            }}
                            onClick={() => navigate('/pagina-principal')}
                        >
                            Encuentra trabajo
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default WelcomePageNavBar;
