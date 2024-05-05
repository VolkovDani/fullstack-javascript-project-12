import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { channelsSelectors, renameChannel } from '../../slices/channels';
import { channelsNamingSchema } from '../../validation/schema';
import { getAuth } from '../../slices/auth';

const RenameChannel = ({ handleSetState, modalState, extraData }) => {
  const dispatch = useDispatch();
  const channelId = extraData;
  const allChannels = useSelector(channelsSelectors.selectEntities);
  const { token } = useSelector(getAuth);
  const { name: currentChannelName } = useSelector(
    (state) => channelsSelectors.selectById(state, channelId),
  );

  const formik = useFormik({
    initialValues: {
      channelName: currentChannelName,
    },
    validationSchema: channelsNamingSchema,
    onSubmit: ({ channelName }) => {
      if (!formik.errors.channelName) {
        const channel = Object.values(allChannels).find(({ name }) => channelName === name);
        if (!channel) {
          dispatch(renameChannel({ token, channelName, channelId }));
          handleSetState(false);
        } else {
          formik.setErrors({
            channelName: 'Новое имя совпадает с именем другого канала',
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
            name="channelName"
            type="text"
            required
            value={formik.values.channelName}
            placeholder={`Новое название канала "${currentChannelName}"`}
          />
        </form>
        {formik.errors.channelName ? (
          <div>{formik.errors.channelName}</div>
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
