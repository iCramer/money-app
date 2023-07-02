import { forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import { InputStyles } from './Input.styles';

const Input = ({label, value, onChange, variant = 'outlined', autoFocus = false, fullWidth = false, ref}) => (
  <InputStyles>
    <TextField
      label={label}
      variant={variant}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      autoFocus={autoFocus}
      inputRef={ref}
    />
  </InputStyles>
);

export default forwardRef(Input);
