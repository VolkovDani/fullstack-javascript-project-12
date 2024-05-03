import React, {
  useEffect, useMemo, useRef,
} from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { actions as uiActions, getCurrentChannelName, getCurrentChannelId } from '../slices/ui';
import { selectors as messagesSelectors, actions as messagesActions } from '../slices/messages';
import { selectors as channelsSelectors, actions as channelsActions } from '../slices/channels';

const socket = io();

const basicClassName = 'w-100 rounded-0 text-start text-truncate';

const Channel = ({ channelEntity, selected }) => {
  const { name, removable } = channelEntity;
  const dispatch = useDispatch();
  const handleChangeChannel = (e) => {
    e.preventDefault();
    dispatch(uiActions.setCurrentChannel(channelEntity));
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
            <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
            <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
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

export const ChannelsList = () => {
  const dispatch = useDispatch();
  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
  });
  const currentChannel = useSelector(getCurrentChannelId);
  const channels = useSelector(channelsSelectors.selectEntities);
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels ? Object.values(channels).map((entity) => {
        const { id } = entity;
        if (Number(id) === Number(currentChannel)) {
          return <Channel channelEntity={entity} key={id} selected />;
        }
        return <Channel channelEntity={entity} key={id} />;
      }) : null}
    </ul>
  );
};

export const ChannelMessages = () => {
  const listEl = useRef(null);
  const dispatch = useDispatch();
  const currentChannelId = useSelector(getCurrentChannelId);
  const allMessages = useSelector(messagesSelectors.selectEntities);
  const currentChannelName = useSelector(getCurrentChannelName);

  socket.on('newMessage', (payload) => {
    if (payload) {
      dispatch(messagesActions.addMessage(payload));
      window.scrollTo(0, document.body.scrollHeight);
    }
  });

  useEffect(() => {
    listEl.current.scrollTo(1, listEl.current.scrollHeight);
  });

  const messages = useMemo(
    () => Object.values(allMessages).filter(({ channelId }) => channelId === currentChannelId),
    [allMessages, currentChannelId],
  );
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {`# ${currentChannelName}`}
          </b>
        </p>
        <span className="text-muted">
          {`${messages.length} сообщений`}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5" ref={listEl}>
        {messages.length > 0
          ? messages.map(({ body, username, id }) => (
            <div className="text-break mb-2" key={id}>
              <b>{username}</b>
              {`: ${body}`}
            </div>
          )) : null}
      </div>
    </>
  );
};
