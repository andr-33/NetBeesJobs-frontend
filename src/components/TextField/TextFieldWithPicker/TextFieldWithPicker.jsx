import { Box } from "@mui/material";
import OptionPicker from "../../Picker/OptionPicker/OptionPicker";
import CustomTextFieldWithIcon from "../CustomTextFieldWithIcon/CustomTextFieldWithIcon";

const TextFieldWithPicker = ({
    urlData,
    labelPicker,
    namePicker,
    valuePicker,
    onChangePicker,
    idKey,
    labelKey,
    labelTextField,
    nameTextField,
    valueTextField,
    onChangeTextField,
}) => {

    return (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <OptionPicker
                urlData={urlData}
                label={labelPicker}
                name={namePicker}
                value={valuePicker}
                onChange={onChangePicker}
                idKey={idKey}
                labelKey={labelKey}
            />

            <CustomTextFieldWithIcon
                label={labelTextField}
                name={nameTextField}
                value={valueTextField}
                onChange={onChangeTextField}
                required
                type="text"
            />
        </Box>
    );
};

export default TextFieldWithPicker;
