import { ButtonStyles } from './Button.styles';

const Button = ({ type = 'button', onClick, children, variant = 'primary', size }) => (
  <ButtonStyles className={`button ${variant}`} size={size}>
    <button type={type} onClick={onClick}>
      {children}
    </button>
  </ButtonStyles>
);

export default Button;
