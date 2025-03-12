import { useEffect, useState } from "react";
import {
    Box,
    Pagination,
    IconButton,
    useTheme,
    Skeleton,
    Typography,
    Grid2 as Grid
} from "@mui/material";
import {
    Search,
    DeleteOutlineRounded,
    ContentPasteSearchRounded,
    LocationOnRounded
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { NotificationProvider, useNotification } from "../contexts/NotificationContext/NotificationContext";
import { useScreenWidth } from "../contexts/ScreenWidthContext/ScreenWidthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HomePageSideBar from "../components/Sidebar/HomePageSideBar/HomePageSideBar";
import OfferApplyCard from "../components/Card/OfferApplyCard/OfferApplyCard";
import OptionPicker from "../components/Picker/OptionPicker/OptionPicker";
import CustomTextFieldWithIcon from "../components/TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import LogoHeader from "../components/Header/LogoHeader/LogoHeader";
import ServerError from "../components/Error/ServerError/ServerError";
import SlideUpNotification from "../components/Notification/SlideUpNotification/SlideUpNotification";


const LoadingSkeletons = () => {
    return (
        <>
            {Array.from({ length: 6 }).map((_, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                    <Skeleton variant="rectangular" height={200} />
                </Box>
            ))}
        </>
    );
};

const HomePage = () => {
    const [searchFilters, setSearchFilters] = useState({
        name: "",
        sector: "",
        city: "",
    });
    const [expanded, setExpanded] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [offersData, setOffersData] = useState([]);
    const [existsAnError, setExistsAnError] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const { notification, closeNotification, updateNotification, openNotification } = useNotification();
    const { isMobile } = useScreenWidth();

    const itemsPerPage = 6;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    useEffect(() => {
        const fetchAllOffers = async () => {
            try {
                const response = await axios.get('/api/companies/all-active-offers');
                setOffersData(response.data);
                setFilteredData(response.data);
                setExistsAnError(false);
            } catch (error) {
                setExistsAnError(true);
                updateNotification('Algo salio mal...', 'error');
                openNotification();
                console.error("Error: ", error.message);
            }
        };
        fetchAllOffers();
    }, []);

    const handleSearch = async () => {
        const filtered = offersData.filter((item) =>
            (!searchFilters.name || item.nombre.toLowerCase().includes(searchFilters.name.toLowerCase())) &&
            (!searchFilters.sector || item.mst_emp_sector_id.mst_emp_sector_id === searchFilters.sector) &&
            (!searchFilters.city || item.mst_ciudades_id.nombre.toLowerCase().includes(searchFilters.city.toLowerCase()))
        );
        setFilteredData(filtered);
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setSearchFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.palette.background.default,
            position: 'relative',
            pl: accessToken ? '70px' : '0px',
        }}>
            <LogoHeader href={'/'} >
                {!accessToken && (
                    <Typography
                        variant={isMobile ? "body2" : "body1"}
                        component={'p'}
                        onClick={() => navigate('/autenticacion')}
                        color="secondary"
                        sx={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontWeight: 'bold',
                        }}
                    >
                        ENTRAR
                    </Typography>
                )}
            </LogoHeader>
            {accessToken && (
                <HomePageSideBar expanded={expanded} setExpanded={setExpanded} />
            )}

            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: isMobile ? 0.25 : 1,
                        flexDirection: isMobile ? 'column' : 'row',
                        flexGrow: 1
                    }}>
                        <CustomTextFieldWithIcon
                            label={'Buscar por nombre'}
                            name={'name'}
                            value={searchFilters.name}
                            onChange={handleOnChange}
                            icon={ContentPasteSearchRounded}
                        />
                        <OptionPicker
                            urlData={'/api/master/sectors'}
                            label="Buscar por sector"
                            name="sector"
                            value={searchFilters.sector}
                            onChange={handleOnChange}
                            idKey={'mst_emp_sector_id'}
                            labelKey={'descripcion'}
                        />
                        <CustomTextFieldWithIcon
                            label={'Buscar por ciudad'}
                            name={'city'}
                            value={searchFilters.city}
                            onChange={handleOnChange}
                            icon={LocationOnRounded}
                        />
                    </Box>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: isMobile ? 'column' : 'row',
                    }}>
                        <IconButton color="primary" onClick={handleSearch}>
                            <Search />
                        </IconButton>
                        <IconButton color="error" onClick={() => {
                            setSearchFilters({ name: "", sector: "", city: "" });
                            setFilteredData(offersData);
                        }}>
                            <DeleteOutlineRounded />
                        </IconButton>
                    </Box>
                </Box>

                {existsAnError ? (
                    <ServerError message={'Algo salió mal al intentar obtener las ofertas :('} />
                ) : (
                    <Grid
                        container
                        spacing={2}
                    >
                        {offersData.length === 0 ? (
                            <LoadingSkeletons />
                        ) : (
                            filteredData.length === 0 ? (
                                <Typography variant="h6" align="center">Ups.. No se encontraron resultados</Typography>
                            ) : (
                                paginatedData.map((item, index) => (
                                    <Grid
                                        key={index}
                                        size={{ xs: 12, sm: 6, md: 4 }}
                                    >
                                        <OfferApplyCard item={item} />
                                    </Grid>
                                ))
                            )
                        )}
                    </Grid>
                )}

                {filteredData.length > 0 && (
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
                    />
                )}
            </Box>
            <SlideUpNotification
                message={notification.message}
                type={notification.type}
                open={notification.open}
                handleClose={closeNotification}
            />
        </Box>
    );
};

export default () => (
    <NotificationProvider>
        <HomePage />
    </NotificationProvider>
);