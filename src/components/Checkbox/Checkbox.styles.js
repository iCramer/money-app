import styled from 'styled-components';

export const CheckboxStyles = styled.div`
  position: relative;
  cursor: pointer;

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .icon-checked,
  .icon-unchecked {
    font-size: 1.25rem;
    margin-right: 3px;
  }

  .icon-checked {
    color: #1976d2;
  }

  input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
    cursor: pointer;
  }
`;