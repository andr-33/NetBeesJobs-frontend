import { Box, Grid2 as Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { useScreenWidth } from "../contexts/ScreenWidthContext/ScreenWidthContext";
import axios from "axios";
import BlurImageCard from "../components/Card/BlurImageCard/BlurImageCard";

const SelectRolePage = () => {
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const { isMobile } = useScreenWidth(); 
    const theme = useTheme();

    const handleRoleSelection = async (roleId) => {
        try {
            const response = await axios.post(
                'api/master/set-role',
                { roleId: roleId },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                },
            );
            console.log(response.data.message);
            navigate(`/crea-tu-perfil/${roleId}`);
        } catch (error) {
            console.error('Error during signup: ', error);
        }
    };

    return (
        <Grid container sx={{ backgroundColor: theme.palette.background.default }}>
            <Grid size={12}>
                <Box sx={{ mt: 4, mb: 2 }}>
                    <Typography variant='h4' align='center' sx={{ mb: 2 }}> ¿Que deseas hacer? </Typography>
                    <Typography variant='h6' align='center' sx={{ color: theme.palette.grey[800] }}> Selecciona una opción </Typography>
                </Box>
            </Grid>
            <Grid size={12} >
                <Box sx={{ 
                    height: '70vh', 
                    padding: isMobile ? 2 : 5,
                    mx: {md: 15, sm: 10, xs: 1}, 
                }}>
                    <Grid
                        container
                        sx={{
                            height: '100%',
                        }}

                    >
                        <Grid
                            size={{ xs: 12, md: 6 }}
                            component='div'
                            onClick={() => handleRoleSelection(1)}
                        >
                            <BlurImageCard
                                sx={{
                                    mb: { xs: 2, md: 0 },
                                    borderRadius: {
                                        xs: '20px 20px 0px 0px',
                                        md: '20px 0px 0px 20px'
                                    }
                                }}
                                imgSrc='./images/netbees-foundjob.jpg'
                                text='Encuentra tu siguiente trabajo'
                            />
                        </Grid>
                        <Grid
                            size={{ xs: 12, md: 6 }}
                            container
                            direction='column'
                        >
                            <Grid
                                sx={{
                                    height: '100%',
                                }}
                                component='div'
                                onClick={() => handleRoleSelection(2)}
                            >
                                <BlurImageCard
                                    sx={{
                                        borderRadius: {
                                            xs: "0px 0px 20px 20px",
                                            md: "0px 20px 20px 0px",
                                        },
                                    }}
                                    imgSrc='./images/netbees-marketing2.jpg'
                                    text='Publica tus ofertas de trabajo'
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SelectRolePage;