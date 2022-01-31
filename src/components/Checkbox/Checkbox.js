import { CheckboxStyles } from './Checkbox.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

const Checkbox = ({ label, checked, name, onChange }) => (
  <CheckboxStyles>
    <label>
      {checked && (
        <FontAwesomeIcon className="icon-checked" icon={faCheckSquare} />
      )}
      {!checked && (
        <FontAwesomeIcon className="icon-unchecked" icon={faSquare} />
      )}
      <input type="checkbox" name={name} onChange={onChange} checked={checked} />
      {label}
    </label>
  </CheckboxStyles>
);

export default Checkbox;
