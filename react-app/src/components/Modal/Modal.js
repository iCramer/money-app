import { ModalStyles } from './Modal.styles';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ children, title, onSubmit, onCancel, open }) => (
  <ModalStyles className={open ? 'open' : ''}>
    <div className="modal">
      <div className="modal-header">
        <h3>{title}</h3>
        <Button variant="icon" onClick={onCancel}>
          <FontAwesomeIcon icon={faTimes} className="close-icon" />
        </Button>
      </div>
      <div className="modal-body">
        {children}
      </div>
      <div className="modal-footer">
        <Button onClick={onCancel} variant="text">
          Cancel
        </Button>
        <Button onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  </ModalStyles>
);

export default Modal;
