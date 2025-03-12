import React, { useRef } from "react";
import { Box, Typography, Grid2 as Grid, useTheme } from "@mui/material";
import WelcomePageSection from "../../Section/WelcomePageSection/WelcomePageSection";
import WelcomePageNavBar from "../../NavBar/WelcomePageNavBar/WelcomePageNavBar";
import WelcomePageFooter from "../../Footer/WelcomePageFooter/WelcomePageFooter";
import LogoCarousel from "../../Carousel/LogoCarousel/LogoCarousel";
import CategoryCard from "../../Card/CategoryCard/CategoryCard";
import VerifiedCard from "../../Card/VerifiedCard/VirifiedCard";
import { useScreenWidth } from "../../../contexts/ScreenWidthContext/ScreenWidthContext";

const WelcomePageContainer = () => {
    const theme = useTheme();
    const { isMobile } = useScreenWidth();
    const partnerRef = useRef(null);
    const contactRef = useRef(null);

    return (
        <Box sx={{ 
            scrollSnapType: isMobile ? 'unset' : 'y mandatory', 
            overflowY: 'scroll', 
            overflowX: 'hidden', 
            maxHeight: '100vh', 
            scrollBehavior: 'smooth', 
            bgcolor: theme.palette.background.default 
        }}>
            <WelcomePageNavBar />
            <Grid container spacing={2}>
                <Grid size={12}>
                    <WelcomePageSection>
                        <Box>
                            <Box component='img' src="./images/funny.gif" sx={{ width: 250, height: 250 }} />
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography sx={{ fontSize: 40 }}>
                                Más de
                                <Box sx={{ fontWeight: '900', color: theme.palette.primary.main, fontSize: 50, mx: 0.5 }} component='span'>
                                    500
                                </Box>
                                ofertas de empleo <br/> se mueren por conocer tu CV
                            </Typography>
                        </Box>
                    </WelcomePageSection>
                </Grid>
        
                <Grid size={{ xs: 12, sm: 12 }}>
                    <WelcomePageSection>
                        <Box sx={{ textAlign: 'center', padding: '20px' }}>
                            <Typography variant="h2" sx={{ marginBottom: '10px' }}>Miles de empleos de ensueño disponibles ahora</Typography>
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
                        </Box>
                    </WelcomePageSection>
                </Grid>

                <Grid size={{ xs: 12, sm: 12 }} sx={{ px: 3 }}>
                    <WelcomePageSection>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 12, md: 6 }} textAlign="center">
                                <Box
                                    sx={{
                                        maxWidth: "100%",
                                        height: "auto",
                                        margin: "0 auto",
                                    }}
                                    component='img'
                                    src="./images/illustrations/in-progress.svg"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 6 }} alignContent='center'>
                                <Typography variant="h2" sx={{ marginBottom: '10px' }}> Haz crecer tu carrera </Typography>
                                <Typography variant="body1" sx={{ marginBottom: '20px', textAlign: 'left' }}>
                                    Descubre oportunidades laborales que se alinean con tus habilidades y aspiraciones. Nuestra app te conecta con empleadores que valoran tu talento y te ayudan a alcanzar tus metas profesionales. ¡Empieza hoy y da el siguiente paso en tu carrera!
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <VerifiedCard title='100% Trabajos Verificados' />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }} >
                                        <VerifiedCard title='Un perfil, ofertas ilimitadas' />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <VerifiedCard title='Obtén sugerencias de empleo' />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <VerifiedCard title='Encuentra el trabajo perfecto para ti' />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </WelcomePageSection>
                </Grid>

                <Grid size={{ xs: 12, sm: 12 }} ref={partnerRef}>
                    <WelcomePageSection>
                        <Typography 
                            variant="h2" 
                            sx={{ 
                                textDecoration: 'underline', 
                                textDecorationColor: (theme) => theme.palette.primary.main,
                                textAlign: 'center'
                            }}
                        >
                            Nuestro principales colaboradores
                        </Typography>
                        <LogoCarousel />
                    </WelcomePageSection>
                </Grid>

                <Grid size={{ xs: 12, sm: 12 }} ref={contactRef} >
                    <WelcomePageSection>
                        <Box sx={{ flex: 1 }} />
                        <WelcomePageFooter />
                    </WelcomePageSection>
                </Grid>
            </Grid>
        </Box>
    );
};

export default WelcomePageContainer;
