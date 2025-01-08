import { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Select,
    MenuItem,
    Pagination,
    IconButton,
    Paper,
    Typography,
    Button,
    Avatar,
    useTheme
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import HomePageSideBar from "../components/Sidebar/HomePageSideBar/HomePageSideBar";
import OfferApplyCard from "../components/Card/OfferApplyCard/OfferApplyCard";

const mockData = [
    { id: 1, name: "Oferta A", sector: "Tecnología", city: "Madrid", community: "Madrid" },
    { id: 2, name: "Oferta B", sector: "Salud", city: "Barcelona", community: "Cataluña" },
    { id: 3, name: "Oferta C", sector: "Educación", city: "Sevilla", community: "Andalucía" },
    // Añade más datos si lo necesitas
];

const HomePage = () => {
    const [searchFilters, setSearchFilters] = useState({
        name: "",
        sector: "",
        city: "",
        community: "",
    });
    const [expanded, setExpanded] = useState(false);
    const [filteredData, setFilteredData] = useState(mockData);
    const [currentPage, setCurrentPage] = useState(1);
    const [offersData, setOffersData] = useState([]);
    const theme = useTheme();

    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    useEffect(() => {
        const fetchAllOffers = async () => {
            const response = await axios.get('/api/company/all-offers');
            setOffersData(response.data);
            setFilteredData(response.data);
            console.log(response.data);
        };

        fetchAllOffers();
    }, []);

    const handleSearch = async () => {
        const filtered = offersData.filter((item) =>
            (!searchFilters.name || item.name.toLowerCase().includes(searchFilters.name.toLowerCase())) &&
            (!searchFilters.sector || item.sector === searchFilters.sector) &&
            (!searchFilters.city || item.city === searchFilters.city) &&
            (!searchFilters.community || item.community === searchFilters.community)
        );
        setFilteredData(filtered);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Box sx={{ display: "flex" }}>
            <HomePageSideBar expanded={expanded} setExpanded={setExpanded} />

            <Box sx={{ flexGrow: 1, p: 3 }}>
                {/* Barra de búsqueda */}
                <Box sx={{ display: "flex", justifyContent: 'center', gap: 2, mb: 3 }}>
                    <TextField
                        label="Buscar por nombre"
                        variant="outlined"
                        size="small"
                        onChange={(e) =>
                            setSearchFilters((prev) => ({ ...prev, name: e.target.value }))
                        }
                    />
                    <Select
                        value={searchFilters.sector}
                        onChange={(e) =>
                            setSearchFilters((prev) => ({ ...prev, sector: e.target.value }))
                        }
                        displayEmpty
                        size="small"
                    >
                        <MenuItem value="">Todos los sectores</MenuItem>
                        <MenuItem value="Tecnología">Tecnología</MenuItem>
                        <MenuItem value="Salud">Salud</MenuItem>
                        <MenuItem value="Educación">Educación</MenuItem>
                    </Select>
                    <TextField
                        label="Ciudad"
                        variant="outlined"
                        size="small"
                        onChange={(e) =>
                            setSearchFilters((prev) => ({ ...prev, city: e.target.value }))
                        }
                    />
                    <TextField
                        label="Comunidad"
                        variant="outlined"
                        size="small"
                        onChange={(e) =>
                            setSearchFilters((prev) => ({
                                ...prev,
                                community: e.target.value,
                            }))
                        }
                    />
                    <IconButton color="primary" onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                </Box>

                <Box>
                    {offersData.length > 0 && paginatedData.map((item) => (
                        <OfferApplyCard item={item} />
                    ))}
                </Box>

                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
                />
            </Box>
        </Box>
    );
};

export default HomePage;