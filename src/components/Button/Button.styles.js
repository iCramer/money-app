import styled from 'styled-components';

export const ButtonStyles = styled.div`
  button {
    display: flex;
    align-items: center;
    font-size: ${({ size }) => size === 'small' ? '12px' : '14px' };
    padding: ${({ size }) => size === 'small' ? '6px 12px' : '12px 16px' };
    border: none;
    border-radius: 4px;
    transition: background-color 250ms cubic-bezier(0.4,0,0.2,1) 0ms,
      box-shadow 250ms cubic-bezier(0.4,0,0.2,1) 0ms,
      border-color 250ms cubic-bezier(0.4,0,0.2,1) 0ms,
      color 250ms cubic-bezier(0.4,0,0.2,1) 0ms;
    cursor: pointer;
    text-transform: uppercase;
  }

  svg {
    margin-right: 5px;
  }

  &.pill {
    button {
      border-radius: 20px;
    }
  }

  &.primary {
    button {
      color: #fff;
      background-color: #1976d2;
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    }
  }

  &.primary-outline {
    button {
      color: #1976d2;
      background-color: #fff;
      border: 1px solid #1976d2;
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    }
  }

  &.success-outline {
    button {
      color: #2e7d32;
      background-color: #fff;
      border: 1px solid #2e7d32;
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    }
  }

  &.success {
    button {
      color: #fff;
      background-color: #2e7d32;
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    }
  }

  &.text {
    button {
      background-color: transparent;
    }
  }

  &.icon {
    button {
      background-color: transparent;
      padding: 0;
    }
  }
`;