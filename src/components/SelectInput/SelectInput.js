import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectInputStyles } from './SelectInput.styles';

const SelectInput = ({ children, labelId, label, width, ...rest }) => (
  <SelectInputStyles width={width}>
    <FormControl>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          label={label}
          { ...rest }
        >
          {children}
        </Select>
      </FormControl>
  </SelectInputStyles>
);

export default SelectInput;
