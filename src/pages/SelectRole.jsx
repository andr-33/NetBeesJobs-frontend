import { Grid2 as Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import axios from "axios";
import BlurImageCard from "../components/Card/BlurImageCard/BlurImageCard";

const SelectRolePage = () => {
    const navigate = useNavigate();
    const { accessToken } = useAuth();

    const handleRoleSelection = async (roleId) =>{
        try{
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
        } catch (error){
            console.error('Error during signup: ', error);
        }
    };

    return(
        <Grid
            container
            sx={{
                minHeight: '100vh',
            }}
        >
            <Grid
                size={{xs: 12, md: 6}}
                component='div'
                onClick={()=> handleRoleSelection(1)}
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
                        height: '50%',
                    }}
                    component='div'
                    onClick={()=> handleRoleSelection(2)}
                >
                    <BlurImageCard 
                        imgSrc='./images/netbees-marketing.png'
                        text='Publica tus ofertas de trabajo'
                    />
                </Grid>
                <Grid
                    sx={{
                        height: '50%',
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

export default SelectRolePage;