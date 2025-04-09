import React, { useRef } from "react";
import { Box, Typography, Grid2 as Grid, useTheme, Button } from "@mui/material";
import Slider from "react-slick";
import WelcomePageSection from "../../Section/WelcomePageSection/WelcomePageSection";
import WelcomePageNavBar from "../../NavBar/WelcomePageNavBar/WelcomePageNavBar";
import WelcomePageFooter from "../../Footer/WelcomePageFooter/WelcomePageFooter";
import LogoCarousel from "../../Carousel/LogoCarousel/LogoCarousel";
import CategoryCard from "../../Card/CategoryCard/CategoryCard";
import VerifiedCard from "../../Card/VerifiedCard/VirifiedCard";
import { useScreenWidth } from "../../../contexts/ScreenWidthContext/ScreenWidthContext";
import CompanyStepsCard from "../../Card/CompanyStepsCard/CompanyStepsCard";
import "./WelcomePageContainer.css";
import ComparisonCards from "../../Card/ComparisonCard/ComparisonCard";
import JobPostCard from "../../Card/JobPostCard/JobPostCard";

const WelcomePageContainer = () => {
    const theme = useTheme();
    const { isMobile } = useScreenWidth();
    const partnerRef = useRef(null);
    const contactRef = useRef(null);
    const carouselSettings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        cssEase: "linear",
        arrows: false,
        dots: true,
    };
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
            <Grid container >
                <Grid size={12}>
                    <WelcomePageSection sx={{ backgroundColor: 'white', color: 'black' }}>
                        <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Grid size={{ xs: 12, sm: 12, md: 7 }} sx={{ textAlign: 'center', width: '100%' }}>
                                <Box sx={{ width: '100%' }}>
                                    <Box mt={5}>
                                        <Box component='img' src="./images/funny.gif" sx={{ width: 250, height: 250 }} />
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography sx={{ fontSize: 48, fontWeight: 'bolder' }}>
                                            Más de
                                            <Box sx={{ fontWeight: '900', color: theme.palette.primary.main, fontSize: 50, mx: 0.5 }} component='span'>
                                                500
                                            </Box>
                                            ofertas de empleo <br /> se mueren por conocer tu CV
                                        </Typography>
                                        <Button variant="contained" sx={{ mt: 5, backgroundColor: theme.palette.primary.main, color: 'black', fontSize: 20, padding: '10px 30px', borderRadius: 5, }} >
                                            Explorar trabajos
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 4 }} sx={{ width: '100%', display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}>
                                <Box sx={{ width: '100%', textAlign: 'center' }} >
                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: { md: 4, lg: 0 } }}>
                                        <Box component='img' src="./images/gifs/jobsgif.gif" sx={{ maxHeight: 650 }} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </WelcomePageSection>
                </Grid>

                <Grid size={{ xs: 12, sm: 12 }}>
                    <WelcomePageSection sx={{ backgroundColor: '#e5e5e5', color: 'black' }}>
                        <Box sx={{ width: '100%', textAlign: 'center', mx: { xs: 2, sm: 5, md: 9, lg: 9 }, my: { xs: 9, sm: 9, md: 2, lg: 2 } }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography sx={{ fontSize: 48, fontWeight: 'bolder' }}>
                                    Miles de
                                    <Box sx={{ fontWeight: '900', color: theme.palette.primary.dark, fontSize: 50, mx: 0.5 }} component='span'>
                                        empleos
                                    </Box>
                                    de ensueño <br /> disponibles ahora
                                </Typography>
                                <Typography sx={{ fontSize: 20, fontWeight: 500, my: 3 }}>
                                    Encuentra el trabajo perfecto para ti y empieza a trabajar desde casa hoy mismo.
                                </Typography>
                            </Box>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ width: '100%' }}>
                                        <CategoryCard
                                            imageSrc="./images/icons/creativity.png"
                                            title="Diseño y Arte"
                                            subtitle="653 posiciones abiertas"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ textAlign: 'center', width: '100%' }}>
                                        <CategoryCard
                                            imageSrc="./images/icons/studies.png"
                                            title="Educación"
                                            subtitle="109 posiciones abiertas"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ textAlign: 'center', width: '100%' }}>

                                        <CategoryCard
                                            imageSrc="./images/icons/web-dev.png"
                                            title="Desarrollo Web"
                                            subtitle="870 posiciones abiertas"
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6, md: 6 }} sx={{ textAlign: 'center', width: '100%' }}>
                                        <CategoryCard

                                            imageSrc="./images/icons/marketing.png"
                                            title="Marketing Digital"
                                            subtitle="360 posiciones abiertas"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>

                        </Box>
                    </WelcomePageSection>
                </Grid>

                <Grid size={{ xs: 12, sm: 12 }}>

                    <Box sx={{ width: '100%', my: 10 }}>
                        <Grid container spacing={2} sx={{ mx: { xs: 1, sm: 10, md: 10, lg: 20}    }}>
                            <Grid size={{ xs: 12, sm: 12, md: 12 }} sx={{ textAlign: 'center', width: '100%' }}>
                                <Typography sx={{ marginBottom: '10px', fontSize: 40, fontWeight: 'bolder' }}>¿Eres una empresa que quiere contratar personal?</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                                <CompanyStepsCard img="./images/megafono.png" text="Publica tus ofertas ahora " />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                                <CompanyStepsCard img="./images/documento.png" text="Recibe CVs de candidatos" />

                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                                <CompanyStepsCard img="./images/hands.png" text="Selecciona a los mejores candidatos" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                                <Button variant="contained" fullWidth sx={{ mt: 5, backgroundColor: theme.palette.primary.dark, color: 'white', fontSize: 20, borderRadius: 5 }} >
                                    Registrate como empresa
                                </Button>
                            </Grid>

                        </Grid>
                    </Box>

                </Grid>

                <Grid size={{ xs: 12, sm: 12 }} >
                    <WelcomePageSection sx={{ backgroundColor: 'black', color: 'white' }}>
                        <Box sx={{ width: '100%', textAlign: 'center', my: { xs: 9, sm: 9, md: 2, lg: 2 }, pb: 13 }}>
                            <Grid container spacing={2} sx={{ px: { xs: 2, sm: 2, md: 0, lg: 0 } }}>
                                <Grid size={{ xs: 12, sm: 12, md: 12 }} >
                                    <Typography sx={{ fontSize: 48, mb: { xs: 3, sm: 3, md: 9, lg: 9 }, px: { xs: 2, sm: 2, md: 0, lg: 0 }, fontWeight: 'bolder', mt: 2 }} color={theme.palette.primary.main} >
                                        Haz crecer tu carrera
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 5 }} textAlign="center" >
                                    <Slider {...carouselSettings}>
                                        <Box
                                            sx={{
                                                height: 520,
                                                maxWidth: 360,
                                                borderRadius: 5,
                                            }}
                                            component="img"
                                            src="./images/NBEmployee.png"
                                        />
                                        <Box
                                            sx={{
                                                height: 520,
                                                maxWidth: 360,
                                                borderRadius: 5,
                                            }}
                                            component="img"
                                            src="./images/NBEmployee2.png"
                                        />
                                        <Box
                                            sx={{
                                                height: 520,
                                                maxWidth: 360,
                                                borderRadius: 5,
                                            }}
                                            component="img"
                                            src="./images/NBEmployee3.png"
                                        />
                                    </Slider>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 6 }} alignContent="center" sx={{ pr: { xs: 0, sm: 0, md: 4, lg: 4 } }}>
                                    <Typography variant="body1" sx={{ mb: { xs: 3, sm: 3, md: 10, lg: 10 }, textAlign: 'justify' }}>
                                        Descubre oportunidades laborales que se alinean con tus habilidades y aspiraciones. Nuestra app te conecta con empleadores que valoran tu talento y te ayudan a alcanzar tus metas profesionales. ¡Empieza hoy y da el siguiente paso en tu carrera!
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <VerifiedCard title="100% Trabajos Verificados" />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <VerifiedCard title="Un perfil, ofertas ilimitadas" />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <VerifiedCard title="Obtén sugerencias de empleo" />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <VerifiedCard title="Encuentra el trabajo perfecto para ti" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </WelcomePageSection>
                </Grid>

                <Grid size={{ xs: 12, sm: 12 }} >
                    <WelcomePageSection sx={{ backgroundColor: 'white', color: 'black', mb: 15 }}>
                        <Box sx={{ width: '100%', textAlign: 'center', mx: { xs: 0, sm: 5, md: 10, lg: 29 } }}>
                            <Typography sx={{ fontSize: 48, fontWeight: 'bolder', mb: 10 }}>
                                Precios
                                <Typography sx={{ fontWeight: '900', color: theme.palette.primary.main, fontSize: 52, mx: 0.5, textShadow: `2px 2px 4px ${theme.palette.grey[900]}`, }} component='span' >
                                    increíbles
                                </Typography>
                                para empresas
                            </Typography>
                            <Box  >
                                <ComparisonCards />
                            </Box>
                        </Box>
                    </WelcomePageSection>
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }} sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: 20,
                    p: 5,
                    zIndex: 9
                }}>
                    <Box mx={{ xs: 2, sm: 5, md: 10, lg: 10 }}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
                                <Typography sx={{ fontSize: 50, color: theme.palette.primary.dark, textAlign: 'center', fontWeight: 'bolder' }} >
                                    Ofertas
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <JobPostCard imageUrl="./images/informatica.jpg" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <JobPostCard imageUrl="./images/informatica.jpg" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                                <JobPostCard imageUrl="./images/informatica.jpg" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                                <JobPostCard imageUrl="./images/informatica.jpg" />
                            </Grid>
                            <Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        py: 1.4,
                                        backgroundColor: theme.palette.primary.dark,
                                        color: 'black',
                                        fontSize: 18,
                                        borderRadius: 5,
                                        px: 18,
                                        mb: 3,
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.dark
                                        }
                                    }}

                                >
                                    Publica tu oferta
                                </Button>
                            </Grid>

                        </Grid>

                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 0,
                    mt: -11,

                }}>

                    <Box sx={{
                        width: '100%',
                        textAlign: 'center',
                        borderBottomLeftRadius: 125,
                        borderBottomRightRadius: 125,
                        backgroundColor: theme.palette.primary.main,
                        color: 'black',
                    }}>
                        <Grid container sx={{ px: { xs: 2, sm: 2, md: 0, lg: 0 }, }}>
                            <Grid size={{ xs: 12, sm: 12, md: 7 }} sx={{ p: 5, pt: 20 }} >
                                <Typography sx={{ fontSize: 50, mb: { xs: 3, sm: 3, md: 9, lg: 9 }, px: { xs: 2, sm: 2, md: 0, lg: 0 }, fontWeight: 'bolder' }} color='black'>
                                    Publica tus ofertas de empleo
                                </Typography>
                                <Typography variant="body1" sx={{ mb: { xs: 3, sm: 3, md: 10, lg: 10 }, px: { xs: 0, sm: 0, md: 5, lg: 16 }, textAlign: 'justify', color: 'black' }}>
                                    Encuentra el talento perfecto para tu empresa. Publica tus ofertas de empleo y recibe CVs de candidatos.
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 5 }} alignSelf={'end'} sx={{ overflow: 'hidden', display: { xs: 'block', sm: 'block', md: 'block', lg: 'block' } }}>
                                <Box component='img' src="./images/projectsMobile.png" sx={{ height: 440, display: 'felx', mb: { xs: -13, sm: -13, md: -2, lg: -12 } }} />
                            </Grid>
                        </Grid>
                    </Box>

                </Grid>



                <Grid size={{ xs: 12, sm: 12 }} ref={partnerRef}>

                    <Typography
                        sx={{
                            fontSize: 48,
                            mt: 9,
                            mb: 9,
                            textAlign: 'center',
                            fontWeight: 500,
                        }}
                    >
                        Nuestros
                        principales <br />
                        colaboradores
                    </Typography>
                    <LogoCarousel />

                </Grid>


                <Grid size={{ xs: 12, sm: 12 }} ref={contactRef} >

                    <Box sx={{ flex: 1 }} />
                    <WelcomePageFooter />

                </Grid>
            </Grid >
        </Box >
    );
};

export default WelcomePageContainer;
