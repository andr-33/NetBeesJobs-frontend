import {
    Box,
    Typography,
    Button,
    Paper,
} from "@mui/material";
import WelcomePageSection from "../../Section/WelcomePageSection/WelcomePageSection";
import WelcomePageNavBar from "../../NavBar/WelcomePageNavBar/WelcomePageNavBar";
import WelcomePageFooter from "../../Footer/WelcomePageFooter/WelcomePageFooter";
import LogoCarousel from "../../Carousel/LogoCarousel/LogoCarousel";
import VerifiedCard from "../../Card/VerifiedCard/VirifiedCard";
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material';
import CategoryCard from "../../Card/CategoryCard/CategoryCard";

const WelcomePageContainer = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                scrollSnapType: 'y mandatory',
                overflowY: 'scroll',
                maxHeight: '100vh',
                scrollBehavior: 'smooth',
                bgcolor: theme.palette.background.default
            }}
        >
            <Grid container spacing={2}>
                <Grid size={12} >
                    <WelcomePageSection>
                        <WelcomePageNavBar />
                        <Box>
                            <Box
                                component='img'
                                src="./images/funny.gif"
                                sx={{
                                    width: 250,
                                    height: 250,
                                }}
                            />
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography sx={{
                                fontSize: 40,
                            }}>
                                Más de
                                <Box
                                    sx={{
                                        fontWeight: '900',
                                        color: theme.palette.primary.main,
                                        fontSize: 50,
                                        mx: 0.5
                                    }}
                                    component='span'
                                >
                                    500
                                </Box>
                                ofertas de empleo <br /> se mueren por conocer tu CV
                            </Typography>
                        </Box>
                    </WelcomePageSection>
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }} >
                    <WelcomePageSection>
                        <Box
                            sx={{ textAlign: 'center', padding: '20px' }}
                        >
                            <Typography variant="h2" sx={{ marginBottom: '10px' }}>
                                Miles de
                            </Typography>
                            <Typography variant="h2" sx={{ marginBottom: '20px' }}>
                                empleos de ensueño disponibles ahora
                            </Typography>
                            <Typography variant="subtitle1" sx={{ marginBottom: '30px' }}>
                                Explora algunos trabajos destacados
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                                <CategoryCard
                                    imageSrc="./images/icons/creativity.png"
                                    title="Diseño y Arte"
                                    subtitle="653 posiciones abiertas"
                                />
                                <CategoryCard
                                    imageSrc="./images/icons/studies.png"
                                    title="Educación"
                                    subtitle="109 posiciones abiertas"
                                />
                                <CategoryCard
                                    imageSrc="./images/icons/web-dev.png"
                                    title="Desarrollo Web"
                                    subtitle="870 posiciones abiertas"
                                />
                                <CategoryCard
                                    imageSrc="./images/icons/marketing.png"
                                    title="Marketing Digital"
                                    subtitle="360 posiciones abiertas"
                                />
                            </Box>
                            <Button variant="contained" sx={{ marginTop: '20px', backgroundColor: theme.palette.primary.main, color: '#000000' }}>
                                Explorar más categorías
                            </Button>
                        </Box>
                    </WelcomePageSection>
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }} sx={{ px: 3 }}>
                    <WelcomePageSection>
                        <Grid container spacing={2} >
                            <Grid size={{ xs: 12, sm: 12, md: 6 }} textAlign="center">
                                <Box
                                    sx={{
                                        maxWidth: "100%",
                                        height: "auto",
                                        margin: "0 auto",
                                    }}
                                    component='img'
                                    src="./src/assets/Illustrations/in-progress.svg"
                                />

                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 6 }} >

                                <Typography variant="h2" sx={{ marginBottom: '10px' }}> Haz crecer tu carrera </Typography>
                                <Typography variant="body1"
                                    sx={{
                                        marginBottom: '20px',
                                        textAlign: 'left'
                                    }}
                                > Cuando un impresor desconocido tomó una galera de texto y la mezcló para hacer un libro de muestras tipográficas. Ha sobrevivido no solo cinco siglos, sino también el salto a la composición tipográfica electrónica, permaneciendo esencialmente sin cambios. </Typography>

                                <Grid container spacing={3} >
                                    <Grid size={{ xs: 12, sm: 6 }} textAlign="center" justifyContent="center" alignContent="center">
                                        <VerifiedCard title='100% Trabajos Verificados' />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }} >
                                        <VerifiedCard title='Un perfil, ofertas ilimitadas' />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }} textAlign="center" alignContent="center">
                                        <VerifiedCard title='Obtén sujerencias de empleo' />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }} textAlign="center" alignContent="center">
                                        <VerifiedCard title='Encuentra el trabajo perfecto para ti' />
                                    </Grid>
                                </Grid>


                            </Grid>
                        </Grid>
                    </WelcomePageSection>
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }} >
                    <WelcomePageSection>
                        <Box sx={{ flex: 1 }} />
                        <Typography variant="h2">Principales partners</Typography>
                        <LogoCarousel />
                        <Box sx={{ flex: 1 }} />
                        <WelcomePageFooter />
                    </WelcomePageSection>
                </Grid>
            </Grid>
        </Box >
    );
};

export default WelcomePageContainer;
