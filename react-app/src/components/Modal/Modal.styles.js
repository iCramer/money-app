import styled from 'styled-components';

export const ModalStyles = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, .4);
  visibility: hidden;

  &.open {
    visibility: visible;
  }

  .modal {
    background: #fff;
    border-radius: 3px;
    width: 600px;
  }

  .modal-header {
    padding: 10px 10px 10px 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      font-weight: 400;
    }

    .close-icon {
      color: #444;
      font-size: 1.25rem;
    }
  }

  .modal-body {
    padding: 20px;
  }

  .modal-footer {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    button {
      margin-left: 5px;
    }
  }
`;