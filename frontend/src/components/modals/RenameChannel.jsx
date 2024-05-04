import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { channelsSelectors } from '../../slices/channels';
import { channelsNamingSchema } from '../../validation/schema';

const RenameChannel = ({ handleSetState, modalState, extraData }) => {
  const idChannel = extraData;
  const allChannels = useSelector(channelsSelectors.selectEntities);
  const { name: currentChannelName } = useSelector(
    (state) => channelsSelectors.selectById(state, idChannel),
  );

  const formik = useFormik({
    initialValues: {
      newChannelName: currentChannelName,
    },
    validationSchema: channelsNamingSchema,
    onSubmit: ({ newChannelName }) => {
      if (!formik.errors.newChannelName) {
        const channel = Object.values(allChannels).find(({ name }) => newChannelName === name);
        if (!channel) {
          handleSetState(false);
        } else {
          formik.setErrors({
            newChannelName: 'Новое имя совпадает с именем другого канала',
          });
        }
      }
    },
    validateOnChange: true,
  });

  const handleClose = () => {
    handleSetState(false);
  };

  return (
    <Modal show={modalState} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={formik.handleSubmit}
        >
          <input
            onChange={formik.handleChange}
            className="form-control"
            name="newChannelName"
            type="text"
            required
            value={formik.values.newChannelName}
            placeholder={`Новое название канала "${currentChannelName}"`}
          />
        </form>
        {formik.errors.newChannelName ? (
          <div>{formik.errors.newChannelName}</div>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={handleClose}>
          Отменить
        </button>
        <input type="submit" value="Отправить" className="btn btn-primary" onClick={formik.handleSubmit} />
      </Modal.Footer>
    </Modal>
  );
};

export default RenameChannel;
