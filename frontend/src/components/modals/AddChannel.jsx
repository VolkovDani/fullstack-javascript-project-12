import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import { channelsNamingSchema } from '../../validation/schema';

const AddChannel = ({ handleSetState, modalState }) => {
  const formik = useFormik({
    initialValues: {
      nameChannel: '',
    },
    validationSchema: channelsNamingSchema,
    onSubmit: (values) => {
      console.log(values);
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
            name="nameChannel"
            type="text"
            required
            value={formik.values.nameChannel}
            placeholder="Твоё название канала"
          />
        </form>
        {formik.errors.nameChannel ? (
          <div>{formik.errors.nameChannel}</div>
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
