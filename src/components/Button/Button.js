import { ButtonStyles } from './Button.styles';

const Button = ({ type = 'button', onClick, children, variant = 'primary' }) => (
  <ButtonStyles className={`button ${variant}`}>
    <button type={type} onClick={onClick}>
      {children}
    </button>
  </ButtonStyles>
);

export default Button;
