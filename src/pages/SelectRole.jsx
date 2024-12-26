import {
    Box, 
    Grid2 as Grid, 
    Typography,
    useTheme
} from "@mui/material";
import BlurImageCard from "../components/Card/BlurImageCard/BlurImageCard";

const SelectRole = () => {
    return(
        <Grid
            container
            sx={{
                minHeight: '100vh',
            }}
        >
            <Grid
                size={{xs: 12, md: 6}}
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <BlurImageCard 
                    imgSrc='./images/netbees-development.png'
                    text='Encuentra tu siguiente trabajo'
                />
            </Grid>
            <Grid
                size={{xs: 12, md: 6}}
                container
                direction='column'
            >
                <Grid
                    sx={{
                        position: 'relative',
                        height: '50%',
                        overflow: 'hidden'
                    }}
                >
                    <BlurImageCard 
                        imgSrc='./images/netbees-marketing.png'
                        text='Publica tus ofertas de trabajo'
                    />
                </Grid>
                <Grid
                    sx={{
                        position: 'relative',
                        height: '50%',
                        overflow: 'hidden'
                    }}
                >
                    <BlurImageCard 
                        imgSrc='./images/netbees-coworking.jpg'
                        text='Espacio de coworking'
                    />
                </Grid>
            </Grid>

        </Grid>
    );
};

export default SelectRole;