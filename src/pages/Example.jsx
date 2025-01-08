import React, { useState } from "react";
import { Box, TextField, Select, MenuItem, Pagination, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import axios from "axios";

const mockData = [
  { id: 1, name: "Oferta A", sector: "Tecnología", city: "Madrid", community: "Madrid" },
  { id: 2, name: "Oferta B", sector: "Salud", city: "Barcelona", community: "Cataluña" },
  { id: 3, name: "Oferta C", sector: "Educación", city: "Sevilla", community: "Andalucía" },
  // Añade más datos si lo necesitas
];

const Sidebar = ({ expanded, setExpanded }) => {
  const menuItems = [
    { name: "Home", icon: <HomeIcon /> },
    { name: "Sector", icon: <BusinessIcon /> },
    { name: "Ciudades", icon: <LocationCityIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: expanded ? 200 : 70,
        "& .MuiDrawer-paper": {
          width: expanded ? 200 : 70,
          transition: "width 0.3s",
        },
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.name}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {expanded && <ListItemText primary={item.name} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

const HomePageExample = () => {
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    sector: "",
    city: "",
    community: "",
  });
  const [expanded, setExpanded] = useState(false);
  const [filteredData, setFilteredData] = useState(mockData);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Filtrar los datos (mock)
  const handleSearch = async () => {
    // Simulación de llamada API
    const response = await axios.post("/fake-endpoint", searchFilters); // Cambia "/fake-endpoint" por el real.
    console.log("Simulating API call with filters:", searchFilters);
    // Filtra localmente para el mock
    const filtered = mockData.filter((item) =>
      (!searchFilters.name || item.name.toLowerCase().includes(searchFilters.name.toLowerCase())) &&
      (!searchFilters.sector || item.sector === searchFilters.sector) &&
      (!searchFilters.city || item.city === searchFilters.city) &&
      (!searchFilters.community || item.community === searchFilters.community)
    );
    setFilteredData(filtered);
  };

  // Manejar cambio de página
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Obtener los datos para la página actual
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Barra lateral */}
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Barra de búsqueda */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
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

        {/* Lista de resultados */}
        <Box>
          {paginatedData.map((item) => (
            <Box
              key={item.id}
              sx={{
                p: 2,
                mb: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <strong>{item.name}</strong>
              <p>Sector: {item.sector}</p>
              <p>Ciudad: {item.city}</p>
              <p>Comunidad: {item.community}</p>
            </Box>
          ))}
        </Box>

        {/* Paginación */}
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ mt: 3 }}
        />
      </Box>
    </Box>
  );
};

export default HomePageExample;
