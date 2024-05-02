import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { useFormik } from 'formik';
// import { channelsNamingSchema } from '../../validation/schema';

const AddChannel = ({ handleSetState, modalState }) => {
  // const formik = useFormik({
  //   initialValues: {
  //     nameChannel: '',
  //   },
  //   validationSchema: channelsNamingSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });
  const handleClose = () => {
    handleSetState(false);
  };

  return (
    <Modal show={modalState} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannel;
