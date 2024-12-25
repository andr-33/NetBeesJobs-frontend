import { Container, Box, Typography } from "@mui/material";

const NotFoundPage = () =>{
    return(
        <Container>
            <Box
                component='img'
                src="./images/404.png"
                sx={{
                    display: 'block',
                    margin: 'auto'
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