import { ButtonStyles } from './Button.styles';

const Button = ({ type = 'button', onClick, children, variant = 'primary', size, shape='squared', ...rest }) => (
  <ButtonStyles className={`button ${variant} ${shape}`} size={size}>
    <button type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  </ButtonStyles>
);

export default Button;
