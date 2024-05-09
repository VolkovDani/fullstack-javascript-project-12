import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import leo from 'leo-profanity';

import { channelsSelectors, renameChannel } from '../../slices/channels';
import { channelsNamingSchema } from '../../validation/schema';
import { getAuth } from '../../slices/auth';

const RenameChannel = ({ handleSetState, modalState, extraData }) => {
  const { t } = useTranslation('Components', { keyPrefix: 'RenameChannel' });
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
          if (leo.check(channelName)) {
            formik.setErrors({
              channelName: t('errors.profanity'),
            });
          } else {
            dispatch(renameChannel({ token, channelName, channelId }));
            handleSetState(false);
          }
        } else {
          formik.setErrors({
            channelName: t('error.channelExists'),
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
            placeholder={`${t('placeholder')} "${currentChannelName}"`}
          />
        </form>
        {formik.errors.channelName ? (
          <div>
            {
              t('formik.errors.channelName')
            }
          </div>
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
            t('send')
          }
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameChannel;
