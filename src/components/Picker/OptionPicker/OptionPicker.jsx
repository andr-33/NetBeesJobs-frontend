import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, Typography, useTheme } from "@mui/material";
import axios from "axios";

const OptionPicker = ({ urlData, label = "Select", onChange, value, name = "", idKey, labelKey }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(urlData);
                setData(response.data);
            } catch (err) {
                setError("Error al cargar los datos.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [urlData]);

    const handleChange = (event) => {
        if (onChange) onChange(event);
    };

    return (
        <FormControl 
            fullWidth
            sx={{
                mb: 2
            }}
        >
            <InputLabel>{label}</InputLabel>
            {loading ? (
                <CircularProgress size={24} style={{ margin: "auto" }} />
            ) : error ? (
                <Typography style={{ color: theme.palette.error.main }}>{error}</Typography>
            ) : (
                <Select
                    value={value || ""}
                    onChange={handleChange}
                    name={name}
                    label={label}
                >
                    {data.map((item, index) => (
                        <MenuItem key={index} value={item[idKey]}>
                            {item[labelKey]}
                        </MenuItem>
                    ))}
                </Select>
            )}
        </FormControl>
    );
};

export default OptionPicker;
