import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { uiActions, getCurrentChannelId } from '../slices/ui';
import { channelsSelectors } from '../slices/channels';

const basicClassName = 'w-100 rounded-0 text-start text-truncate';

const Channel = ({ channelEntity, selected, modalHandlers }) => {
  const { t } = useTranslation('Components', { keyPrefix: 'Channels' });
  const { name, removable } = channelEntity;
  const dispatch = useDispatch();
  const handleChangeChannel = (e) => {
    e.preventDefault();
    dispatch(uiActions.setCurrentChannel(channelEntity.id));
  };
  if (removable) {
    return (
      <li className="nav-item w-100">
        <Dropdown
          as={ButtonGroup}
          className="w-100"
        >
          <Button
            type="button"
            onClick={handleChangeChannel}
            variant={selected ? 'secondary' : 'light'}
            className={basicClassName}
          >
            <span className="me-1">#</span>
            {
              name
            }
          </Button>
          <Dropdown.Toggle
            variant={selected ? 'secondary' : 'light'}
            title=""
            split
          />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={modalHandlers.handleRenameChannel}
            >
              {
                t('Dropdown.rename')
              }
            </Dropdown.Item>
            <Dropdown.Item
              onClick={modalHandlers.handleDeleteChannel}
            >
              {
                t('Dropdown.delete')
              }
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    );
  }
  return (
    <li className="nav-item w-100">
      <Button
        type="button"
        variant={selected ? 'secondary' : 'light'}
        onClick={handleChangeChannel}
        className={basicClassName}
      >
        <span className="me-1">#</span>
        {
          name
        }
      </Button>
    </li>
  );
};

const ChannelsList = ({ channelsModals }) => {
  const currentChannel = useSelector(getCurrentChannelId);
  const channels = useSelector(channelsSelectors.selectEntities);
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels ? Object.values(channels).map((entity) => {
        const { id } = entity;
        if (Number(id) === Number(currentChannel)) {
          return (
            <Channel
              channelEntity={entity}
              key={id}
              modalHandlers={channelsModals(id)}
              selected
            />
          );
        }
        return <Channel channelEntity={entity} key={id} modalHandlers={channelsModals(id)} />;
      }) : null}
    </ul>
  );
};

export default ChannelsList;
