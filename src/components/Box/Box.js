import { BoxStyles } from './Box.styles';

const Box = ({ children }) => (
  <BoxStyles className="box">
    {children}
  </BoxStyles>
);

export default Box;
