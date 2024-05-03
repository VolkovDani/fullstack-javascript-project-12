import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '../../slices/auth';
import { deleteChannel } from '../../slices/channels';

const DeleteChannel = ({ handleSetState, modalState, extraData }) => {
  const dispatch = useDispatch();
  const { token } = useSelector(getAuth);
  const idModalChannel = extraData;

  const handleClose = () => {
    handleSetState(false);
  };

  const handleDelete = () => {
    dispatch(deleteChannel({ token, channelId: idModalChannel }));
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
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDelete}
        >
          Удалить
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannel;
