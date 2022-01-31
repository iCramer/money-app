import TextField from '@mui/material/TextField';
import { InputStyles } from './Input.styles';

const Input = ({label, value, onChange, variant = 'outlined', autoFocus = false, fullWidth = false}) => (
  <InputStyles>
    <TextField
      label={label}
      variant={variant}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      autoFocus={autoFocus}
    />
  </InputStyles>
);

export default Input;
