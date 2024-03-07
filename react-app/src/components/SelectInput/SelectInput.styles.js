import styled from 'styled-components';

export const SelectInputStyles = styled.div`
  padding-top: 5px;

  .MuiFormControl-root {
    width: ${props => props.width};

    .MuiInputLabel-formControl {
      &:not(.MuiFormLabel-filled) {
        transform: translate(14px,9px) scale(1);
      }
    }
  }

  .MuiSelect-select {
    padding: 0;
  }

  .MuiInputBase-root {
    height: 2.6rem;
    padding: 10px;

    .MuiInputBase-input {
      line-height: 23px;
    }
  }
`;