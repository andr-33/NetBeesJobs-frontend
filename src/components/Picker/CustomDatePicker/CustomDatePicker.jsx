import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CustomDatePicker = ({label, value, onChangeDate}) => {
    return(
        <DatePicker 
          slotProps={{
            textField:{
              InputLabelProps:{
                shrink: true
              }
            }
          }}
          label={label} 
          onChange={onChangeDate}
          format="DD/MM/YYYY"
          sx={{
            mb: 2,
            width: '100%'
          }} 
          value={value}
      />
    );
};

export default CustomDatePicker;