import { Box, Typography } from "@mui/material";
import WelcomePageSection from "../../Section/WelcomePageSection/WelcomePageSection";
import WelcomePageNavBar from "../../NavBar/WelcomePageNavBar/WelcomePageNavBar";
import WelcomePageFooter from "../../Footer/WelcomePageFooter/WelcomePageFooter";
import LogoCarousel from "../../Carousel/LogoCarousel/LogoCarousel";

const WelcomePageContainer = () => {
    return (
        <Box
            sx={{
                scrollSnapType: 'y mandatory',
                overflowY: 'scroll',
                maxHeight: '100vh',
            }}
        >
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
                <Box>
                    <Typography sx={{
                        fontSize: 40,
                    }}>
                        Más de
                        <Box
                            sx={{
                                fontWeight: '900',
                                color: 'yellow',
                                fontSize: 50,
                                mx: 0.5
                            }}
                            component='span'
                        >
                            500
                        </Box>
                        ofertas de empleo se mueren por conocer tu CV
                    </Typography>
                </Box>
            </WelcomePageSection>
            <WelcomePageSection>
                <Box>
                    Otra seccion
                </Box>
            </WelcomePageSection>
            <WelcomePageSection>
                <Box sx={{flex:1}}/>
                <LogoCarousel />
                <WelcomePageFooter/>
            </WelcomePageSection>
        </Box>
    );
};

export default WelcomePageContainer;