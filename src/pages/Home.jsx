import { useEffect, useState } from "react";
import {
    Box,
    Pagination,
    IconButton,
    useTheme,
    Skeleton,
    Typography
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import axios from "axios";
import HomePageSideBar from "../components/Sidebar/HomePageSideBar/HomePageSideBar";
import OfferApplyCard from "../components/Card/OfferApplyCard/OfferApplyCard";
import OptionPicker from "../components/Picker/OptionPicker/OptionPicker";
import CustomTextFieldWithIcon from "../components/TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";

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
    const theme = useTheme();

    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    useEffect(() => {
        try{
            const fetchAllOffers = async () => {
                const response = await axios.get('/api/companies/all-active-offers');
                setOffersData(response.data);
                setFilteredData(response.data);
            };
            fetchAllOffers();
        } catch (error) {
            console.error(error.message);
        }
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
            backgroundColor: theme.palette.background.default,
            position: 'relative',
            pl: '70px',
        }}>
            <HomePageSideBar expanded={expanded} setExpanded={setExpanded} />

            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    mb: 3
                }}>
                    <CustomTextFieldWithIcon
                        label={'Buscar por nombre'}
                        name={'name'}
                        value={searchFilters.name}
                        onChange={handleOnChange}
                    />
                    <OptionPicker
                        urlData={'/api/master/sectors'}
                        label="Sector"
                        name="sector"
                        value={searchFilters.sector}
                        onChange={handleOnChange}
                        idKey={'mst_emp_sector_id'}
                        labelKey={'descripcion'}
                    />
                    <CustomTextFieldWithIcon
                        label={'Ciudad'}
                        name={'city'}
                        value={searchFilters.city}
                        onChange={handleOnChange}
                    />
                    <Box sx={{ display: 'flex' }}>
                        <IconButton color="primary" onClick={handleSearch}>
                            <Search />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => {
                            setSearchFilters({ name: "", sector: "", city: "" });
                            setFilteredData(offersData);
                        }}>
                            <Clear />
                        </IconButton>
                    </Box>
                </Box>

                <Box>
                    {offersData.length === 0 ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Skeleton variant="rectangular" height={200} />
                            </Box>
                        ))
                    ) : (
                        filteredData.length === 0 ? (
                            <Typography variant="h6" align="center">Ups.. No se encontraron resultados</Typography>
                        ) : (
                            paginatedData.map((item, index) => (
                                <OfferApplyCard key={index} item={item} />
                            ))
                        )
                    )}
                </Box>

                {filteredData.length > 0 && (
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default HomePage;