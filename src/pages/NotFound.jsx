import { Container, Box, Typography } from "@mui/material";
import { useScreenWidth } from "../contexts/ScreenWidthContext/ScreenWidthContext";

const NotFoundPage = () =>{
    const { isMobile } = useScreenWidth();

    return(
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh'
        }}>
            <Box
                component='img'
                src="./images/404.png"
                sx={{
                    width: isMobile ? 300 : 500,
                    height: 'auto'
                }}
            />
            <Typography 
                variant="h2"
                sx={{
                    textAlign: 'center',
                    fontSize: '84px'
                }}
            >
                404
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    textAlign: 'center'
                }}
            >
                Pagina no encontrada
            </Typography>
        </Container>
    );
};

export default NotFoundPage;