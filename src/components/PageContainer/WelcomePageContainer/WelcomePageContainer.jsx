import { 
    Box, 
    Typography, 
    Button,
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText
} from "@mui/material";
import {
    CheckCircle
} from "@mui/icons-material";
import WelcomePageSection from "../../Section/WelcomePageSection/WelcomePageSection";
import WelcomePageNavBar from "../../NavBar/WelcomePageNavBar/WelcomePageNavBar";
import WelcomePageFooter from "../../Footer/WelcomePageFooter/WelcomePageFooter";
import LogoCarousel from "../../Carousel/LogoCarousel/LogoCarousel";
import { useTheme} from '@mui/material';

const WelcomePageContainer = () => {
    const theme = useTheme();

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
                <Box 
                    sx={{ textAlign: 'center', backgroundColor: '#e0f7fa', padding: '20px' }}
                >
                    <Typography variant="h4" sx={{ marginBottom: '10px' }}> 
                        Thousands of 
                    </Typography> 
                    <Typography variant="h4" sx={{ marginBottom: '20px' }}> 
                        dreams jobs available now 
                    </Typography> 
                    <Typography variant="subtitle1" sx={{ marginBottom: '30px' }}> 
                        Browse some featured jobs
                    </Typography> 
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                        <Box sx={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', width: '200px', margin: '10px' }}> 
                            <Box 
                                component='img' 
                                src="/images/icons/creativity.png" 
                                alt="Web development" 
                                sx={{
                                    width: 80,
                                    height: 80
                                }}
                            /> 
                            <Typography variant="h6">Designs & Art</Typography> 
                            <Typography variant="subtitle2">653 open positions</Typography> 
                        </Box> 
                        <Box sx={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', width: '200px', margin: '10px' }}> 
                            <Box 
                                component='img' 
                                src="/images/icons/studies.png" 
                                alt="Web development" 
                                sx={{
                                    width: 80,
                                    height: 80
                                }}
                            />
                            <Typography variant="h6">Education</Typography> 
                            <Typography variant="subtitle2">109 open positions</Typography> 
                        </Box> 
                        <Box sx={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', width: '200px', margin: '10px' }}> 
                            <Box 
                                component='img' 
                                src="/images/icons/web-dev.png" 
                                alt="Web development" 
                                sx={{
                                    width: 80,
                                    height: 80
                                }}
                            /> 
                            <Typography variant="h6">Web development</Typography> 
                            <Typography variant="subtitle2">870 open positions</Typography> 
                        </Box> 
                        <Box sx={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffffff', borderRadius: '10px', width: '200px', margin: '10px' }}> 
                            <Box 
                                component='img' 
                                src="/images/icons/marketing.png" 
                                alt="Web development" 
                                sx={{
                                    width: 80,
                                    height: 80
                                }}
                            /> 
                            <Typography variant="h6">Digital Marketing</Typography> 
                            <Typography variant="subtitle2">360 open positions</Typography> 
                        </Box> 
                    </Box> 
                    <Button variant="contained" sx={{ marginTop: '20px', backgroundColor: theme.palette.primary.main, color: '#000000' }}> 
                        Browse more Categories 
                    </Button> 
                </Box>
            </WelcomePageSection>
            <WelcomePageSection>
                <Box sx={{ backgroundColor: '#fafafa', padding: '20px', borderRadius: '10px', textAlign: 'center' }}> 
                    <Typography variant="h4" sx={{ marginBottom: '10px' }}> Grow your career </Typography> 
                    <Typography variant="body1" sx={{ marginBottom: '20px' }}> When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </Typography> 
                    <List sx={{ textAlign: 'left', display: 'inline-block' }}> 
                        <ListItem> 
                            <ListItemIcon> 
                                <CheckCircle /> 
                            </ListItemIcon> 
                            <ListItemText primary="100% Verified Jobs" /> 
                        </ListItem> 
                        <ListItem> 
                            <ListItemIcon> 
                                <CheckCircle /> 
                            </ListItemIcon> 
                            <ListItemText primary="One profile Unlimited job Opening" /> 
                        </ListItem> 
                        <ListItem> 
                            <ListItemIcon> 
                                <CheckCircle /> 
                            </ListItemIcon> 
                            <ListItemText primary="Get Personalized Job Recommendations" /> 
                        </ListItem> 
                        <ListItem> 
                            <ListItemIcon> 
                                <CheckCircle /> 
                            </ListItemIcon> 
                            <ListItemText primary="Find Your Perfect Job Match" /> 
                        </ListItem> 
                    </List> 
                    <Box sx={{ marginTop: '20px' }}> 
                        <Typography variant="subtitle1">35000+ daily active users</Typography> 
                        <Typography variant="subtitle1">69000+ open job positions</Typography> 
                        <Typography variant="subtitle1">68500+ stories shared</Typography> 
                    </Box> 
                </Box>
            </WelcomePageSection>
            <WelcomePageSection>
                <Box sx={{ flex: 1 }} />
                <Typography variant="h2">Principales partners</Typography>
                <LogoCarousel />
                <WelcomePageFooter />
            </WelcomePageSection>
        </Box>
    );
};

export default WelcomePageContainer;