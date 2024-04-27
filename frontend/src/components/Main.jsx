import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChannels, selectors as channelsSelector } from '../slices/channels';
import { actions as authActions } from '../slices/auth';
import { actions as uiActions } from '../slices/ui';
import {
  fetchMessages,
  selectors as messagesSelectors,
  actions as messagesActions,
} from '../slices/messages';
import { messages as messagesRoutes } from '../utils/routes';

const Navbar = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <a className="navbar-brand" href="/">Studying Chat</a>
      <button type="button" className="btn btn-primary">Выйти</button>
    </div>
  </nav>
);

const Channel = ({ name, selected, channelId }) => {
  const dispatch = useDispatch();
  const handleChangeChannel = (e) => {
    e.preventDefault();
    dispatch(uiActions.setCurrentChannel(channelId));
  };
  return (
    <li className="nav-item w-100">
      <button
        type="button"
        onClick={handleChangeChannel}
        className={
          selected
            ? 'w-100 rounded-0 text-start btn btn-secondary'
            : 'w-100 rounded-0 text-start btn'
        }
      >
        <span className="me-1">#</span>
        {
          name
        }
      </button>
    </li>
  );
};

const InputMessage = () => {
  const [value, setValue] = useState('');
  const currentChannel = useSelector((state) => state.ui.idSelectedChannel);
  const authData = useSelector((state) => state.auth);
  const sendMessage = (btnEvent) => {
    btnEvent.preventDefault();
    if (value === '') return;
    const message = {
      body: value,
      channelId: currentChannel,
      username: authData.username,
    };
    axios.post(
      messagesRoutes.post(),
      message,
      {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      },
    ).then(() => {
      setValue('');
    });
  };
  return (
    <div className="mt-auto px-5 py-3">
      <form
        className="py-1 border rounded-2"
        onSubmit={sendMessage}
      >
        <div className="input-group has-validation">
          <input
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
            value={value}
            onChange={(e) => {
              e.preventDefault();
              setValue(e.target.value);
            }}
          />
          <button
            type="submit"
            disabled=""
            className="btn btn-group-vertical"
          >
            <span className={value ? null : 'visually-hidden'}>Отправить</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const ChannelsList = () => {
  const currentChannel = useSelector((state) => state.ui.idSelectedChannel);
  const channels = useSelector((state) => state.channels.entities);
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels ? Object.values(channels).map((entity) => {
        const { name, id } = entity;
        if (Number(id) === Number(currentChannel)) {
          return <Channel name={name} key={id} channelId={id} selected />;
        }
        return <Channel name={name} key={id} channelId={id} />;
      }) : null}
    </ul>
  );
};

const socket = io();

const ChannelMessages = () => {
  const listEl = useRef(null);
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.ui.idSelectedChannel);
  const allMessages = useSelector((state) => messagesSelectors.selectEntities(state));
  const currentChannel = useSelector(
    (state) => channelsSelector.selectById(state, currentChannelId),
  );

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
            {`# ${currentChannel.name}`}
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

const Chat = (props) => {
  const { authInfo } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.setAuth(authInfo));
    dispatch(fetchChannels(authInfo.token));
    dispatch(fetchMessages(authInfo.token));
  }, [dispatch, authInfo]);
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <button type="button" className="p-0 text-primary btn btn-group-vertical">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                  <span className="visually-hidden">+</span>
                </button>
              </div>
              <ChannelsList />
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <ChannelMessages />
                <InputMessage />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Toastify" />
    </>
  );
};

const Main = () => {
  const navigator = useNavigate();
  const userAuthInfo = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (!userAuthInfo) navigator('/login');
  });
  if (userAuthInfo) {
    return (
      <Chat authInfo={userAuthInfo} />
    );
  } return null;
};

export default Main;
