import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import CustomTextFieldWithIcon from "../../TextField/CustomTextFieldWithIcon/CustomTextFieldWithIcon";
import OptionPicker from "../../Picker/OptionPicker/OptionPicker";
import LoaderButton from "../../Button/LoaderButton/LoaderButton";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";

const INITIAL_VALUES = {
    nombre: "",
    descripcion: "",
    oferta_link: "",
    salario_anual: "",
    mst_puestos_id: "",
    mst_emp_sector_id: "",
};

const CreateOfferModal = ({ openModal, handleCloseModal }) => {
    const { accessToken } = useAuth();
    const [formValues, setFormValues] = useState(INITIAL_VALUES);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/companies/create-offer", formValues, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setOffersData((prev) => [...prev, response.data]);
            setFormValues(INITIAL_VALUES);
            handleCloseModal();
        } catch (error) {
            console.error("Error al crear la oferta:", error);
            setError(
                error.response?.data?.error || "Ocurrió un error. Inténtalo de nuevo."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={openModal} onClose={handleCloseModal}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Crear Nueva Oferta
                </Typography>

                <CustomTextFieldWithIcon
                    label="Nombre de la Oferta"
                    name="nombre"
                    value={formValues.nombre}
                    onChange={handleOnChange}
                    required
                />

                <CustomTextFieldWithIcon
                    label="Descripción"
                    name="descripcion"
                    value={formValues.descripcion}
                    onChange={handleOnChange}
                    required
                    multiline
                    rows={5}
                />

                <CustomTextFieldWithIcon
                    label="Link de la Oferta (LinkedIn)"
                    name="oferta_link"
                    value={formValues.oferta_link}
                    onChange={handleOnChange}
                />

                <CustomTextFieldWithIcon
                    label="Salario Anual (€)"
                    name="salario_anual"
                    type="number"
                    value={formValues.salario_anual}
                    onChange={handleOnChange}
                    required
                />

                <OptionPicker
                    urlData="/api/master/job-positions"
                    label="Puesto"
                    name="mst_puestos_id"
                    value={formValues.mst_puestos_id}
                    onChange={handleOnChange}
                    idKey="mst_puestos_id"
                    labelKey="nombre"
                />

                <OptionPicker
                    urlData="/api/master/sectors"
                    label="Sector"
                    name="mst_emp_sector_id"
                    value={formValues.mst_emp_sector_id}
                    onChange={handleOnChange}
                    idKey="mst_emp_sector_id"
                    labelKey="descripcion"
                />

                <LoaderButton text="Crear Oferta" loading={loading} sx={{ mt: 2 }} />

                {error && (
                    <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </Box>
        </Modal>
    );
};

export default CreateOfferModal;
