import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { postNewChannel, selectors } from '../../slices/channels';
import { channelsNamingSchema } from '../../validation/schema';
import { getAuth } from '../../slices/auth';

const AddChannel = ({ handleSetState, modalState }) => {
  const dispatch = useDispatch();
  const { token } = useSelector(getAuth);
  const allChannels = useSelector(selectors.selectEntities);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelsNamingSchema,
    onSubmit: ({ channelName }) => {
      if (!formik.errors.channelName) {
        const channel = Object.values(allChannels).find(({ name }) => channelName === name);
        if (!channel) {
          dispatch(postNewChannel({ token, channelName }));
          handleSetState(false);
        } else {
          formik.setErrors({
            channelName: 'Такое название канала уже есть',
          });
        }
      }
    },
    validateOnChange: false,
  });

  const handleClose = () => {
    handleSetState(false);
  };

  return (
    <Modal show={modalState} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
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
            placeholder="Твоё название канала"
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

export default AddChannel;
