import React, {
  useEffect, useRef,
} from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leo from 'leo-profanity';

import { uiActions, getCurrentChannelId } from '../slices/ui';
import { messagesSelectors } from '../slices/messages';
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

export const ChannelsList = ({ channelsModals }) => {
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

export const ChannelMessages = () => {
  const { t } = useTranslation('Components', { keyPrefix: 'ChannelMessages' });

  const listEl = useRef(null);
  const currentChannelId = useSelector(getCurrentChannelId);
  const allMessages = useSelector(messagesSelectors.selectEntities);
  const currentChannel = useSelector((state) => channelsSelectors
    .selectById(state, currentChannelId));

  useEffect(() => {
    if (currentChannel) listEl.current.scrollTo(1, listEl.current.scrollHeight);
  }, [currentChannel, currentChannelId]);
  const messages = Object.values(allMessages)
    .filter(({ channelId }) => channelId === currentChannelId);

  if (!currentChannel) return null;
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {`# ${currentChannel.name}`}
          </b>
        </p>
        <span className="text-muted">
          {`${messages.length} ${t('Header.messagesCount.messages', { count: messages.length })}`}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5" ref={listEl}>
        {messages.length > 0
          ? messages.map(({ body, username, id }) => (
            <div className="text-break mb-2" key={id}>
              <b>{username}</b>
              {`: ${leo.clean(body)}`}
            </div>
          )) : null}
      </div>
    </>
  );
};
