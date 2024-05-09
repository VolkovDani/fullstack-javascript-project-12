import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import leo from 'leo-profanity';

import { postNewChannel, channelsSelectors } from '../../slices/channels';
import { channelsNamingSchema } from '../../validation/schema';
import { getAuth } from '../../slices/auth';

const AddChannel = ({ handleSetState, modalState }) => {
  const { t } = useTranslation('Components', { keyPrefix: 'AddChannel' });
  const dispatch = useDispatch();
  const { token } = useSelector(getAuth);
  const allChannels = useSelector(channelsSelectors.selectEntities);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelsNamingSchema,
    onSubmit: ({ channelName }) => {
      if (!formik.errors.channelName) {
        const channel = Object.values(allChannels).find(({ name }) => channelName === name);
        if (!channel) {
          if (leo.check(channelName)) {
            formik.setErrors({
              channelName: t('errors.profanity'),
            });
          } else {
            dispatch(postNewChannel({ token, channelName }));
            handleSetState(false);
          }
        } else {
          formik.setErrors({
            channelName: t('errors.channelExists'),
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
        <Modal.Title>
          {
            t('title')
          }
        </Modal.Title>
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
            placeholder={t('inputPlaceholder')}
          />
        </form>
        {formik.errors.channelName ? (
          <div>{t(formik.errors.channelName)}</div>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
        >
          {
            t('cancel')
          }
        </Button>
        <Button
          variant="primary"
          onClick={formik.handleSubmit}
        >
          {
            t('sendButton')
          }
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannel;
