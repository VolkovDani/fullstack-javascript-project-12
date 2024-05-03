import React from 'react';
import Modal from 'react-bootstrap/Modal';

const DeleteChannel = ({ handleSetState, modalState }) => {
  const handleClose = () => {
    handleSetState(false);
  };

  return (
    <Modal show={modalState} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Уверены?
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={handleClose}>
          Отменить
        </button>
        <button type="button" className="btn btn-danger">Удалить</button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannel;
